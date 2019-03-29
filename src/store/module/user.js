import { setToken, getToken, getAccessList } from '@/libs/util'
import { setLocalStore, getLocalStore } from '@/libs/session'
import { logout } from '@/api/user'
export default {
	state: {
    token: getToken(),
    access: [],     // 角色权限
    accessRoutes: null,    // 角色权限路由
	},
	getters: {
	},
	mutations: {
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setAccess (state, access) {
      state.access = access
    },
    setAccessRoutes (state, accessRoutes) {
      state.accessRoutes = accessRoutes
    },
	},
	actions: {
		// 登录
    handleLogin ({ commit }, {userName, password}) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        const data = {token:1111}
        commit('setToken', data.token)

        setLocalStore('account', userName)
        resolve()
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('setToken', '')
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }, routes) {
      return new Promise((resolve, reject) => {
        if (state.access.length >0) {
          resolve( {access: state.access} );  // token已经拿到了
        }else {
          if (true) {
            commit('setAccess', [{}])
            resolve({access: state.access})
          }else { // err
            reject()
          }
        }
      })
    }
	}
}