<template>
  <detail title="新增" @submit="doSubmit()">
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">标题</label>
      <div class="col-md-10">
        <validate rules="required">
          <input v-model="data.title" type="text" class="form-control">
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label">图示 </label>
      <div class="col-md-10">
        <validate
          v-slot="{ validate }"
          rules="img|img_width:image,370|img_height:image,165"
        >
          <j-image
            alert="上传图片限制尺寸为370×165"
            :validate="validate"
            :value="data"
            @upload="file => {data.image = file}"
            @delete="() => {data.del_image = Const.Y; data.image = null}"
          />
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">另开视窗</label>
      <div class="col-md-10">
        <switcher v-model="data.is_blank" />
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label">链接</label>
      <div class="col-md-10">
        <validate rules="url">
          <input v-model="data.link" type="text" class="form-control">
        </validate>
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
        is_blank: this.Const.N,
        enable: this.Const.Y
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
