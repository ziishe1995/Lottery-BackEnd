<template>
  <detail title="新增" @submit="doSubmit()">
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">类型</label>
      <div class="col-md-10">
        <validate rules="required">
          <j-select v-model="data.type_id" :datas="options.type" value-key="id" />
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">标题</label>
      <div class="col-md-10">
        <validate rules="required">
          <input v-model="data.title" type="text" class="form-control">
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">图示 </label>
      <div class="col-md-10">
        <validate
          v-slot="{ validate }"
          rules="img|img_width:image,1170|img_height:image,325|img_required:image_path,image"
        >
          <j-image
            alert="上传图片限制尺寸为1170×325"
            class="slider-upload-box"
            :validate="validate"
            :src="data.image_path"
            required
            :value="data"
            @upload="file => {data.image = file}"
          />
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label">另开视窗</label>
      <div class="col-md-10 switcher-box">
        <switcher v-model="data.is_blank" />
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label ">链接</label>
      <div class="col-md-10">
        <validate rules="url">
          <input v-model="data.url" type="text" class="form-control">
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">状态</label>
      <div class="col-md-10">
        <switcher v-model="data.status" />
      </div>
    </div>
  </detail>
</template>

<script>
import DetailMixins from 'mixins/Detail'

export default {
  mixins: [DetailMixins],
  mounted () {
    this.$bus.on('create.show', (data) => {
      this.data = {
        status: this.Const.Y
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
