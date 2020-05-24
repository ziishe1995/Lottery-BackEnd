<template>
  <detail title="编辑" @submit="doSubmit()">
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label ">分类</label>
      <div class="col-md-10">
        <div class="form-txt">
          {{ translate.classified[data.classified_id] }}
        </div>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label ">标题</label>
      <div class="col-md-10">
        <div class="form-txt">
          <span v-html="data.title" />
        </div>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label ">描述</label>
      <div class="col-md-10">
        <div class="form-txt">
          {{ data.description }}
        </div>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label ">封面</label>
      <div class="col-md-10">
        <div class="form-txt">
          <img :src="data.picture_url">
        </div>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label ">内容</label>
      <div class="col-md-10">
        <div v-if="data.full_text" class="form-txt">
          <span v-html="data.full_text.title" /><br>
          <span v-html="data.full_text.content" />
        </div>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label ">来源</label>
      <div class="col-md-10">
        <div class="form-txt">
          {{ data.source }}
        </div>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">显示</label>
      <div class="col-md-10">
        <switcher v-model="data.enable" />
      </div>
    </div>
  </detail>
</template>

<script>
import DetailMixins from 'mixins/Detail'

export default {
  mixins: [DetailMixins],
  mounted () {
    this.$bus.on('update.show', async (data) => {
      const res = await this.$thisApi.getFullText({ id: data.id })
      this.data = Object.assign({}, data, { full_text: res.data.full_text })
      this.show()
    })
  },
  destroyed () {
    this.$bus.off('update.show')
  },
  methods: {
    async doSubmit () {
      const data = _.cloneDeep(this.data)
      await this.$thisApi.doUpdate(data)
      this.updateSuccess()
    }
  }
}
</script>
