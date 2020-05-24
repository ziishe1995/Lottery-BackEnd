<template>
  <li v-if="node">
    <permission-node
      v-model="data"
      :class-name="className ? className : null"
      :title="node.display_name"
      :values="values"
      :has-child="!!node.nodes"
    />
    <ul v-if="node.nodes" class="limit-sub">
      <permission-tree v-for="(n, index) in node.nodes" :key="index" v-model="data" :node="n" />
    </ul>
  </li>
</template>

<script>
import { JacLib } from 'jactools'

export default {
  components: {
    PermissionNode: () => import('@/Permission/Node'),
    PermissionTree: () => import('@/Permission/Tree')
  },
  props: ['node', 'value', 'className'],
  data: () => ({
    data: []
  }),
  computed: {
    values () {
      return this.node.nodes
        ? JacLib.getAllSubNodeID(this.node.nodes)
        : [this.node.id]
    }
  },
  watch: {
    data () {
      this.$emit('input', this.data)
    },
    value () {
      this.data = this.value
    }
  },
  mounted () {
    this.data = this.value
  }
}
</script>
