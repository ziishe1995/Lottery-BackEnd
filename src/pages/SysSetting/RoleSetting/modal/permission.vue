<template>
  <detail title="权限" @submit="doSubmit()">
    <ul class="limit-main">
      <PermissionMenuComponent
        v-for="(item, index) in menuRoutes"
        :key="index"
        :item="item"
        :thisoptions="thisOptions"
        :data="data"
      />
    </ul>
  </detail>
</template>

<script>
import Menu from 'constants/Menu'
import menuRoutes from 'router/menuRoutes.js'
import IndexMixins from 'mixins/Index'
import DetailMixins from 'mixins/Detail'
import { JacLib } from 'jactools'

export default {
  components: {
    PermissionMenuComponent: require('@/Permission/PermissionMenu').default
  },
  mixins: [IndexMixins, DetailMixins],
  data: () => ({
    thisOptions: {
      Nodes: {
        All: [],
        Own: []
      }
    },
    data: {
      id: '',
      nodes: []
    },
    Menu,
    menuRoutes
  }),
  mounted () {
    this.$bus.on('permission.show', async (id) => {
      this.getAllNodes()
      await this.getOwnNodes(id)
      this.data.id = id
      setTimeout(() => {
        this.data.nodes = _.chain(this.thisOptions.Nodes.Own).map('nodes').reduce((result, node) => {
          return result.concat(_.map(node, 'id'))
        }, []).value()
      })
      this.show()
    })
  },
  destroyed () {
    this.$bus.off('permission.show')
  },
  methods: {
    async getAllNodes () {
      const res = await this.$thisApi.getAllNodes()
      this.thisOptions.Nodes.All = res.data
    },
    async getOwnNodes (id) {
      const res = await this.$thisApi.getOwnNodes({ id })
      this.thisOptions.Nodes.Own = res.data
    },
    getAllSubNodeID: JacLib.getAllSubNodeID,
    async doSubmit () {
      await this.$thisApi.doBind(this.data)
      this.getNodes()
      this.$alert.success('绑定成功')
      this.$modal.hide()
    }
  }
}
</script>
