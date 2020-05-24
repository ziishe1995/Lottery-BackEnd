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
      <li class="breadcrumb-item active">
        广告轮播
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
            广告轮播
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
                  v-model="search.type_id"
                  :datas="options.type"
                  value-key="id"
                  title="类型"
                />
              </div>
              <div class="form-group width-100 m-r-10">
                <j-select
                  v-model="search.status"
                  :datas="options.status"
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
                    图示
                  </th>
                  <th>类型</th>
                  <th>标题</th>
                  <th>链接</th>
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
                  <td class="td-img">
                    <image-box :src="$s3Host + data.image_path" />
                  </td>
                  <td>{{ data.type.name }}</td>
                  <td class="text-left">
                    {{ data.title }}
                  </td>
                  <td>{{ data.url }}</td>
                  <td>
                    <i v-if="data.status == Const.Y" class="fas fa-lg fa-check-circle text-green" />
                    <i v-else class="fas fa-lg fa-times-circle text-danger" />
                  </td>
                  <td>{{ data.created_at }}</td>
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
    <create />
    <update />
  </div>
</template>

<script>
import EnableConstant from 'constants/Enable'
import ListMixins from 'mixins/List'

export default {
  components: {
    create: require('./modal/create').default,
    update: require('./modal/update').default
  },
  mixins: [ListMixins],
  data: () => ({
    search: {
      type_id: '',
      title: '',
      status: ''
    },
    options: {
      type: {},
      status: EnableConstant
    }
  }),
  api: 'site.adSlide',
  mounted () {
    this.getOptions()
    this.doSearch()
  },
  methods: {
    async getOptions () {
      const res = await this.$thisApi.getTypes()
      this.options.type = res.data
    }
  }
}
</script>
