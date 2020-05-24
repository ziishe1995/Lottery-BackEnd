<template>
  <detail title="编辑" @submit="doSubmit()">
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">分类</label>
      <div v-if="data.game" class="col-md-10">
        <validate rules="required">
          <input v-model="data.classifiedList" :disabled="true" type="text" class="form-control">
        </validate>
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">彩种</label>
      <div v-if="data.game" class="col-md-10">
        <validate rules="required">
          <input v-model="data.game.name" :disabled="true" type="text" class="form-control">
        </validate>
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">期数</label>
      <div class="col-md-10">
        <validate rules="required">
          <input v-model="data.period" :disabled="true" type="text" class="form-control">
        </validate>
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">开奖时间</label>
      <div class="col-md-10">
        <validate rules="required">
          <input v-model="data.draw_time" :disabled="true" type="text" class="form-control">
        </validate>
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">开奖号码</label>
      <div v-if="data.game" class="col-md-10">
        <validate rules="required">
          <input v-model="data.winning_numbers" type="text" class="form-control">
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

export default {
  mixins: [DetailMixins],
  mounted () {
    this.$bus.on('update.show', (data) => {
      this.data = _.cloneDeep(data)
      this.data.classifiedList = data.game.classified.map(x => x.name).join()
      this.data.winning_numbers = this.data.winning_numbers.join()
      this.show()
    })
  },
  destroyed () {
    this.$bus.off('update.show')
  },
  methods: {
    async doSubmit () {
      const data = _.cloneDeep(this.data)
      data.winning_numbers = data.winning_numbers.split(',')
      await this.$thisApi.doUpdate(data)
      this.updateSuccess()
    }
  }
}
</script>
