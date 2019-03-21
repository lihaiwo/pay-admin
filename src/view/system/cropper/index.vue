<template>
  <div>
    <div>
      <cropper :height="current.height" :width="current.width" v-model="exampleImageSrc"></cropper>
    </div>
    <div>
      <Select v-model="currentItem" style="width:100px" @on-change="changeRatio">
        <Option v-for="item in ratioList" :value="item.id" :key="item.id">{{ item.width }}* {{ item.height }}</Option>
      </Select>
    </div>
  </div>
</template>
<script>
import Cropper from '@/components/utils/cropper'
export default {
  components: {
    Cropper
  },
  data () {
    return {
      exampleImageSrc: '',
      current: {},
      currentItem: 0,
      ratioList: [ 
        {width: 593, height: 331 ,id: 1},{width: 693, height: 331,id: 2},{width: 693, height: 431,id: 3}
      ],
    }
  },
  methods: {
    changeRatio (id) {
      let item = this.ratioList.find( x => x.id === id)
      this.current = {...item}
    }
  },
  mounted () {
    this.exampleImageSrc = 'http://app-store-1256697786.cos.ap-guangzhou.myqcloud.com/appicon/u=1118465461,567304387&fm=26&gp=0.jpg'
    // this.exampleImageSrc = 'http://sight.oss-cn-shenzhen.aliyuncs.com/e-starter/2019/3/20/c2d386ca-005d-46a4-66d6-0b478699f31c.png'
  }
}
</script>