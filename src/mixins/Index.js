import { LoginType } from 'module/login'
import { NodeType } from 'module/node'

export default {
  methods: {
    async getNodes () {
      const res = await this.$api.user.pilot.getNodes()
      this.$store.commit(NodeType.setNodes, res.data)
    },
    async getAccount () {
      const res = await this.$api.user.pilot.getProfile()
      this.$store.commit(LoginType.setAccount, res.data)
    }
  },
  computed: {
    menus () {
      return this.$store.getters[NodeType.menus]
    },
    account () {
      return this.$store.state.Login.account
    }
  }
}
