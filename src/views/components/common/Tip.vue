<template>
  <el-tooltip :content="content" :placement="placement" v-bind="$attrs" v-on="$listeners">
    <div v-if="content!==''" slot="content" v-html="content"></div>
    <div v-if="content===''" slot="content" v-html="message"></div>
    <svg-icon
      style="font-size: 20px;"
      :icon-class="icon"
    />
  </el-tooltip>
</template>
<script>
export default {
  name: 'Tip',
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
      default: 'icon_beizhu',
    },
  },
}
</script>
<style lang="scss" scoped>
.el-icon-info {
  color: #777;
}
</style>
