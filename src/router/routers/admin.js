export default [
  {path: '/admin',component: () => import('@/view/admin/index/index'),
    children: [
      {path: '',component: () => import('@/view/admin/home')},
      {path: 'system/account',component: () => import('@/view/system/account/index.vue')},
    ]
  }
]