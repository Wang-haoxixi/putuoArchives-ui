<template>
  <el-tooltip :content="content" :placement="placement" v-bind="$attrs" v-on="$listeners">
    <div v-if="content!==''" slot="content" v-html="content"></div>
    <div v-if="content===''" slot="content" v-html="message"></div>
    <i :class="icon"></i>
  </el-tooltip>
</template>
<script>
export default {
  name: 'IepTip',
  props: {
    content: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      default: '',
    },
    placement: {
      type: String,
      default: 'top',
    },
    icon: {
      type: String,
      default: 'el-icon-warning-outline',
    },
  },
}
</script>
<style lang="scss" scoped>
.el-icon-info {
  color: #777;
}
</style>
