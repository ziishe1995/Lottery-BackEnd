import router from 'src/router'

const type = {
  // mutation
  setAccessToken: 'Login/setAccessToken',
  clearAccessToken: 'Login/clearAccessToken',
  setAccount: 'Login/setAccount',
  // action
  //
  // getters
  isLogin: 'Login/isLogin',
  isAdmin: 'Login/isAdmin'
}

export { type as LoginType }

export default {
  namespaced: true,
  state: {
    access: null,
    account: null
  },
  mutations: {
    setAccessToken (state, context) {
      state.access = context
    },
    clearAccessToken (state) {
      state.access = null
      router.replace({ name: 'login' })
    },
    setAccount (state, context) {
      state.account = context
    }
  },
  actions: {},
  getters: {
    isLogin: state => !!state.access,
    isAdmin: state => _.getVal(state.account, 'roles.0.code') === 'SYSTEM_MG'
  }
}
