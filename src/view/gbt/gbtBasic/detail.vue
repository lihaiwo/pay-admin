<template>
  <div>{{des}}</div>
</template>
<script>
import { apiInit } from '@/api/app'
const apiRequest = apiInit('gbt_enum')
export default {
  props: {
    row: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      des: ''
    }
  },
  mounted () {
    apiRequest.index({ pageNum: 1, pageSize: 10, signalKey: this.row.signalKey }).then(res => {
      this.des = res.data.map( x => x.optionName + '-' + x.optionValue);
    })
  }
}
</script>
