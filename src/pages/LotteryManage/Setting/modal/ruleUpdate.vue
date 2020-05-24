<template>
  <detail title="规则" @submit="doSubmit()">
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">内容</label>
      <div class="col-md-10 switcher-box">
        <j-editor
          v-model="data.rule"
          @image-added="(f, e, c, r) => doUploadPic(f, e, c, r, 'editor_image_ids')"
        />
      </div>
    </div>
  </detail>
</template>

<script>
import DetailMixins from 'mixins/Detail'
import EditorMixins from 'mixins/Editor'

export default {
  mixins: [DetailMixins, EditorMixins],
  mounted () {
    this.$bus.on('ruleUpdate.show', (data) => {
      this.data = {
        ...data,
        editor_image_ids: _.map(data.editor_files, 'id')
      }
      this.show()
    })
  },
  destroyed () {
    this.$bus.off('ruleUpdate.show')
  },
  methods: {
    async doSubmit () {
      const _d = _.cloneDeep(this.data)
      const data = {
        id: _d.id,
        rule: _d.rule,
        editor_image_ids: _d.editor_image_ids
      }
      await this.$thisApi.doUpdateRule(data, { formData: true })
      this.updateSuccess()
    }
  }
}
</script>
