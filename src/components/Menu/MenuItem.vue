<template>
  <li
    v-if="item.label && hasMenu(getAllNodesCode(item))"
    :class="{
      'has-sub': item.children,
      'active': hasActive(item),
    }"
  >
    <a v-if="item.children" href="javascript:;">
      <b class="caret" />
      <i v-if="item.icon" :class="item.icon" />
      <span> {{ item.label }}</span>
    </a>
    <ul v-if="item.children" class="sub-menu">
      <menu-item v-for="(x, index) in item.children" :key="index" :item="x" />
    </ul>
    <router-link v-else :to="{ name: item.name }">
      <i v-if="item.icon" :class="item.icon" /><span>{{ item.label }}</span>
    </router-link>
  </li>
</template>
<script>
import Menu from 'constants/Menu'
import IndexMixins from 'mixins/Index'

export default {
  components: {
    MenuItem: () => import('./MenuItem')
  },
  mixins: [IndexMixins],
  props: ['item'],
  methods: {
    hasActive (item) {
      if (item.name) {
        return item.name === this.$route.name
      } else if (item.children) {
        return _.some(item.children, i => this.hasActive(i))
      }
      return false
    },
    getAllNodesCode (item) {
      let result = []
      if (item.name) {
        result.push(Menu[item.name])
      }
      if (item.children) {
        _.forEach(item.children, (i) => {
          result = result.concat(this.getAllNodesCode(i))
        })
      }
      return result
    },
    hasMenu (codes) {
      return _.some(codes, (code) => {
        const menu = _.find(this.menus, { code })
        return menu && _.some(menu.nodes, x => _.endsWith(x.code, '_READ'))
      })
    }
  }
}
</script>
