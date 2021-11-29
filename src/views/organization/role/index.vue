<template>
  <component :is="type"></component>
</template>

<script>
import Role from "./list"
import AuthUser from './authUser/index'
export default {
  data () {
    return {
      type: ""
    }
  },
  created () {
    this.type = this.$route.name == "Role" ? Role : AuthUser
  }
}
</script>

<style lang="" scoped>
</style>
