<template>
  <div class="bg" v-if="show">
    <img
      class="img"
      :src="require('@/assets/images/' + statusList[indexs].imgSrc)"
      :alt="statusList[indexs].desc"
    />
    <div class="desc">{{ statusList[indexs].desc }}</div>
  </div>
</template>

<script>
export default {
  name: "DefaultPage",
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      default: "",
    },
    index: {
      type: Number,
      default: undefined,
    },
  },
  computed: {
    indexs() {
      if (this.status === "error") {
        return 0;
      } else if (this.status === "noData") {
        return 1;
      } else if (this.status === "dev") {
        return 2;
      } else if (this.status === "noPermission") {
        return 3;
      } else if (this.index > -1) {
        return this.index;
      } else {
        return 0;
      }
    },
  },
  data() {
    return {
      statusList: [
        {
          status: "error",
          imgSrc: "pic_jiazhashibai@2x.png",
          desc: "加载失败",
        },
        {
          status: "noData",
          imgSrc: "pic_zanwushuju@2x.png",
          desc: "暂无数据",
        },
        {
          status: "dev",
          imgSrc: "pic_kaifazhong@2x.png",
          desc: "页面开发中",
        },
        {
          status: "noPermission",
          imgSrc: "pic_wuquanxian@2x.png",
          desc: "暂无权限",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.bg {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.img {
  width: 240px;
  height: 200px;
}
.desc {
  padding: 12px 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #666666;
}
</style>