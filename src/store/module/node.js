import MenuConstants from 'constants/Menu'

const type = {
  // mutation
  setNodes: 'Node/setNodes',
  // getters
  menus: 'Node/menus',
  menu: 'Node/menu',
  canRead: 'Node/canRead',
  canCreate: 'Node/canCreate',
  canUpdate: 'Node/canUpdate',
  canDelete: 'Node/canDelete',
  canPermission: 'Node/canPermission'
}

export { type as NodeType }

const findNode = (nodes, route) => {
  const code = MenuConstants[route.name]
  return _.find(nodes, { code })
}
const READ_SUFFIX = '_READ'
const CREATE_SUFFIX = '_CREATE'
const UPDATE_SUFFIX = '_UPDATE'
const DELETE_SUFFIX = '_DELETE'

export default {
  namespaced: true,
  state: {
    nodes: null
  },
  mutations: {
    setNodes (state, context) {
      state.nodes = context
    }
  },
  getters: {
    menus: state => _.filter(state.nodes, { display: 'Y', enable: 'Y' }),
    menu: (state, getters) => code => _.find(getters.menus, { code }),
    node: (state, getters, rootState) => findNode(state.nodes, rootState.route),
    canRead: (state, getters) => {
      return getters.node
        ? _.some(getters.node.nodes, { code: getters.node.code + READ_SUFFIX })
        : false
    },
    canCreate: (state, getters) => {
      return getters.node
        ? _.some(getters.node.nodes, { code: getters.node.code + CREATE_SUFFIX })
        : false
    },
    canUpdate: (state, getters) => {
      return getters.node
        ? _.some(getters.node.nodes, { code: getters.node.code + UPDATE_SUFFIX })
        : false
    },
    canDelete: (state, getters) => {
      return getters.node
        ? _.some(getters.node.nodes, { code: getters.node.code + DELETE_SUFFIX })
        : false
    },
    canPermission: (state, getters) => {
      return getters.node
        ? _.some(getters.node.nodes, { code: 'ROLE_PUBLIC_AUTHORIZATION' })
        : false
    }
  }
}
