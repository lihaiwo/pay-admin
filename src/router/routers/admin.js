export default [
  {path: '/admin',component: () => import('@/view/admin/index/index'),
    children: [
      {path: '',component: () => import('@/view/admin/home')},
      {path: 'system/dict',component: () => import('@/view/system/dict/index.vue')},
      {path: 'system/duty',component: () => import('@/view/system/duty/index.vue')},
      {path: 'system/import',component: () => import('@/view/system/import/index.vue')},
      {path: 'system/svg',component: () => import('@/view/system/svg/index.vue')},
      {path: 'system/cropper',component: () => import('@/view/system/cropper/index.vue')},

      {path: 'gbt/gbtBasic',component: () => import('@/view/gbt/gbtBasic/index.vue')},
      {path: 'gbt/gbtEnum',component: () => import('@/view/gbt/gbtEnum/index.vue')},

      {path: 'tools/check',component: () => import('@/view/tools/check/index.vue')},
    ]
  }
]