<template>
  <component :is="type"></component>
</template>

<script>
import List from "./list"
import Records from './records'
export default {
  data () {
    return {
      type: ""
    }
  },
  created () {
    this.type = this.$route.name == "Team" ? List : Records
  }
}
</script>

<style lang="" scoped>
</style>
