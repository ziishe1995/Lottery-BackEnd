<template>
  <li
    v-if="inAllNodes(...handleHasMenu(item))"
  >
    <permission-node
      v-if="item.icon"
      v-model="data.nodes"
      :title="item.label"
      :class-name="item.icon"
      :values="getAllSubNodeID(
        nameNodeList
      )"
    />
    <ul v-if="item.nameList" class="limit-sub">
      <permission-tree v-for="(x, index) in item.nameList" :key="index" v-model="data.nodes" :node="findNode(x)" />
    </ul>
  </li>
</template>
<script>
import Menu from 'constants/Menu'
import IndexMixins from 'mixins/Index'
import { JacLib } from 'jactools'

export default {
  components: {
    PermissionNode: () => import('@/Permission/Node'),
    PermissionTree: () => import('@/Permission/Tree')
  },
  mixins: [IndexMixins],
  props: ['item', 'data', 'thisoptions'],
  data: () => ({
    Menu
  }),
  methods: {
    handleHasMenu (data) {
      const result = []
      const find = function (sitemap) {
        for (let i = 0; i < sitemap.length; i++) {
          const site = sitemap[i]
          if (site.name) {
            result.push(Menu[site.name])
          }
          if (site.children) {
            find(site.children)
          }
        }
      }
      if (data.name) {
        result.push(Menu[data.name])
      }
      if (data.children) {
        find(data.children)
      }
      this.item.nameList = result
      const nameNodeList = []
      result.forEach((x) => {
        const obj = this.findNode(x)
        nameNodeList.push(obj)
      })
      this.nameNodeList = nameNodeList
      return result
    },
    inAllNodes (...codes) {
      for (const code of codes) {
        if (_.some(this.thisoptions.Nodes.All, { code })) {
          return true
        }
      }
      return false
    },
    findNode (code) {
      return _.find(this.thisoptions.Nodes.All, { code })
    },
    getAllSubNodeID: JacLib.getAllSubNodeID
  }
}
</script>
