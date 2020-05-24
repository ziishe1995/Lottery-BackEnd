<template>
  <validation v-slot="{invalid}">
    <b-modal
      ref="modal"
      header-bg-variant="black"
      header-close-variant="white"
      :hide-footer="hideFooter"
      size="lg"
    >
      <template slot="modal-title">
        <h4 class="modal-title text-white">
          {{ title }}
        </h4>
      </template>

      <slot />

      <template slot="modal-footer">
        <slot name="modal-footer" :invalid="invalid">
          <button class="btn btn-primary width-70" :disabled="invalid" @click="$emit('submit')">
            储存
          </button>
          <button class="btn btn-white width-70" @click="hide()">
            取消
          </button>
        </slot>
      </template>
    </b-modal>
  </validation>
</template>

<script>
export default {
  props: ['title', 'hideFooter'],
  mounted () {
    this.$bus.on('modal.hide', () => {
      this.hide()
    })
  },
  destroyed () {
    this.$bus.off('modal.hide')
  },
  methods: {
    show () {
      this.$refs.modal.show()
    },
    hide () {
      this.$refs.modal.hide()
    }
  }
}
</script>
