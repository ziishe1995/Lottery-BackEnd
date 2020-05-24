<template>
  <b-modal
    ref="modal"
    header-close-variant="black"
    :size="size"
    hide-footer
  >
    <div id="img-dialog">
      <div class="img">
        <img :src="src" alt="">
      </div>
    </div>

    <template slot="modal-footer">
      <span />
    </template>
  </b-modal>
</template>

<script>
export default {
  props: {
    src: {
      type: String
    },
    size: {
      type: String,
      default: 'lg'
    }
  },
  methods: {
    show () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="stylus" scoped>
  #img-dialog img
    max-width 100%
</style>

<style lang="stylus">
  @media (min-width: 576px)
    .modal-auto
      width max-content
      max-width none

</style>
