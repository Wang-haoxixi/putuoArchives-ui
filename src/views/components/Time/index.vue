<template>
  <span>
    {{time}}
  </span>
</template>

<script>
export default {
  props: {
    format: {
      type: String,
      default: "YYYY-MM-DD HH:mm:ss"
    }
  },
  data () {
    return {
      time: this.dayjs().format(this.format)
    }
  },
  created () {
    setInterval(() => {
      this.time = this.dayjs().format(this.format)
    }, 1000)
  },
}
</script>

<style lang="" scoped>
</style>
