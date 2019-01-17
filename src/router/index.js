import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import { LoadingBar } from 'ikpay'
import { getToken, canTurnTo } from '@/libs/util'
import config from '@/config'

Vue.use(Router)
const router = new Router({
  routes,
  // mode: 'history'
})
const LOGIN_PAGE_NAME = 'login'

router.beforeEach((to, from, next) => {
  LoadingBar.start()
  if(!config.enabledPower){
    next() // 跳转
    return
  }
  const token = getToken()
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: 'welcome' // 跳转到home页
    })
  } else {
    store.dispatch('getUserInfo', routes).then(user => {
      // 拉取用户信息，通过用户权限和跳转的页面的path来判断是否有权限访问;access是[]
      if(true || canTurnTo(to, user.access, routes)) next() // 有权限，可访问
      else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
    })
  }
})

router.afterEach(to => {
  LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
