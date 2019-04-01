<template>
  <base-layout :status="pageStatus">
    <template slot="header-btn">
      <Button type="default" @click="openImport" :disabled="!searchData.months || !searchData.names">导入</Button>
    </template>
    <div slot="search">
      <Form ref="searchData" :model="searchData" inline>
        <FormItem prop="appName">
          <DatePicker type="month" v-model="searchData.months" placeholder="月份" style="width: 200px"></DatePicker>
        </FormItem>
        <FormItem prop="appName">
          <Input type="text" v-model="searchData.names" placeholder="姓名">
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="search(true)" class="o-search">过滤</Button>
          <Button  @click="resetSearch">重置</Button>
        </FormItem>
      </Form>
    </div>
    <div slot="body-table">
      <Table :row-class-name="rowClassName" :columns="columns" :data="data"></Table>
      <div class="o-page">
        <Page :total="total" :current="current" show-elevator @on-change="pageChange" @on-page-size-change="pageChange"></Page>
      </div>
    </div>
    <div slot="children">
      <import-form :status.sync="pageStatus"  @on-callback="callbackImport"></import-form>
    </div>
  </base-layout>
</template>
<script>
import importForm from './import'
import { dataFilter } from '@/libs/filters'
import main from '_c/mixins/main'
export default {
  components: { importForm },
  mixins: [main],
  data () {
    return {
      searchData: {},
      data: [],
      tempData: [],
      columns: [
        { title: "日期", key: "curDate" },
        { title: "员工编号", key: "EnNo" },
        { title: "姓名", key: "Name" },
        { title: "上班", key: "curDate1" },
        { title: "下班", key: "curDate2" },
      ],
    }
  },
  methods: {
    openImport () {//数据导入
      this.pageStatus = 3
    },
    callbackImport (data) {
      var tmpData = [];
      var fullyear = this.searchData.months.getFullYear()
      var months = this.searchData.months.getMonth()
      var curMonthDate = new Date(fullyear,months+1,0);
      var days = curMonthDate.getDate()
      for (let day = 1; day <= days; day++){
        var tmpDate = new Date(fullyear,months+1,0);
        tmpDate.setDate(day)
        tmpData.push({})
      }
      data.forEach((x,i) => {
        if(x.Name){
          var curDate = new Date(x.DateTime)
          if (curDate.getFullYear() === fullyear && curDate.getMonth() === months && this.searchData.names === x.Name) {
            var temItem = tmpData[curDate.getDate()-1]
            if (temItem.Name) {
              temItem.curDate2 = x.DateTime.substr(11)
            }else {
              Object.assign(temItem,x)
              temItem.curDate1 = x.DateTime.substr(11)
              temItem.curDate = dataFilter(curDate,'yyyy-MM-dd')
            }
          }
        }
      });
      this.data = tmpData
    },
    //增删改查  ---start
    callbackCreate () {

    },
    search (flag) {
      if (flag) this.current = 1;
      this.search();
    },
    resetSearch () {
    },
    rowClassName (row, index) {
      if (row.curDate1>'09:00:00' || row.curDate2<'18:00:00') {
          return 'demo-table-error-row';
      }
      return '';
    }
  },
  mounted () {
    // this.initDictByType(['chargingSpeed']).then(()=>{
    //   this.chargingSpeedList = this.$store.getters.getDictListByType('chargingSpeed');
    // })
  }
}
</script>
<style>
.ivu-table .demo-table-error-row td{
  background-color: #ff6600;
  color: #fff;
}
</style>
