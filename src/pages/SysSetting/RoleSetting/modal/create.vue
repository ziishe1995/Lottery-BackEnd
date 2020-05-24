<template>
  <detail title="新增" @submit="doSubmit()">
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">名称</label>
      <div class="col-md-10">
        <validate rules="required|min:1|max:16">
          <input
            v-model="data.name"
            type="text"
            class="form-control"
          >
        </validate>
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label">描述</label>
      <div class="col-md-10">
        <input v-model="data.description" type="text" class="form-control">
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">状态</label>
      <div class="col-md-10 ">
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
    this.$bus.on('create.show', () => {
      this.data = {
        enable: 'Y'
      }
      this.show()
    })
  },
  destroyed () {
    this.$bus.off('create.show')
  },
  methods: {
    async doSubmit () {
      await this.$thisApi.doCreate(this.data)
      this.createSuccess()
    }
  }
}
</script>
