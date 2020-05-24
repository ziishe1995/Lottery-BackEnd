<template>
  <div class="tree-item">
    <span><i :class="className" />{{ title }}</span>
    <span class="crud-box">
      <div class="checkboxcheckbox-inline">
        <input v-if="hasChild" v-model="isChecked" type="checkbox">
        <input v-else v-model="data" type="checkbox">
      </div>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: ''
    },
    className: {
      default: 'fa fa-angle-right text-black-transparent-6'
    },
    value: {
      default: []
    },
    values: {
      default: []
    },
    hasChild: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    data: false
  }),
  computed: {
    isAllInValue () {
      for (const id of this.values) {
        if (!this.value.includes(id)) {
          return false
        }
      }
      return true
    },
    isChecked: {
      get () {
        return this.isAllInValue
      },
      set (value) {
        this.emitNewValue(value)
      }
    }
  },
  watch: {
    data () {
      if (!this.hasChild) {
        this.emitNewValue(this.data)
      }
    },
    value () {
      this.data = this.isAllInValue
    }
  },
  mounted () {
    this.data = this.isAllInValue
  },
  methods: {
    emitNewValue (value) {
      this.$emit('input', value
        ? _.uniq(_.concat(this.values, this.value))
        : _.filter(this.value, id => !this.values.includes(id))
      )
    }
  }
}
</script>
