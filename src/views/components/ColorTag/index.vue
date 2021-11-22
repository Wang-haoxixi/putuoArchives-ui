<template>
  <span class="color-tag" :style="getStyle">
    {{getTag.label}}
  </span>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "text",
    },
    tags: {
      type: Array,
      default: () => []
    },
    value: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
    }
  },
  computed: {
    getTag () {
      for (let i = 0; i < this.tags.length; i++) {
        if (this.value == this.tags[i].value) {
          return this.tags[i]
        }
      }
    },
    getStyle () {
      if (this.type == "text") {
        return {
          color: this.getTag.color
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.color-tag {
  display: inline-block;
}
</style>
