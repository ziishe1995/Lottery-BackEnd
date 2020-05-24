<template>
  <div id="content" class="content">
    <!-- begin breadcrumb -->
    <ol class="breadcrumb pull-right m-b-20">
      <li class="breadcrumb-item">
        <router-link :to="{ name: 'welcome' }">
          首页
        </router-link>
      </li>
      <li class="breadcrumb-item">
        <a href="javascript:;">系统设置</a>
      </li>
      <li class="breadcrumb-item active">
        帐号管理
      </li>
    </ol>

    <!-- begin row -->
    <div class="">
      <div class="panel panel-inverse" style="clear:both;">
        <!-- begin panel-heading -->
        <div class="panel-heading p-t-10">
          <h4 class="text-white m-b-0">
            帐号管理
          </h4>
        </div>
        <!-- end panel-heading -->
        <!-- begin panel-body -->
        <div class="panel-body">
          <alert />
          <div class="row m-b-20 justify-content-end panel-search-box">
            <div class="col-sm-2">
              <j-button type="add" @click="$bus.emit('create.show')" />
            </div>
            <div class="col-sm-10 form-inline justify-content-end panel-search">
              <div class="form-group width-100 m-r-10">
                <j-select
                  v-model="search.role_id"
                  :datas="options.roles"
                  title="角色"
                  value-key="id"
                  display-key="display_name"
                />
              </div>
              <div class="form-group width-100 m-r-10">
                <j-select
                  v-model="search.status"
                  :datas="options.status"
                  title="状态"
                  :translate="translate.status"
                />
              </div>
              <div class="form-group m-r-10">
                <input
                  v-model="search.account"
                  type="text"
                  class="form-control"
                  placeholder="请输入帐号"
                >
              </div>
              <j-button type="search" @click="doSearch" />
            </div>
          </div>
          <!-- begin table-responsive -->
          <div class="table-responsive">
            <table class="table  table-striped table-box text-center">
              <thead>
                <tr>
                  <th class="width-30">
                    #
                  </th>
                  <th>帐号</th>
                  <th>昵称</th>
                  <th>角色</th>
                  <th class="width-100">
                    状态
                  </th>
                  <th class="width-150">
                    建立时间
                  </th>
                  <th class="width-150">
                    最后登入时间
                  </th>
                  <th class="width-70">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, index) in datas" :key="index">
                  <td>{{ startIndex + index }}</td>
                  <td>{{ data.account }}</td>
                  <td>{{ data.display_name }}</td>
                  <td>{{ _.map(data.roles, "display_name").join(", ") }}</td>
                  <td>
                    <i
                      v-if="data.status === 'enable'"
                      class="fas fa-lg fa-check-circle text-green"
                    />
                    <i v-else class="fas fa-lg fa-times-circle text-danger" />
                  </td>
                  <td>{{ data.created_at }}</td>
                  <td>{{ data.updated_at }}</td>
                  <td class="text-left">
                    <j-button
                      type="edit"
                      :action="true"
                      @click="$bus.emit('update.show', data)"
                    />
                    <j-button
                      type="delete"
                      :action="true"
                      @click="doDelete(data.id)"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- end table-responsive -->
          <!-- pagination -->
          <paginate
            :page="paginate.page"
            :last-page="lastPage"
            @pageChange="pageChange"
          />
          <!-- end pagination -->
        </div>
      </div>
    </div>
    <create />
    <update />
  </div>
</template>

<script>
import AccountManageStatus from 'constants/AccountManageStatus'
import AccountManageLayers from 'constants/AccountManageLayers'
import ListMixins from 'mixins/List'

export default {
  components: {
    Create: require('./modal/create').default,
    Update: require('./modal/update').default
  },
  mixins: [ListMixins],
  data: () => ({
    search: {
      role_id: '',
      status: ''
    },
    options: {},
    translate: {
      status: AccountManageStatus,
      layers: AccountManageLayers
    }
  }),
  api: 'system.manage',
  created () {
    this.dataInit()
    this.doSearch()
  },
  methods: {
    async getOptions () {
      const res = await this.$thisApi.getOptions()
      this.options = Object.assign({}, this.options, res.data)
    },
    dataInit () {
      this.getOptions()
    }
  }
}
</script>
