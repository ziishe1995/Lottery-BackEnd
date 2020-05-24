<template>
  <transition name="fade">
    <div v-if="show" class="alert alert-success alert-dismissible fade show" :class="'alert-' + type">
      <strong>{{ message }}</strong>
    </div>
  </transition>
</template>

<script>
export default {
  data: () => ({
    type: 'success',
    show: false
  }),
  mounted () {
    this.$bus.on('alert.success', (message) => {
      this.toShow('success', message)
    })
    this.$bus.on('alert.danger', (message) => {
      this.toShow('danger', message)
    })
    this.$bus.on('alert.warning', (message) => {
      this.toShow('warning', message)
    })
  },
  destroyed () {
    this.$bus.off('alert.success')
    this.$bus.off('alert.danger')
    this.$bus.off('alert.warning')
  },
  methods: {
    toShow (type, message) {
      this.type = type
      this.message = message
      this.show = true
      this.toClose()
    },
    toClose () {
      setTimeout(() => {
        this.show = false
      }, 2 * 1000)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .fade-enter-active, .fade-leave-active
    transition opacity .5s

  .fade-enter, .fade-leave-to
    opacity 0

</style>
