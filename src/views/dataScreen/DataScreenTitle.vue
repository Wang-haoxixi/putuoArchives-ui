<template>
  <div class="title">
    <div class="title-container">
      <img
        class="title-border"
        src="@/assets/images/bg_dataScreen_border_left@2x.png"
      />
      <div>
        <div class="title-bg-gradient">
          <img
            class="title-bg"
            src="@/assets/images/bg_dataScreen_title_left@2x.png"
          />
          {{ title }}
          <img
            class="title-bg"
            src="@/assets/images/bg_dataScreen_title_right@2x.png"
          />
        </div>
        <div class="title-bottom"></div>
      </div>
      <img
        class="title-border"
        src="@/assets/images/bg_dataScreen_border_right@2x.png"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  // margin: 0 44px;
  text-align: center;
  font-weight: 500;
  line-height: 25px;
  color: #3ce7fd;
  .title-container {
    justify-content: center;
    display: flex;
    align-items: flex-end;
    .title-border {
      width: 80px;
      height: 23px;
    }
    .title-bg {
      margin: 0 8px;
      width: 26px;
      height: 9px;
    }
  }
}
.title-bottom {
  height: 1px;
  background: linear-gradient(270deg, #0071e2 0%, #ffffff 50%, #0071e2 100%);
}
.title-bg-gradient {
  padding: 9px 0;
  background: linear-gradient(
    270deg,
    rgba(9, 75, 168, 0) 0%,
    #094ba8 50%,
    rgba(9, 75, 168, 0) 100%
  );
}
</style>