<template>
  <detail title="编辑" @submit="doSubmit()">
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">分类名称</label>
      <div class="col-md-10">
        <validate rules="required">
          <multi-list-select
            v-model="data.classified_ids"
            placeholder="请选择类型"
            :list="options.classified"
            option-value="id"
            option-text="name"
            :selected-items="data.classified_ids"
            @select="item => (data.classified_ids = item)"
          />
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label">彩种名称</label>
      <div class="col-md-10">
        <div class="form-txt">
          {{ data.name }}
        </div>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label">描述</label>
      <div class="col-md-10">
        <input v-model="data.description" type="text" class="form-control">
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label">图示 </label>
      <div class="col-md-10">
        <validate
          v-slot="{ validate }"
          rules="img|img_width:image,100|img_height:image,100"
        >
          <j-image
            alert="上传图片限制尺寸为100×100"
            :validate="validate"
            :src="data.image_path"
            :value="data"
            @upload="file => {data.image = file}"
            @delete="() => {data.del_image = Const.Y; data.image = null}"
          />
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
import { MultiListSelect } from 'vue-search-select'

export default {
  components: {
    MultiListSelect
  },
  mixins: [DetailMixins],
  mounted () {
    this.$bus.on('update.show', (data) => {
      this.data = Object.assign({ classified_ids: [] }, data)
      this.data.classified_ids = data.classified
      this.show()
    })
  },
  destroyed () {
    this.$bus.off('update.show')
  },
  methods: {
    async doSubmit () {
      const data = _.cloneDeep(this.data)
      data.classified_ids = _.map(data.classified_ids, 'id')
      await this.$thisApi.doUpdate(data, { formData: true })
      this.updateSuccess()
    }
  }
}
</script>
