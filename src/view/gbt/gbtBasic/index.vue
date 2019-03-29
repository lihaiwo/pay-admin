<template>
  <base-layout :status="pageStatus">
    <template slot="header-btn">
      <Button type="default" @click="create(true)">新增</Button>
    </template>
    <div slot="search">
      <Form ref="searchData" :model="searchData" inline>
        <FormItem prop="topic">
          <Select v-model="searchData.topic" clearable placeholder="国标类型">
            <Option value="gb_data">国标数据</Option>
          </Select>
        </FormItem>
        <FormItem prop="signalType">
          <Select v-model="searchData.signalType" placeholder="信号类型" clearable>
            <Option :value="item.type" v-for="item in GB_SIGNALT_TYPEList" :key="item.id">{{item.title}}</Option>
          </Select>
        </FormItem>
        <FormItem prop="originKey">
          <Input type="text" v-model="searchData.originKey" clearable placeholder="原始key">
          </Input>
        </FormItem>
        <FormItem prop="signalKey">
          <Input type="text" v-model="searchData.signalKey" clearable placeholder="信号key">
          </Input>
        </FormItem>
        <FormItem prop="signalName">
          <Input type="text" v-model="searchData.signalName_like" clearable placeholder="信号名称">
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
        <Page :total="total" :current="current" show-elevator show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
      </div>
    </div>
    <div slot="children">
      <add :status.sync="pageStatus" @on-callback="callbackCreate"></add>
    </div>
  </base-layout>
</template>
<script>
import { apiInit } from '@/api/app'
const apiRequest = apiInit('gbt')
import add from './add'
import { columns } from './table'
import main from '_c/mixins/main'
import store from '@/store'
export default {
  components: { add },
  mixins: [main],
  data () {
    return {
      // 表格
      columns: columns(this),
      searchData: {},
      GB_SIGNALT_TYPEList: [],
    }
  },
  methods: {
    //增删改查  ---start
    create (isNew,index) {
      if(isNew) {
        this.pageStatus = 1
        this.eventHub.$emit('gbt-add', {})
      }else {
        this.eventHub.$emit('gbt-add', {...this.data[index]})
        this.pageStatus = 2
        // apiRequest.show(1).then(res => {
        //   console.log(res)
        // })
      }
    },
    remove (id) { //删除
    },
    search(flag) { //查询
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
    this.GB_SIGNALT_TYPEList = this.$store.getters.getDictListByType('GB_SIGNALT_TYPE');
  },
  beforeRouteEnter (to, from, next) {
    store.dispatch('initDictByType', ['GB_SIGNALT_TYPE']).then(()=>{
      next()
    })
  }
}
</script>
