import Cookies from 'js-cookie'
// cookie保存的天数
import config from '@/config'
const { title, TOKEN_KEY } = config

export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, {expires: config.cookieExpires || 1})
}

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) return token
  else return false
}

export const remevoToken = () => {
  Cookies.remove(TOKEN_KEY)
}

/**
 * @param {*} access 用户权限数组，如 ['super_admin', 'admin']
 * @param {*} route 路由列表
 */
const hasAccess = (menuPower, route) => {
  var index = menuPower.findIndex(x => x.url== route.path)
  return index>-1? true: false
}
/**
 * 权鉴
 * @param {*} name 即将跳转的路由name
 * @param {*} access 用户权限数组
 * @param {*} routes 路由列表
 * @description 用户是否可跳转到该页
 */
export const canTurnTo = (to, access, routes) => {
  var systemPath = config.system.path
  var path = to.path.substring(systemPath.length) || '/'
  return (to.name || access.indexOf(path)> -1)
}
export const getAccessList = (menuPower) => {
  const access = []
  for(let item of menuPower.values()) {
    access.push('/' + item.url)
  }
  return access
}

/**
 * @description 根据当前跳转的路由设置显示在浏览器标签的title
 * @param {Object} routeItem 路由对象
 * @param {Object} vm Vue实例
 */
export const setTitle = (routeItem, vm) => {
  const pageTitle = (routeItem.meta && routeItem.meta.title)
  const resTitle = pageTitle ? `${title} - ${pageTitle}` : title
  window.document.title = resTitle
}