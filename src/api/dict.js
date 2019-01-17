import axios from '@/libs/api.request'

export const getDictionaryByType = (type) => {
  return axios.request({
    urlRap: 'http://47.107.106.30:7007/app/mock/20/dictionary-info/dicts',
    url: '/v1/public/dictionary-info/'+ type.join(','),
    method: 'get'
  })
}
