import axios from '@/libs/api.request'

export const getDictionaryByType = (type) => {
  return new Promise((resolve,reject)=> {
    axios.request({
      url: '/app/dict',
      params: {
        value_in: type.join(',')
      },
      method: 'get'
    }).then( res => {
      let jsonData = {}
      type.forEach( (x,i) => jsonData[x] = [])
      res.data.forEach( (item,i) => jsonData[item.value].push(item) )
      resolve(jsonData)
    })
  })
}
