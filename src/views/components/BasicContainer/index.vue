<template>
  <div class="basic-container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-container {
  min-height: calc(100vh - 144px);
  padding: 20px;
  background-color: #FFF;
  border-radius: 4px;
}
</style>
