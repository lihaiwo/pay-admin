<template>
  <base-layout :status="pageStatus">
    <template slot="header-btn">
      <Button type="default" @click="create(true)">新增</Button>
    </template>
    <div slot="search">
      <Form ref="searchData" :model="searchData" inline>
        <FormItem prop="topic">
          <Select v-model="searchData.topic" placeholder="国标类型">
            <Option value="gb_data">国标数据</Option>
          </Select>
        </FormItem>
        <FormItem prop="signal">
          <Input type="text" v-model="searchData.signalKey_like" placeholder="信号key">
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
const apiRequest = apiInit('gbt_enum')
import add from './add'
import { columns } from './table'
import main from '_c/mixins/main'
export default {
  components: { add },
  mixins: [main],
  data () {
    return {
      // 表格
      columns: columns(this),
      searchData: {},
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
    // this.initDictByType(['chargingSpeed']).then(()=>{
    //   this.chargingSpeedList = this.$store.getters.getDictListByType('chargingSpeed');
    // })
  }
}
</script>
