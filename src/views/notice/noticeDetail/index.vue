<template>
  <div class="body">
    <div class="title">
      <div class="title-text">消息详情</div>
      <div>
        <el-button type="primary" @click="forward">转发消息</el-button>
        <el-button @click="del">删除</el-button>
        <el-button @click="back">返回</el-button>
      </div>
    </div>
    <div class="main">
      <div class="subtitle">{{ data.noticeTitle }}</div>
      <div class="info">
        <div>{{ data.createTime }}</div>
        <div>系统通知</div>
      </div>
      <div class="main-text">
        {{ data.content }}
      </div>
      <div class="link" v-if="data.routing">
        <el-button type="text" @click="link(data.routing)"
          >立即处理<i class="el-icon-arrow-right el-icon--right"></i
        ></el-button>
      </div>
    </div>
    <Form v-if="data.id" ref="form" :noticeId="data.id" @refresh="refresh"></Form>
  </div>
</template>

<script>
import { getNotice,delNotice } from "@/api/system/notice";
import Form from "./form"
export default {
  name: "noticeDetail",
  components: {Form},
  data() {
    return {
        data: ''
    };
  },
  created() {
    let id = this.$route.query.id;
    getNotice(id).then((res) => {
        this.data = res.data;
    })
  },
  methods: {
      link(link){
          window.open(link,"_blank");
      },
      forward(){
        this.$refs.form.open();
      },
      del(){
        this.$modal
        .confirm("是否确认删除该条消息？")
        .then(function () {})
        .then(() => {
          delNotice(this.data.id).then((res) => {
            this.$modal.msgSuccess("删除成功");
            this.$router.go(-1);
          });
        })
        .catch(() => {});
      },
      back(){
        this.$router.back(-1);
      }
  }
};
</script>

<style lang="scss" scoped>
.body {
  min-height: calc(100vh - 144px);
  background-color: #ffffff;
  border-radius: 4px;
  padding: 12px 20px 20px 16px;
}
.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title-text {
    font-size: 24px;
    font-weight: 500;
    line-height: 33px;
    color: #333333;
  }
}
.main {
  padding: 20px 40px 20px 24px;
  .subtitle {
    font-size: 18px;
    font-weight: 500;
    line-height: 25px;
    color: #333333;
  }
  .info {
    margin-top: 16px;
    font-size: 14px;
    font-weight: 400;
    background-color: #f7f8fa;
    padding: 12px 16px;
    :first-child {
      padding-bottom: 8px;
    }
  }
  .main-text {
    margin-top: 32px;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: #333333;
  }
  .link {
    margin-top: 24px;
  }
}
</style>