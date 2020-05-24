<template>
  <detail title="新增" @submit="doSubmit()">
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">代码</label>
      <div class="col-md-10">
        <validate rules="required|uppercase">
          <input v-model="data.code" type="text" class="form-control">
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">名称</label>
      <div class="col-md-10">
        <validate rules="required">
          <input v-model="data.title" type="text" class="form-control">
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label">内容</label>
      <div class="col-md-10 switcher-box">
        <j-editor
          v-model="data.content"
          @image-added="(f, e, c, r) => doUploadPic(f, e, c, r, 'editor_image_ids')"
        />
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">状态</label>
      <div class="col-md-10">
        <switcher v-model="data.enable" />
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
    this.$bus.on('create.show', (data) => {
      this.data = {
        enable: this.Const.Y,
        editor_image_ids: []
      }
      this.show()
    })
  },
  destroyed () {
    this.$bus.off('create.show')
  },
  methods: {
    async doSubmit () {
      const data = _.cloneDeep(this.data)
      await this.$thisApi.doCreate(data, { formData: true })
      this.createSuccess()
    }
  }
}
</script>
