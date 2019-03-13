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
      <add :status.sync="pageStatus"></add>
      <power-tree :status.sync="pageStatus" :value="4" @on-callback="callbackTree"></power-tree>
    </div>
  </base-layout>
</template>
<script>
import add from './add'
import PowerTree from './power'
import main from '_c/mixins/main'
export default {
  components: { add, PowerTree },
  mixins: [main],
  data () {
    return {
      searchData: {},
      columns: [
        { title: "账户", key: "appName" },
        { title: "用户名称", key: "title" },
        { title: "角色", key: "weight" },
      ],
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
    callbackCreate () {

    },
    create (isNew) {
      this.pageStatus = isNew? 1: 2
    },
    remove (id) { //删除
    },
    search (flag) {
      if (flag) this.current = 1;
      this.search();
    },
    resetSearch () {
    }
    //增删改查  ---end
  },
  mounted () {
    // this.initDictByType(['chargingSpeed']).then(()=>{
    //   this.chargingSpeedList = this.$store.getters.getDictListByType('chargingSpeed');
    // })
  }
}
</script>
