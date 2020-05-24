<template>
  <detail title="新增" @submit="doSubmit()">
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">帐号</label>
      <div class="col-md-10">
        <validate rules="required|min:4|max:32">
          <input v-model="data.account" type="text" class="form-control">
        </validate>
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">昵称</label>
      <div class="col-md-10">
        <validate rules="required|min:4|max:32">
          <input v-model="data.display_name" type="text" class="form-control">
        </validate>
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">密码</label>
      <div class="col-md-10">
        <validate rules="required|min:4|max:32" vid="password">
          <input v-model="data.password" type="password" class="form-control">
        </validate>
        <!--<div class="m-t-1 form-txt text-red">需英数组合, 4~16字元</div>-->
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">密码确认</label>
      <div class="col-md-10">
        <validate rules="required|confirmed:password">
          <input
            v-model="data.password_confirmation"
            type="password"
            class="form-control"
          >
        </validate>
        <!--<div class="m-t-1 form-txt text-red">需英数组合, 4~16字元</div>-->
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 control-label required">角色</label>
      <div class="col-md-10">
        <validate rules="required">
          <multi-select
            v-model="data.roles"
            :options="
              _.map(options.roles, role => ({
                value: role.id,
                text: role.display_name
              }))
            "
            :selected-options="data.roles"
            @select="item => (data.roles = item)"
          />
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">状态</label>
      <div class="col-md-10">
        <switcher v-model="data.status" :enable="Const.ENABLE" :disable="Const.DISABLE" />
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label">备注</label>
      <div class="col-md-10">
        <textarea
          v-model="data.remark"
          cols="30"
          rows="5"
          class="form-control"
        />
      </div>
    </div>
  </detail>
</template>

<script>
import DetailMixins from 'mixins/Detail'
import { MultiSelect } from 'vue-search-select'

export default {
  components: {
    MultiSelect
  },
  mixins: [DetailMixins],
  mounted () {
    this.$bus.on('create.show', () => {
      this.data = {
        roles: [],
        status: 'enable'
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
      data.role_id = _.map(data.roles, 'value')
      await this.$thisApi.doCreate(data)
      this.createSuccess()
    }
  }
}
</script>
