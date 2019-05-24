export default [
  {path: '/admin',component: () => import('@/view/layout/index/admin'),
    children: [
      // 基本组件
      {path: '',component: () => import('@/view/layout/home')},
      {path: 'system/duty',component: () => import('@/view/system/duty/index.vue')},
      {path: 'system/import',component: () => import('@/view/system/import/index.vue')},
      {path: 'system/svg',component: () => import('@/view/system/svg/index.vue')},
      {path: 'system/cropper',component: () => import('@/view/system/cropper/index.vue')},
      // 国标基础表
      {path: 'gbt/gbtBasic',component: () => import('@/view/gbt/gbtBasic/index.vue')},
      {path: 'gbt/gbtEnum',component: () => import('@/view/gbt/gbtEnum/index.vue')},
      // 工具
      {path: 'tools/check',component: () => import('@/view/tools/check/index.vue')},
    ]
  }
]