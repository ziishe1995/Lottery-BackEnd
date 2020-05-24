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
        <a href="javascript:;">网站管理</a>
      </li>
      <li class="breadcrumb-item">
        <a href="javascript:;">新闻资讯</a>
      </li>
      <li class="breadcrumb-item active">
        新闻分类
      </li>
    </ol>
    <!-- end breadcrumb -->

    <!-- begin row -->
    <div class="">
      <!-- begin panel -->
      <div class="panel panel-inverse" style="clear:both;">
        <!-- begin panel-heading -->
        <div class="panel-heading p-t-10">
          <h4 class="text-white m-b-0">
            新闻分类
          </h4>
        </div>
        <!-- end panel-heading -->
        <!-- begin panel-body -->
        <div class="panel-body">
          <alert />
          <div class="row m-b-20 justify-content-end panel-search-box">
            <div class="col-sm-10 form-inline justify-content-end panel-search">
              <div class="form-group width-100 m-r-10">
                <j-select
                  v-model="search.enable"
                  :datas="options.enable"
                  title="状态"
                  :translate="translate.enable"
                />
              </div>
              <div class="form-group m-r-10">
                <input v-model="search.name" type="text" class="form-control" placeholder="请输入分类名称">
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
                  <th class="">
                    分类名称
                  </th>
                  <th class="width-100">
                    显示
                  </th>
                  <th class="width-150">
                    建立时间
                  </th>
                  <th class="width-70">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, index) in datas" :key="index">
                  <td>{{ startIndex + index }}</td>
                  <td>{{ data.name }}</td>
                  <td>
                    <i v-if="data.enable == Const.Y" class="fas fa-lg fa-check-circle text-green" />
                    <i v-else class="fas fa-lg fa-times-circle text-danger" />
                  </td>
                  <td>{{ data.created_at }}</td>
                  <td class="text-center">
                    <j-button type="edit" :action="true" @click="$bus.emit('update.show', data)" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- end table-responsive -->
          <!-- pagination -->

          <!-- end pagination -->
        </div>
      </div>
    </div>
    <update />
  </div>
</template>

<script>
import EnableConstant from 'constants/Enable'
import ListMixins from 'mixins/List'

export default {
  components: {
    update: require('./modal/update').default
  },
  mixins: [ListMixins],
  data: () => ({
    search: {
      name: '',
      enable: ''
    },
    options: {},
    translate: {
      enable: EnableConstant
    }
  }),
  api: 'site.news.category',
  mounted () {
    this.getOptions()
    this.doSearch()
  },
  methods: {
    async getOptions () {
      const res = await this.$thisApi.getOptions()
      this.options = res.data
    },
    getTotal () {}
  }
}
</script>
