export default [{
  path: '/login',
  name: 'login',
  component: () => import ('@/view/login/login')
},{
  path: '*',
  component: () => import('@/view/welcome.vue')
}
]