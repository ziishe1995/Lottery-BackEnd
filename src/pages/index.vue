<template>
  <div id="page-container" class="fade page-sidebar-fixed page-header-fixed show" :class="{ 'page-sidebar-minified': !isShowMenu }">
    <!-- begin #header -->
    <div id="header" class="header navbar-default">
      <!-- begin navbar-header -->
      <div class="navbar-header">
        <router-link
          :to="{
            name: 'welcome',
          }"
          class="navbar-brand"
        >
          <span class="navbar-logo" /> <b>彩票开奖网管理系统</b>
        </router-link>
        <button type="button" class="navbar-toggle" data-click="sidebar-toggled">
          <span class="icon-bar" />
          <span class="icon-bar" />
          <span class="icon-bar" />
        </button>
      </div>
      <!-- end navbar-header -->

      <!-- begin header-nav -->
      <ul class="navbar-nav navbar-right">
        <li class="dropdown navbar-user">
          <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
            <img v-if="account.cover" :src="account.cover.path">
            <img v-else src="/resource/assets/img/user/user-13.jpg" alt="">

            <span v-if="account" class="d-none d-md-inline">{{ account.display_name }}</span>
            <b class="caret" />
          </a>
          <div class="dropdown-menu dropdown-menu-right">
            <router-link
              class="dropdown-item"
              :to="{
                name: 'edit-profile',
              }"
            >
              个人资料
            </router-link>
            <div class="dropdown-divider" />
            <a href="javascript:;" class="dropdown-item" @click="doLogout()">登出</a>
          </div>
        </li>
      </ul>
      <!-- end header navigation right -->
    </div>
    <!-- end #header -->

    <!-- begin #sidebar -->
    <div id="sidebar" class="sidebar">
      <!-- begin sidebar scrollbar -->
      <div data-scrollbar="true" data-height="100%">
        <!-- begin sidebar user -->
        <ul class="nav">
          <li class="nav-profile">
            <a href="javascript:;" data-toggle="nav-profile">
              <div class="cover with-shadow" />
              <div class="image">
                <img v-if="account.cover" :src="account.cover.path">
                <img v-else src="/resource/assets/img/user/user-13.jpg" alt="">
              </div>
              <div v-if="account" class="info">
                {{ account.display_name }}
              </div>
            </a>
          </li>
        </ul>
        <!---Menu--->
        <MenuComponent :router="menuRoutes" :is-show-menu="isShowMenu" @menu-toggle="isShowMenu = !isShowMenu" />
        <!---Menu--->
      </div>
      <!-- end sidebar scrollbar -->
    </div>
    <div class="sidebar-bg" />
    <!-- end #sidebar -->

    <!-- begin #content -->
    <router-view />
    <!-- end #content -->

    <!-- begin scroll to top btn -->
    <a href="javascript:;" class="btn btn-icon btn-circle btn-success btn-scroll-to-top fade" data-click="scroll-top">
      <i class="fa fa-angle-up" />
    </a>
    <!-- end scroll to top btn -->
  </div>
</template>

<script>
import { LoginType } from 'module/login'
import Menu from 'constants/Menu'
import CheckLoginMixins from 'mixins/CheckLogin'
import IndexMixins from 'mixins/Index'
import menuRoutes from 'router/menuRoutes.js'

export default {
  components: {
    MenuComponent: require('@/Menu/Menu').default
  },
  mixins: [CheckLoginMixins, IndexMixins],
  data: () => ({
    isShowMenu: true,
    menuRoutes
  }),
  mounted () {
    this.$bus.on('scrollTop.show', (data) => {
      $('html, body').animate({
        scrollTop: $('body').offset().top
      }, 500)
    })
    this.$bus.on('menu.show', (data) => {
      this.isShowMenu = data
    })
    this.dataInit()
  },
  methods: {
    doLogout () {
      this.$store.commit(LoginType.clearAccessToken)
      this.$router.push({
        name: 'login'
      })
    },
    dataInit () {
      axios.all([this.getNodes(), this.getAccount()]).then(() => {
        this.$nextTick(() => {
          App.init()
        })
      })
    }
  }
}
</script>

<style lang="stylus">
	.upload-box .img-show
	  display block
</style>
