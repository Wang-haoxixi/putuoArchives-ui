<template>
  <div class="tags-input" :class="{ focus: focus }" @click="handleFocus">
    <el-tag
      v-for="(tag, index) in value"
      :key="index"
      class="tags"
      closable
      size="mini"
      @close="removeTag(index)"
      @click.native.stop=""
      >{{ tag }}</el-tag
    >
    <el-autocomplete
      v-if="autocomplete"
      ref="input"
      class="input"
      :trigger-on-focus="false"
      :fetch-suggestions="querySearch"
      :maxlength="tagSize"
      @select="addTag"
      v-model="tag"
      @click.native.stop=""
      @keyup.enter.native="addTag"
      @focus="focus = true"
      @blur="onBlur"
    ></el-autocomplete>
    <el-input
      v-else
      ref="input"
      class="input"
      :maxlength="tagSize"
      v-model="tag"
      @click.native.stop=""
      @keyup.enter.native="addTag"
      @focus="focus = true"
      @blur="onBlur"
    ></el-input>
  </div>
</template>

<script>
import { keywordLike } from "@/api/workbench/index";
export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    maxlength: {
      type: Number,
      default: 5,
    },
    tagSize: {
      type: Number,
      default: 10,
    },
    autocomplete: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      focus: false,
      tag: "",
    };
  },
  methods: {
    querySearch(queryString, cb) {
      keywordLike({ name: queryString }).then((res) => {
        let array = [];
        res.data.forEach((item) => {
          array.push({ value: item });
        });
        cb(array);
      });
    },
    onBlur() {
      this.focus = false;
      this.tag = "";
    },
    addTag() {
      if (!this.tag.trim()) {
        this.$emit("input-empty");
        return;
      }
      if (this.value.length < this.maxlength) {
        this.$emit("input", [...this.value, this.tag.trim()]);
        this.$emit("change", [...this.value, this.tag.trim()])
        this.tag = "";
      } else {
        this.$emit("exceed");
      }
    },
    removeTag(index) {
      let tags = [...this.value];
      tags.splice(index, 1);
      this.$emit("input", tags);
      this.$emit("change", tags);
    },
    handleFocus() {
      this.$refs.input.focus();
    },
  },
};
</script>

<style lang="scss" scoped>
.tags-input {
  display: inline-flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 5px 16px 10px 11px;
  line-height: 22px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 2px;
  overflow: hidden;
  &.focus {
    border-color: #1492ff;
  }
  .tags {
    height: 22px;
    line-height: 22px;
    margin-left: 5px;
    margin-top: 5px;
  }
  .input {
    flex: 100px 1 0;
    height: 22px;
    margin-left: 5px;
    margin-top: 5px;
    ::v-deep .el-input--default {
      width: 100% !important;
    }
  }
  ::v-deep input {
    padding: 0;
    height: 22px;
    line-height: 22px;
    border-style: none;
    border-radius: 0;
  }
}
</style>
