<template>
  <section>
    <div v-for="(name, val) in datas" :key="val" class="form-check-inline radio radio-css">
      <input :id="'r'+val" v-model="data" type="radio" name="status" :value="val">
      <label :for="'r'+val">{{ name }}</label>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    datas: {
      type: Object,
      required: true
    },
    value: {
      required: true
    }
  },
  data: () => ({
    data: ''
  }),
  watch: {
    value () {
      this.data = this.value
    },
    data () {
      this.$emit('input', this.data)
    }
  },
  mounted () {
    this.data = this.value
  }
}
</script>
