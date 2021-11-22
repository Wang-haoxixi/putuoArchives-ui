<template>
  <div class="text-tooltip">
    <el-tooltip
      class="item"
      effect="dark"
      :disabled="isShowTooltip"
      :content="content"
      placement="top"
    >
      <p class="over-flow" :class="className" @mouseover="onMouseOver(refName)">
        <span :ref="refName">
          {{ content || "-" }}
        </span>
      </p>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: "TextTooltip",
  props: {
    content: {
      type: String,
      default: () => {
        return "";
      },
    },
    className: {
      type: String,
      default: () => {
        return "";
      },
    },
    refName: {
      type: String,
      default: () => {
        return "";
      },
    },
  },
  data() {
    return {
      isShowTooltip: true,
    };
  },
  methods: {
    onMouseOver(str) {
      let parentWidth = this.$refs[str].parentNode.offsetWidth;
      let contentWidth = this.$refs[str].offsetWidth;
      if (contentWidth > parentWidth) {
        this.isShowTooltip = false;
      } else {
        this.isShowTooltip = true;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.over-flow {
  position: relative;
  // top: 10px;
  margin: 0 !important;
  line-height: 1 !important;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>