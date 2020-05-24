import jEditor from '@/Form/Editor'

export default {
  components: {
    jEditor
  },
  methods: {
    async doUploadPic (image, Editor, cursorLocation, resetUploader, key) {
      const res = await this.$thisApi.doUploadPic({ image }, { formData: true })
      this.insertImage(Editor, cursorLocation, resetUploader, this.$s3Host + res.data.file_path)
      // this.data[key].push(res.data.id)
      this.add2DataList(key, res.data.id)
    },
    insertImage (Editor, cursorLocation, resetUploader, url) {
      jEditor.methods.insertURL(Editor, cursorLocation, resetUploader, url)
    },
    add2DataList (key, id) {
      this.data[key] = this.data[key] || []
      this.data[key].push(id)
    }
  }
}
