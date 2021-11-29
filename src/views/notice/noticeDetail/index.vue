<template>
  <div class="body">
    <div class="title">
      <div class="title-text">消息详情</div>
      <div>
        <el-button type="primary" @click="forward">转发消息</el-button>
        <el-button>删除</el-button>
        <el-button>返回</el-button>
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
  </div>
</template>

<script>
import { getNotice } from "@/api/system/notice";
export default {
  name: "noticeDetail",
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
        this.$prompt('请选择接收人', '转发消息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的邮箱是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
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