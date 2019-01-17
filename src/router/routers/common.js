export default [{
  path: '/login',
  name: 'login',
  component: () => import ('@/view/login/login')
},{
  path: '/',
  name: 'welcome',
  component: () => import('@/view/welcome.vue')
},{
  path: '/401',
  name: 'error_401',
  component: () => import('@/view/error-page/401.vue')
},
{
  path: '/500',
  name: 'error_500',
  component: () => import('@/view/error-page/500.vue')
},
{
  path: '*',
  component: () => import('@/view/error-page/404.vue')
}
]