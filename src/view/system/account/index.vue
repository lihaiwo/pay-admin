<template>
  <base-layout :status="pageStatus">
    <template slot="header-btn">
      <Button type="default" @click="create(true)">新增</Button>
      <Button type="default" @click="openPowerTree">设置菜单权限</Button>
    </template>
    <div slot="search">
      <Form ref="searchData" :model="searchData" inline>
        <FormItem prop="appName">
          <Input type="text" v-model="searchData.appName_like" placeholder="App名称">
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="search(true)" class="o-search">查询</Button>
          <Button  @click="resetSearch">重置</Button>
        </FormItem>
      </Form>
    </div>
    <div slot="body-table">
      <Table stripe :columns="columns" :data="data"></Table>
      <div class="o-page">
        <Page :total="total" :current="current" show-elevator @on-change="pageChange" @on-page-size-change="pageChange"></Page>
      </div>
    </div>
    <div slot="children">
      <add :status.sync="pageStatus" @on-callback="callbackCreate"></add>
      <power-tree :status.sync="pageStatus" :value="4" @on-callback="callbackTree"></power-tree>
    </div>
  </base-layout>
</template>
<script>
import { apiInit } from '@/api/app'
const apiRequest = apiInit('sys_user_info')
import { columns } from './table'
import add from './add'
import PowerTree from './power'
import main from '_c/mixins/main'
export default {
  components: { add, PowerTree },
  mixins: [main],
  data () {
    return {
      searchData: {},
      columns: columns(this),
    }
  },
  methods: {
    openPowerTree () {
      this.pageStatus = 4
      this.eventHub.$emit('power-tree', {aaa: 11})
    },
    callbackTree (data) {
    },
    //增删改查  ---start
    create (isNew,index) {
      if(isNew) {
        this.pageStatus = 1
        this.eventHub.$emit('account-add', {})
      }else {
        this.eventHub.$emit('account-add', {...this.data[index]})
        this.pageStatus = 2
        // apiRequest.show(1).then(res => {
        //   console.log(res)
        // })
      }
    },
    remove (id) { //删除
    },
    search (flag) {
      if (flag) this.current = 1;
      apiRequest.index({
        pageNum: this.current, pageSize: this.pageSize, ...this.searchData
      }).then(res => {
        this.data = res.data
        this.total = res.total
      })
    },
    resetSearch () {
    }
    //增删改查  ---end
  },
  mounted () {
    // this.boardList = this.$store.state.app.cacheObj.board
  },
  // beforeRouteEnter (to, from, next) {
  //   apiInit('board').index().then( res =>{
  //     store.commit('cache_increment', {key: 'board',value: res})
  //     next()
  //   })
  // }
}
</script>
