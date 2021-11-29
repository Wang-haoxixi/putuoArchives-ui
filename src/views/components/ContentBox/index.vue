<template>
  <div class="content-box">
    <div class="header">
      <div class="title-tips">
        <div class="title">{{title}}</div>
        <div v-if="tips" class="tips">{{tips}}</div>
      </div>
      <div class="operations">
        <slot name="operations"></slot>
      </div>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tips: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    operations: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 44px;
  .title-tips {
    display: flex;
    align-items: flex-end;
    height: 33px;
    .title {
      font-size: 24px;
      height: 33px;
      line-height: 33px;
      font-weight: 600;
    }
    .tips {
      padding-bottom: 2px;
      height: 20px;
      line-height: 20px;
      // color: $text-color-secondary;
    }
  }
  .operations {
    margin-left: 10px;
    flex: 100px 1 1;
    text-align: right;
  }
}
</style>
