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
        角色管理
      </li>
    </ol>
    <!-- end breadcrumb -->
    <!-- begin page-header -->
    <!-- <h1 class="page-header">帐号管理</h1> -->
    <!-- end page-header -->

    <!-- begin row -->
    <div class="">
      <div class="panel panel-inverse" style="clear:both;">
        <!-- begin panel-heading -->
        <div class="panel-heading p-t-10">
          <h4 class="text-white m-b-0">
            角色管理
          </h4>
        </div>
        <div class="panel-body">
          <alert />
          <div class="row m-b-20 justify-content-end panel-search-box">
            <div class="col-sm-2">
              <j-button type="add" @click="$bus.emit('create.show')" />
            </div>
            <div class="col-sm-10 form-inline justify-content-end panel-search">
              <div class="form-group width-100 m-r-10">
                <select v-model="search.enable" class="form-control">
                  <option value="">
                    状态
                  </option>
                  <option v-for="(name, val) in options.enable" :key="val" :value="val">
                    {{ name }}
                  </option>
                </select>
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
                  <th class="width-150">
                    名称
                  </th>
                  <th>描述</th>
                  <th class="width-100">
                    状态
                  </th>
                  <th class="width-150">
                    建立时间
                  </th>
                  <th class="width-100">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, index) in datas" :key="index">
                  <td>{{ startIndex + index }}</td>
                  <td>{{ data.display_name }}</td>
                  <td class="text-left">
                    {{ data.description }}
                  </td>
                  <td>
                    <i v-if="data.enable === Const.Y" class="fas fa-lg fa-check-circle text-green" />
                    <i v-else class="fas fa-lg fa-times-circle text-danger" />
                  </td>
                  <td>{{ data.created_at }}</td>
                  <td class="text-left">
                    <j-button type="permission" :action="true" @click="$bus.emit('permission.show', data.id)" />
                    <j-button
                      v-if="data.code === 'CUSTOM'"
                      type="edit"
                      :action="true"
                      @click="$bus.emit('update.show', data)"
                    />
                    <j-button
                      v-if="data.code === 'CUSTOM'"
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
          <paginate :page="paginate.page" :last-page="lastPage" @pageChange="pageChange" />
        </div>
        <!-- end pagination -->
      </div>
    </div>
    <create />
    <update />
    <permission />
  </div>
</template>

<script>
import Enable from 'constants/Enable'
import ListMixins from 'mixins/List'

export default {
  components: {
    Create: require('./modal/create').default,
    Update: require('./modal/update').default,
    Permission: require('./modal/permission').default
  },
  mixins: [ListMixins],
  data: () => ({
    search: {
      enable: ''
    },
    options: {
      enable: Enable
    }
  }),
  api: 'system.role',
  created () {
    this.doSearch()
  },
  methods: {}
}
</script>
