<template>
  <date-picker v-model="date" :config="options" :placeholder="placeholder" />
</template>

<script>
import datePicker from 'vue-bootstrap-datetimepicker'
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'

export default {
  components: {
    datePicker
  },
  props: {
    value: { required: true },
    placeholder: { default: '' },
    format: { default: 'YYYY-MM-DD HH:mm:ss' }
  },
  data () {
    return {
      date: null,
      options: {
        format: this.format,
        locale: moment.locale('zh-cn'),
        icons: {
          time: 'fas fa-clock'
        }
      }
    }
  },
  watch: {
    value () {
      this.date = this.value
    },
    date () {
      this.$emit('input', this.date)
    }
  },
  mounted () {
    this.date = this.value
  }
}
</script>
