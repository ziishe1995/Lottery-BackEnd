<template>
  <div class="switcher">
    <input :id="id" v-model="data" type="checkbox" name="switcher_checkbox">
    <label :for="id" />
  </div>
</template>

<script>
import Const from 'constants/Const'

export default {
  props: {
    enable: { default: Const.Y },
    disable: { default: Const.N },
    value: { required: true }
  },
  data: () => ({
    id: '',
    data: ''
  }),
  watch: {
    data () {
      this.$emit('input', this.data
        ? this.enable
        : this.disable
      )
    }
  },
  mounted () {
    this.id = this.$jaclib.createID('switcher-')
    this.data = this.value === this.enable
  }
}
</script>
