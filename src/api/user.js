import axios from '@/libs/api.request'

export const logout = (token) => {
  return axios.request({
    url: '/user/logout',
    method: 'delete'
  })
}