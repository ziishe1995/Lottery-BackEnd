<template>
  <v-editor
    v-model="data"
    use-custom-image-handler
    @image-added="(f, e, c, r) => $emit('image-added', f, e, c, r)"
  />
</template>

<script>
export default {
  components: {
    vEditor: require('vue2-editor').VueEditor
  },
  props: ['value'],
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
  },
  methods: {
    insertURL (Editor, cursorLocation, resetUploader, url) {
      Editor.insertEmbed(cursorLocation, 'image', url)
      resetUploader()
    }
  }
}
</script>
