import axios from '@/libs/api.request'

export const apiInit = (table) => {
  const api = {
    index (params) {
      return axios.request({
        url: '/app/'+table,
        params,
        method: 'get'
      })
    },
    create (data) {
      return axios.request({
        url: '/app/'+table,
        data,
        method: 'post'
      })
    },
    show (id) {
      return axios.request({
        url: '/app/'+table+'/'+id,
        method: 'get'
      })
    },
    update (data) {
      return axios.request({
        url: '/app/'+table+'/'+data.id,
        data,
        method: 'put'
      })
    },
    destroy (id) {
      return axios.request({
        url: '/app/'+table+'/'+id,
        method: 'delete'
      })
    }
  }
  return api;
}