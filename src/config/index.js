import baseURL from '_conf/url'
export default {
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: 'admin',
  TOKEN_KEY: 'akpay',
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: false,
  baseURL: baseURL,
  /**
   * 分页对象的设置
   */
  pageSize: 10,
  pageSizeOpts: [1,10,25,50,100],
  enabledPower: false,  //是否启动权限认证
}
