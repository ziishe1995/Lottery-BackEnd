<template>
  <section>
    <input :id="id" v-model="data" class="form-check-input" type="checkbox">
    <label v-if="title" class="form-check-label" :for="id">
      {{ title }}
    </label>
  </section>
</template>

<script>
export default {
  props: {
    enable: { default: 'Y' },
    disable: { default: 'N' },
    value: { required: true },
    title: ''
  },
  data: () => ({
    data: null,
    id: null
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
    this.id = 'checkbox-' + parseInt(Math.random() * 100000)
    this.data = this.value === this.enable
  }
}
</script>

<style scoped>

</style>
