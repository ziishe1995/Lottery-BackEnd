import { LoginType } from 'module/login'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      isLogin: LoginType.isLogin
    })
  },
  created () {
    if (!this.isLogin) {
      this.$router.replace('login')
    }
  }
}
