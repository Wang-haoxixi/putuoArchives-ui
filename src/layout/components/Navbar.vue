<template>
  <div class="navbar">
    <!-- <breadcrumb id="breadcrumb-container" class="breadcrumb-container" v-if="!topNav"/> -->
    <!-- <top-nav id="topmenu-container" class="topmenu-container" v-if="topNav"/> -->
    <div class="left-menu">
      <img src="@/assets/logo/logo_white.png" class="left-menu-logo" />
      <div class="left-menu-title">普陀区档案归集智能监管服务平台</div>
    </div>
    <div class="right-menu">
      <!-- <template v-if="device !== 'mobile'"> -->
      <!-- <search id="header-search" class="right-menu-item" /> -->

      <!-- <el-tooltip content="源码地址" effect="dark" placement="bottom">
          <ruo-yi-git id="ruoyi-git" class="right-menu-item hover-effect" />
        </el-tooltip> -->

      <!-- <el-tooltip content="文档地址" effect="dark" placement="bottom">
          <ruo-yi-doc id="ruoyi-doc" class="right-menu-item hover-effect" />
        </el-tooltip> -->

      <!-- <screenfull id="screenfull" class="right-menu-item hover-effect" /> -->

      <!-- <el-tooltip content="布局大小" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>
      </template> -->
      <el-dropdown trigger="click" v-if="deptList">
        <div class="check-box">
          <span>{{
            currentWorkbench.unitName + currentWorkbench.deptName
          }}</span
          ><svg-icon icon-class="icon_jiantou_xia" style="margin-left: 12px" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            @click.native="workbenchChange(item)"
            v-for="(item, index) in deptList"
            :key="index"
          >
            <span>{{ item.unitName + item.deptName }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown trigger="click" v-if="roleList">
        <div class="check-box">
          <span>{{ currentWorkbench.roleName }}</span
          ><svg-icon icon-class="icon_qiehuan" style="margin-left: 12px" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            @click.native="workbenchChange(item)"
            v-for="(item, index) in roleList"
            :key="index"
          >
            <span>{{ item.roleName }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="notice">
        <el-badge
          :value="unread"
          :hidden="!unread > 0"
          style="margin-top: 6px; margin-right: 5px"
          @click.native="notice"
        >
          <svg-icon icon-class="icon_xiaoxi" />
        </el-badge>
      </div>
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar" />
          <div class="user-name">欢迎您，{{ name }}</div>
          <!-- <i class="el-icon-caret-bottom" /> -->
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/user/profile">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-dropdown-item @click.native="setting = true">
            <span>布局设置</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import TopNav from "@/components/TopNav";
import Hamburger from "@/components/Hamburger";
import Screenfull from "@/components/Screenfull";
import SizeSelect from "@/components/SizeSelect";
import Search from "@/components/HeaderSearch";
import RuoYiGit from "@/components/RuoYi/Git";
import RuoYiDoc from "@/components/RuoYi/Doc";
import { workbenchChange } from "@/api/system/user";
import { getNoticeList, circularListNotice } from "@/api/system/notice";

export default {
  components: {
    Breadcrumb,
    TopNav,
    Hamburger,
    Screenfull,
    SizeSelect,
    Search,
    RuoYiGit,
    RuoYiDoc,
  },
  computed: {
    ...mapGetters([
      "sidebar",
      "avatar",
      "device",
      "name",
      "currentWorkbench",
      "deptList",
      "roleList",
      "unread",
    ]),
    setting: {
      get() {
        return this.$store.state.settings.showSettings;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "showSettings",
          value: val,
        });
      },
    },
    topNav: {
      get() {
        return this.$store.state.settings.topNav;
      },
    },
  },
  data() {
    return {
      noticeList: undefined,
      status: "",
    };
  },
  created() {
    this.getNoticeList();
  },
  methods: {
    notice(){
      this.$router.push({path: "noticeList"})
    },
    workbenchChange(item) {
      workbenchChange(item).then((res) => {
        if (res.code === 200) {
          window.open(location.origin, "_self");
        }
      });
    },
    upload() {},
    getNoticeList() {
      getNoticeList().then((res) => {
        this.$store.commit("SET_NOTICE_LIST", res.data.data.records);
        this.$store.commit("SET_UNREAD", res.data.noRead);
        this.circularListNotice();
      });
    },
    circularListNotice() {
      circularListNotice()
        .then((res) => {
          if (res.data.isNewData === true) {
            this.$store.commit("SET_NOTICE_LIST", res.data.data.records);
            this.$store.commit("SET_UNREAD", res.data.noRead);
          }
          this.circularListNotice();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      this.$confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("LogOut").then(() => {
            location.href = "/index";
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.notice {
  margin-right: 12px;
  color: #fff;
  line-height: 24px;
  &:hover {
    cursor: pointer;
  }
  svg {
    width: 24px;
    height: 24px;
  }
}
.notice ::v-deep .el-badge__content {
  background-color: #fc5c5c;
  border: none;
}
.navbar {
  position: fixed;
  top: 0;
  height: 72px;
  width: 100vw;
  z-index: 99;
  // overflow: hidden;
  // position: relative;
  background: #1492ff;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .topmenu-container {
    position: absolute;
    left: 50px;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .left-menu {
    display: flex;
    align-items: center;
    .left-menu-logo {
      width: 28px;
      height: 28px;
    }
    .left-menu-title {
      padding-left: 12px;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 500;
      line-height: 33px;
      color: #ffffff;
    }
  }

  .right-menu {
    display: flex;
    padding-right: 20px;
    align-items: center;
    height: 100%;
    line-height: 72px;

    &:focus {
      outline: none;
    }
    .check-box {
      display: flex;
      align-items: center;
      background-color: #0064c0;
      padding: 0 8px 0 12px;
      border-radius: 2px;
      color: #edf4ff;
      font-size: 14px;
      line-height: 28px;
      height: 28px;
      margin-right: 12px;
      &:hover {
        cursor: pointer;
      }
      span {
        max-width: 280px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        &:focus {
          cursor: pointer;
        }
      }
      svg {
        font-size: 24px;
      }
    }

    .right-menu-item {
      display: inline-block;
      height: 100%;
      font-size: 18px;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      // margin-right: 30px;

      .avatar-wrapper {
        display: flex;
        align-items: center;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 24px;
          height: 24px;
          border-radius: 50%;
        }
        .user-name {
          padding-left: 12px;
          font-size: 16px;
          color: #ffffff;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
