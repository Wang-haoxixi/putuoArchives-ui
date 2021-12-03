<template>
  <el-select
    v-model="selectData"
    v-bind="$attrs"
    :filterable="!fixed"
    :remote="!fixed"
    :placeholder="placeholder"
    :remote-method="!fixed ? remote : null"
    :value-key="valueKey"
    :disabled="disabled"
    :multiple="multiple"
    maxlength="10"
    :loading="loading"
    @change="selectChange">
    <slot>
      <el-option
        v-for="option in options"
        :key="option[valueKey]"
        :label="option[labelKey]"
        :value="isObject ? option : option[valueKey]"
        :disabled="disabledItems.includes(option[valueKey])">
        <slot name="option" :option="option"></slot>
      </el-option>
    </slot>
  </el-select>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number, Object, Array],
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    remoteFun: {
      type: Function,
      required: true
    },
    disabledItems: {
      type: Array,
      default: () => []
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    isObject: {
      type: Boolean,
      default: false
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number,
      default: undefined
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      options: [],
      selectData: '',
      loading: false,
    }
  },
  created () {
    this.selectData = this.value
    if (this.fixed) {
      this.loading = true;
      this.remoteFun().then(data => {
        this.options = data
        this.loading = false
      }, () => {
        this.options = []
      }).finally(() => {
        this.loading = false
      })
    }
  },
  watch: {
    value (val) {
      if (this.options && this.options.length > 0) {
        this.selectData = val
        this.$emit('change', val)
        // this.$nextTick(() => {
        //   this.options = []
        // })
      }
    }
  },
  methods: {
    initData (val = this.multiple ? [] : '', options = [], noClean = false) {
      this.options = options
      this.selectData = val
      if (!noClean) {
        this.$nextTick(() => {
          this.options = []
        })
      }
    },
    remote (query) {
      if (query !== '') {
        this.loading = true;
        this.remoteFun(query).then(data => {
          this.options = data
          this.loading = false
        }, () => {
          this.options = []
        }).finally(() => {
          this.loading = false
        })
      }
    },
    selectChange (value) {
      if (this.multiple && this.max && value.length > this.max) {
        this.selectData = this.value
        this.$emit('exceed')
      } else {
        this.selectData = value
        this.$emit('input', value)
        let options = null
        let labels = null
        if (this.multiple) {
          options = []
          labels = []
          for (let i = 0; i < this.options.length; i++) {
            let option = this.options[i]
            for (let j = 0; j < value.length; j++) {
              if (option[this.valueKey] === value[j][this.valueKey]) {
                options.push(option)
                labels.push(option[this.labelKey])
                break
              }
            }
          }
          this.$emit('label-change', labels)
          this.$emit('option-change', options)
        } else {
          for (let i = 0; i < this.options.length; i++) {
            if (this.options[i][this.valueKey] === value) {
              this.$emit('label-change', this.options[i][this.labelKey])
              this.$emit('option-change', this.options[i])
              break
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="" scoped>
</style>
