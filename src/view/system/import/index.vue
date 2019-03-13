<template>
  <base-layout :status="pageStatus">
    <template slot="header-btn">
      <Button type="default" @click="openImport">导入</Button>
      <Button type="default" @click="getResultData">解析</Button>
      <Button type="default" @click="exportDownload">导出</Button>
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
      <import-form :status.sync="pageStatus"  @on-callback="callbackImport"></import-form>
    </div>
  </base-layout>
</template>
<script>
import importForm from '_c/form/import'
import tbox_period_1s from './tbox_period_1s.json'
import tbox_period_5s from './tbox_period_5s.json'
import tbox_period_30s from './tbox_period_30s.json'
import tbox_period_60s from './tbox_period_60s.json'
import ExportCsv from '@/libs/download';
import ExportCsvUtils from '@/libs/csv';
import main from '_c/mixins/main'
export default {
  components: { importForm },
  mixins: [main],
  data () {
    return {
      searchData: {},
      curIndex: 0,
      data: [],
      tempData: [],
      columns: [
        { title: "序号", key: "id" },
        { title: "节点", key: "group" },
        { title: "信号名", key: "name" },
        { title: "topic", key: "topic" },
      ],
    }
  },
  methods: {
    openImport () {//数据导入
      this.pageStatus = 3
    },
    callbackImport (data) {
      this.data = data.map( item => {
        var { "序号":id, "信号名": name, "节点": group, topic} = item
        return { id, name, group, topic }
      })
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
    //增删改查  ---end
    getResultData () {
      this.curIndex = this.data.length;
      this.tempData = [];

      this.getResult( tbox_period_1s , this.data );
      this.getResult( tbox_period_5s , this.data );
      this.getResult( tbox_period_30s , this.data );
      this.getResult( tbox_period_60s , this.data );
    },
    getResult (sourceData, json) {
      for (let [key, value] of Object.entries(sourceData.dataList)) {
        var temItem = json.find( x => x.name === key);
        if (temItem) {
          temItem.topic =sourceData.msgType
        }else {
          this.tempData.push({
            id: this.curIndex++ , group: '不存在', name: key, topic: sourceData.msgType
          })
        }
      }
    },
    exportDownload () {
      let columns = [];
      let datas = [];
      if (this.data) {
        datas = [...this.data, ...this.tempData];
        columns = [
          {title: '序号', key: 'id'},
          {title: '节点', key: 'group'},
          {title: '信号名', key: 'name'},
          {title: 'topic', key: 'topic'},
        ]
      }
      let noHeader = false;
      const data = ExportCsvUtils(columns, datas, {}, noHeader);
      ExportCsv.download('table.csv', data);
    },
  },
  mounted () {
    // this.initDictByType(['chargingSpeed']).then(()=>{
    //   this.chargingSpeedList = this.$store.getters.getDictListByType('chargingSpeed');
    // })
  }
}
</script>
