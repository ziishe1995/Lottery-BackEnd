import menuRoutes from './menuRoutes'
export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/Login')
  },
  {
    path: '/',
    component: () => import('pages/index'),
    children: [
      {
        path: '',
        name: 'welcome',
        component: () => import('pages/Index/Welcome')
      },
      {
        path: 'edit-profile',
        name: 'edit-profile',
        component: () => import('pages/Index/Profile')
      },
      ...menuRoutes
    ]
  },
  { path: '*', redirect: '/login' }
]
