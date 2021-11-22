<template>
  <div class="search-container">
    <div v-for="(item, index) in searchQuery" :key="index" class="search-item">
      <div class="search-item-label">{{item.label}}</div>
      <div class="search-item-content">
        <form-item :option="item" v-model="searchForm[item.prop]" style="height: 100%;width: 100%;"></form-item>
      </div>
    </div>
    <div class="button-list">
      <el-button type="primary" icon="el-icon-search" @click="toSearch">搜索</el-button>
      <el-button @click="toReset">重置</el-button>
    </div>
  </div>
</template>

<script>
import FormItem from "./HcFormItem"
export default {
  components: { FormItem },
  props: {
    searchQuery: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      searchForm: {}
    }
  },
  methods: {
    toSearch () {
      this.$emit("search", { ...this.searchForm })
    },
    toReset () {
      let searchForm = this.searchForm
      for (var key in searchForm) {
        searchForm[key] = undefined
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto-fill, 78px);
  grid-gap: 20px;
}
.search-item-label {
  height: 22px;
  line-height: 22px;
}
.search-item-content {
  height: 44px;
  margin-top: 12px;
}
.button-list {
  margin-top: 34px;
}
</style>
