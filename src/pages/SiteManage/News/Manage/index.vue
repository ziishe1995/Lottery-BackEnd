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
        新闻管理
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
            新闻管理
          </h4>
        </div>
        <!-- end panel-heading -->
        <!-- begin panel-body -->
        <div class="panel-body">
          <alert />
          <div class="row m-b-20 justify-content-end panel-search-box">
            <div class="col-sm-10 form-inline justify-content-end panel-search">
              <date-time-search-bar
                :start.sync="search.start"
                :end.sync="search.end"
              />
              <div class="form-group width-100 m-r-10">
                <j-select
                  v-model="search.classified_id"
                  :datas="options.classified"
                  title="分类"
                  value-key="id"
                />
              </div>
              <div class="form-group width-100 m-r-10">
                <j-select
                  v-model="search.enable"
                  :datas="options.enable"
                  title="状态"
                />
              </div>
              <div class="form-group m-r-10">
                <input v-model="search.title" type="text" class="form-control" placeholder="请输入标题">
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
                  <th class="width-200">
                    封面
                  </th>
                  <th class="">
                    分类
                  </th>
                  <th>标题</th>
                  <th>来源</th>
                  <th class="width-100">
                    状态
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
                  <td>
                    <image-box v-if="data.picture_url" :src="data.picture_url" />
                  </td>
                  <td>{{ translate.classified[data.classified_id] }}</td>
                  <td class="text-left">
                    <span v-html="data.title" />
                  </td>
                  <td>{{ data.source }}</td>
                  <td>
                    <i v-if="data.enable == Const.Y" class="fas fa-lg fa-check-circle text-green" />
                    <i v-else class="fas fa-lg fa-times-circle text-danger" />
                  </td>
                  <td>{{ data.post_time }}</td>
                  <td class="text-center">
                    <j-button type="edit" :action="true" @click="$bus.emit('update.show', data)" />
                    <j-button type="delete" :action="true" @click="doDelete(data.id)" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- end table-responsive -->
          <!-- pagination -->
          <paginate :page="paginate.page" :last-page="lastPage" @pageChange="pageChange" />
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
      title: '',
      enable: '',
      classified_id: ''
    },
    options: {
      classified: [],
      enable: EnableConstant
    },
    translate: {
      classified: {}
    }
  }),
  api: 'site.news.manage',
  mounted () {
    this.getOptions()
    this.doSearch()
  },
  methods: {
    async getOptions () {
      const res = await this.$thisApi.getOptions()
      this.options.classified = res.data.classified
      this.translate.classified = _.keyVal(this.options.classified, 'id', 'name')
    },
    async getTotal () {
      const res = await this.$thisApi.getTotal(this.reqBody)
      this.paginate.total = res.data
    }
  }
}
</script>
