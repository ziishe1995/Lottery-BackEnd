export default [
  {
    path: 'sys-setting',
    label: '系统设置',
    icon: 'fa fa-th-large',
    component: () => import('pages/SysSetting'),
    children: [
      {
        path: 'role-manage',
        name: 'ROLE_MG',
        label: '角色管理',
        component: () => import('pages/SysSetting/RoleSetting')
      },
      {
        path: 'account-manage',
        name: 'ACCOUNT_MG',
        label: '帐号管理',
        component: () => import('pages/SysSetting/AccountManage')
      }
    ]
  },
  {
    path: 'site-manage',
    label: '网站管理',
    icon: 'fas fa-cog',
    component: () => import('pages/SiteManage'),
    children: [
      {
        path: 'base-setting',
        name: 'BASE_SET',
        label: '基本设置',
        component: () => import('pages/SiteManage/BaseSetting')
      },
      {
        path: 'news',
        label: '新闻资讯',
        component: () => import('pages/SiteManage/News'),
        children: [
          {
            path: 'category',
            name: 'NEWS_CATEGORY',
            label: '新闻分类',
            component: () => import('pages/SiteManage/News/Category')
          },
          {
            path: 'manage',
            name: 'NEWS_MG',
            label: '新闻管理',
            component: () => import('pages/SiteManage/News/Manage')
          }
        ]
      },
      {
        path: 'ad-slide',
        name: 'AD_SLIDE',
        label: '广告轮播',
        component: () => import('pages/SiteManage/ADSlide')
      },
      {
        path: 'announcement-manage',
        name: 'ANNOUNCEMENT_MG',
        label: '公告管理',
        component: () => import('pages/SiteManage/Announcement')
      },
      {
        path: 'friendship-link',
        name: 'FRIENDSHIP_LINK',
        label: '友情链接',
        component: () => import('pages/SiteManage/Friendship')
      },
      {
        path: 'page-manage',
        name: 'PAGE_MG',
        label: '页面管理',
        component: () => import('pages/SiteManage/Page')
      }
    ]
  },
  {
    path: 'lottery-manage',
    label: '彩种管理',
    icon: 'fas fa-gem',
    component: () => import('pages/LotteryManage'),
    children: [
      {
        path: 'category',
        name: 'LOTTERY_CATEGORY',
        label: '彩种分类',
        component: () => import('pages/LotteryManage/Category')
      },
      {
        path: 'lottey-setting',
        name: 'LOTTERY_MG',
        label: '彩种设置',
        component: () => import('pages/LotteryManage/Setting')
      }
    ]
  },
  {
    path: 'lottery-results',
    name: 'LOTTERY_RESULTS',
    label: '开奖结果',
    icon: 'fa fa-info-circle',
    component: () => import('pages/LotteryResults')
  },
  {
    path: 'history',
    label: '历程记录',
    icon: 'fa fa-history',
    component: () => import('pages/HistoryRecord'),
    children: [
      {
        path: 'account-login',
        name: 'ACCOUNT_LOGIN_HISTORY',
        label: '帐号登入历程',
        component: () => import('pages/HistoryRecord/AccountLogin')
      }
    ]
  }
]
