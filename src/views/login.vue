<template>
  <div class="login">
    <!--  顶部  -->
    <div class="top">
      <img src="@/assets/logo/logo.png" class="top-icon">
      <div class="top-text">普陀区档案归集智能监管服务平台</div>
    </div>
    <div v-if="loginMode === 'account'">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
      >
        <h3 class="title">管理员登录</h3>
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            type="text"
            auto-complete="off"
            placeholder="账号"
          >
            <svg-icon
              slot="prefix"
              icon-class="icon_yonghuming"
              class="el-input__icon input-icon"
            />
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            auto-complete="off"
            placeholder="密码"
            @keyup.enter.native="handleLogin"
          >
            <svg-icon
              slot="prefix"
              icon-class="icon_mima"
              class="el-input__icon input-icon"
            />
          </el-input>
        </el-form-item>
        <el-form-item prop="code" v-if="captchaOnOff" style="">
          <el-input
            v-model="loginForm.code"
            auto-complete="off"
            placeholder="验证码"
            style="width: 187px"
            @keyup.enter.native="handleLogin"
          >
            <svg-icon
              slot="prefix"
              icon-class="icon_yanzhengma"
              class="el-input__icon input-icon"
            />
          </el-input>
          <div class="login-code">
            <img :src="codeUrl" @click="getCode" class="login-code-img" />
          </div>
        </el-form-item>
        <el-checkbox class="checkbox" v-model="loginForm.rememberMe"
          >记住密码</el-checkbox
        >
        <el-form-item style="width: 100%">
          <el-button
            :loading="loading"
            type="primary"
            style="
              width: 100%;
              margin-top: 20px;
              border-radius: 4px;
              height: 40px;
              line-height: 40px;
              padding: 0;
            "
            @click.native.prevent="handleLogin"
          >
            <span v-if="!loading">登 录</span>
            <span v-else>登 录 中...</span>
          </el-button>
          <div style="float: right" v-if="register">
            <router-link class="link-type" :to="'/register'"
              >立即注册</router-link
            >
          </div>
        </el-form-item>
      </el-form>
      <div class="login-switch" @click="checkLoginMode('qrcode')">
        <div class="login-switch-text">用户登录</div>
        <svg-icon class="login-switch-icon" icon-class="icon_jiantou_you" />
      </div>
    </div>
    <div v-if="loginMode === 'qrcode'">
      <div>
        <!-- 测试站 -->
        <!-- <iframe
          style="width: 400px; height: 400px; border: none; border-radius: 8px;box-shadow: 0px 3px 9px rgba(0, 59, 103, 0.16);"
          src="https://login.dg-work.cn/oauth2/auth.htm?response_type=code&client_id=jgxtsm_dingoa&redirect_uri=http://localhost&scope=get_user_info&authType=QRCODE&embedMode=true"
        >
        </iframe> -->
        <!-- 正式站 -->
        <iframe
          style="width: 400px; height: 400px; border: none; border-radius: 8px;box-shadow: 0px 3px 9px rgba(0, 59, 103, 0.16);"
          src="https://login-pro.ding.zj.gov.cn/oauth2/auth.htm?response_type=code&client_id=jgxtsm_dingoa&redirect_uri=http://localhost&scope=get_user_info&authType=QRCODE&embedMode=true"
        >
        </iframe>
      </div>
      <div class="login-switch" @click="checkLoginMode('account')">
        <div class="login-switch-text">管理员登录</div>
        <svg-icon class="login-switch-icon" icon-class="icon_jiantou_you" />
      </div>
    </div>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © 2021 govmade.com All Rights Reserved.</span>
    </div>
  </div>
</template>

<script>
import { getCodeImg, qrcodeLogin } from "@/api/login";
import Cookies from "js-cookie";
import dd from "gdt-jsapi";
import { encrypt, decrypt } from "@/utils/jsencrypt";

export default {
  name: "Login",
  data() {
    return {
      codeUrl: "",
      cookiePassword: "",
      loginForm: {
        username: "",
        password: "",
        rememberMe: false,
        code: "",
        uuid: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入您的账号" },
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入您的密码" },
        ],
        code: [{ required: true, trigger: "change", message: "请输入验证码" }],
      },
      loading: false,
      // 验证码开关
      captchaOnOff: true,
      // 注册开关
      register: false,
      //登录方式
      loginMode: "qrcode",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query?.redirect;
      },
      immediate: true,
    },
  },
  created() {
    dd.ready(function () {
      //测试站
      // dd.getAuthCode({
      //   corpId: "50352393",
      // })
      //正式站
      dd.getAuthCode({
        corpId: "196729",
      })
        .then((res) => {
          that.autoLogin(res.auth_code);
        })
        .catch((err) => {});
    });
    this.getCode();
    this.getCookie();
    let that = this;
    window.addEventListener("message", function (event) {
      if (event.data.code) {
        that.handleQrCodeLogin(event.data.code);
      }
    });
  },
  methods: {
    checkLoginMode(item) {
      this.loginMode = item;
    },
    getCode() {
      getCodeImg().then((res) => {
        this.captchaOnOff =
          res.captchaOnOff === undefined ? true : res.captchaOnOff;
        if (this.captchaOnOff) {
          this.codeUrl = "data:image/gif;base64," + res.img;
          this.loginForm.uuid = res.uuid;
        }
      });
    },
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get("rememberMe");
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password:
          password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
      };
    },
    autoLogin(code) {
      this.$store
        .dispatch("autoLogin", code)
        .then(() => {
          this.$router.push({ path: this.redirect || "/" }).catch(() => {});
        })
        .catch(() => {});
    },
    handleQrCodeLogin(code) {
      this.$store
        .dispatch("QrCodeLogin", code)
        .then(() => {
          this.$router.push({ path: this.redirect || "/" }).catch(() => {});
        })
        .catch(() => {});
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), {
              expires: 30,
            });
            Cookies.set("rememberMe", this.loginForm.rememberMe, {
              expires: 30,
            });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove("rememberMe");
          }
          this.$store
            .dispatch("Login", this.loginForm)
            .then(() => {
              this.$router
                .push({ path: this.redirect || "/index" })
                .catch(() => {});
            })
            .catch(() => {
              this.loading = false;
              if (this.captchaOnOff) {
                this.getCode();
              }
            });
        }
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/login-background.jpg");
  background-size: cover;
}
.title {
  margin: 0px auto 24px;
  text-align: center;
  color: #3b3b3b;
  font-size: 22px;
  line-height: 30px;
}
.el-form-item {
  margin: 0;
  padding: 8px 0 12px;
}

.login-form {
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0px 3px 9px rgba(0, 59, 103, 0.16);
  width: 400px;
  height: 430px;
  padding: 32px 40px 44px;
  // padding: 25px 25px 5px 25px;
  .el-input {
    height: 50px;
    ::v-deep input {
      font-size: 18px !important;
      height: 50px;
      border: #dddddd 1px solid;
      border-radius: 2px;
    }
    ::v-deep .el-input__inner {
      padding: 0 40px;
    }
    ::v-deep .el-input__prefix {
      left: 0;
    }
  }
  .input-icon {
    padding: 13px 8px;
    height: 50px;
    width: 40px;
    font-size: 24px;
    left: 0;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 122px;
  height: 46px;
  padding: 2px 0;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 46px;
}
.checkbox {
  color: #3b3b3b;
  font-size: 14px;
  line-height: 20px;
}
.login-switch {
  color: #ffffff;
  font-size: 14px;
  float: right;
  display: flex;
  padding-top: 16px;
  cursor: pointer;
}
.login-switch-text {
  line-height: 20px;
}
.login-switch-icon {
  font-size: 20px;
  margin-left: 4px;
}
.top {
  position: fixed;
  left: 69px;
  top: 35px;
  display: flex;
  align-items: center;
  .top-text {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 33px;
    color: #1492ff;
  }
  .top-icon {
    width: 50px;
    height: 50px;
  }
}
</style>
