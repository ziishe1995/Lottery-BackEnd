import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Login from './module/login'
import Node from './module/node'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Login,
    Node
  },
  plugins: [createPersistedState()]
})
