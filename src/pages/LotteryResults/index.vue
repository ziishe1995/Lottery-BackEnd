<template>
  <div id="content" class="content">
    <!-- begin breadcrumb -->
    <ol class="breadcrumb pull-right m-b-20">
      <li class="breadcrumb-item">
        <router-link :to="{ name: 'welcome' }">
          首页
        </router-link>
      </li>
      <li class="breadcrumb-item active">
        开奖结果
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
            开奖结果
          </h4>
        </div>
        <!-- end panel-heading -->
        <!-- begin panel-body -->
        <div class="panel-body">
          <div class="row m-b-20 justify-content-end panel-search-box">
            <div class="col-sm-12 form-inline justify-content-end panel-search">
              <date-time-search-bar
                :start.sync="search.start"
                :end.sync="search.end"
              />
              <div class="form-group width-100 m-r-10">
                <j-select
                  v-model="search.classified_id"
                  :datas="options.lottery_classified"
                  value-key="id"
                  title="分类"
                />
              </div>
              <div class="form-group width-100 m-r-10">
                <j-select
                  v-model="search.lottery_id"
                  :datas="options.lottery_game"
                  value-key="id"
                  title="彩种"
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
                <input
                  v-model="search.period"
                  type="text"
                  class="form-control"
                  placeholder="请输入期数"
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
                  <th>分类</th>
                  <th>彩种</th>
                  <th class="width-200">
                    期数
                  </th>
                  <th class="width-150">
                    开奖时间
                  </th>
                  <th>
                    开奖号码
                  </th>
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
                    <span
                      v-for="(t, i) in data.game.classified"
                      :key="i"
                    >
                      <span v-if="i !== 0">,</span>
                      {{ t.name }}
                    </span>
                  </td>
                  <td>{{ data.game.name }}</td>
                  <td>{{ data.period }}</td>
                  <td>{{ data.draw_time }}</td>
                  <td class="text-left open-num">
                    <span
                      v-for="(t, i) in data.winning_numbers"
                      :key="i"
                      class="num"
                      :class="{'special':i === data.winning_numbers.length-1}"
                    >
                      <span>{{ t }}</span>
                    </span>
                  </td>
                  <td>
                    <i v-if="data.enable == Const.Y" class="fas fa-lg fa-check-circle text-green" />
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
          <paginate
            :page="paginate.page"
            :last-page="lastPage"
            @pageChange="pageChange"
          />
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
      start: moment().startOf('day').getDateTime(),
      end: moment().endOf('day').getDateTime(),
      classified_id: '',
      lottery_id: '',
      enable: '',
      period: ''
    },
    options: {
      enable: EnableConstant
    }
  }),
  api: 'lotteryResults.results',
  created () {
    this.getOptions()
    this.doSearch()
  },
  methods: {
    async getOptions () {
      const res = await this.$thisApi.getOptions()
      this.options = Object.assign({}, this.options, res.data)
      this.options.enable = EnableConstant
    },
    async getList () {
      const res = await this.$thisApi.getList(this.reqBody)
      this.datas = res.data
    },
    async getTotal () {
      const res = await this.$thisApi.getTotal(this.reqBody)
      this.paginate.total = res.data
    }
  }
}
</script>
