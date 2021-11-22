<template>
  <span class="search-input">
    <el-input clearable v-model="searchWord" placeholder="请输入" @keyup.enter.native="toSearch">
    </el-input>
    <el-button icon="el-icon-search" type="primary" @click="toSearch">搜索</el-button>
  </span>
</template>

<script>
export default {
  data () {
    return {
      searchWord: ""
    }
  },
  methods: {
    toSearch () {
      this.$emit("search", this.searchWord)
    }
  }
}
</script>

<style lang="scss" scoped>
.search-input {
  display: inline-flex;
  flex-wrap: nowrap;
  ::v-deep .el-input {
    width: 290px;
  }
  ::v-deep .el-input__inner {
    border-style: none;
    border-radius: 4px 0 0 4px;
    background-color: #F2F3F5;
  }
  ::v-deep .el-button {
    // display: inline-flex;
    border-radius: 0 2px 2px 0;
  }
  ::v-deep .el-input__suffix {
    right: 0;
  }
}
</style>
