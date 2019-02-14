<template>
  <div class="icons">
    <div v-for="item in svgList" class="icons-item" @click="copy">
      <svg-icon :name="item" style="width:32px;height:32px;"></svg-icon>
      <p>{{item}}</p>
    </div>
  </div>
</template>
<script>
import { getAllIcons } from '@/libs/require.context'
export default {
  data () {
    return {
      svgList: getAllIcons()
    }
  },
  methods: {
    copy () {
      // this.$Message.success('组件代码已经复制到剪切板')
    }
  }
}
</script>
<style lang="less" scoped>
.icons-item {
  float: left;
  margin: 6px 6px 6px 0;
  width: 145px;
  text-align: center;
  list-style: none;
  cursor: pointer;
  height: 100px;
  color: #5c6b77;
  transition: all .2s ease;
  position: relative;
  padding-top: 10px;
  p {
    padding-top: 15px;
  }
}
</style>
