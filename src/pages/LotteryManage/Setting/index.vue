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
        <a href="javascript:;">彩种管理</a>
      </li>
      <li class="breadcrumb-item active">
        彩种设置
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
            彩种设置
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
                  v-model="search.classified_id"
                  :datas="options.classified"
                  value-key="id"
                  title="分类"
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
                <input v-model="search.name" type="text" class="form-control" placeholder="请输入彩种名称">
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
                  <th class="width-20">
                    图示
                  </th>
                  <th class="width-250">
                    分类
                  </th>
                  <th>彩种名称</th>
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
                  <td style="width:100px">
                    <image-box :src="toResourceUrl(data.image_path)" />
                  </td>
                  <td>
                    <span
                      v-for="(t, i) in data.classified"
                      :key="i"
                    >
                      <span v-if="i !== 0">,</span>
                      {{ t.name }}
                    </span>
                  </td>
                  <td class="text-left">
                    {{ data.name }}
                  </td>
                  <td>
                    <i v-if="data.enable == Const.Y" class="fas fa-lg fa-check-circle text-green" />
                    <i v-else class="fas fa-lg fa-times-circle text-danger" />
                  </td>
                  <td>{{ data.created_at }}</td>
                  <td class="text-center">
                    <j-button type="rule" :action="true" @click="$bus.emit('ruleUpdate.show', data)" />
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
    <ruleUpdate />
  </div>
</template>

<script>
import EnableConstant from 'constants/Enable'
import ListMixins from 'mixins/List'
import ImageMixins from 'mixins/Image'

export default {
  components: {
    update: require('./modal/update').default,
    ruleUpdate: require('./modal/ruleUpdate').default
  },
  mixins: [ListMixins, ImageMixins],
  data: () => ({
    search: {
      classified_id: '',
      name: '',
      enable: ''
    },
    options: {
      classified: {},
      enable: EnableConstant
    }
  }),
  api: 'lottery.setting',
  mounted () {
    this.getOptions()
    this.doSearch()
  },
  methods: {
    async getOptions () {
      const res = await this.$thisApi.getOptions()
      this.options.classified = res.data.lottery_classified
    }
  }
}
</script>
