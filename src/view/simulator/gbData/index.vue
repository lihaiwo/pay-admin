<template>
  <div>
  <base-layout :status="pageStatus">
    <template slot="header-btn">
      <Button type="default" @click="modifyState">模拟器更新</Button>
      <!-- <Button type="warning" @click="create(true)">关闭模拟器</Button> -->
    </template>
    <div slot="search">
      <Form ref="searchData" :model="searchData" inline>
        <FormItem prop="vin">
          <Input type="text" v-model="searchData.vin" clearable placeholder="vin码">
          </Input>
        </FormItem>
        <FormItem prop="startFlag">
          <Select v-model="searchData.startFlag" clearable placeholder="是否启动">
            <Option :value="1">启动</Option>
            <Option :value="0">暂停</Option>
          </Select>
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
  <Modal v-model="showSettingModel" scrollable title="设置mock地址" @on-ok="modifyVin(modelForm)">
    <Form :model="modelForm" :label-width="80">
      <FormItem label="vin码">
        <Input v-model="modelForm.vin" disabled></Input>
      </FormItem>
      <FormItem label="任务名称" prop="taskName">
        <Input v-model="modelForm.taskName" placeholder="任务名称"></Input>
      </FormItem>
      <FormItem label="mock地址" prop="url">
        <Input v-model="modelForm.url" placeholder="mock地址"></Input>
      </FormItem>
    </Form>
  </Modal>
  </div>
</template>
<script>
import { apiInit, modifyRedis } from '@/api/app'
const apiRequest = apiInit('dw_dim_vehicle')
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
      modelForm: {},
      showSettingModel: false,
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
    modifyState () {
      let tmepList = this.data.filter( x => x.startFlag == '1')
      if (tmepList.length>3) {
        this.$Message.success("模拟器数量不能大于3个");
        return;
      }
      modifyRedis({
        key: 'redis_task_gb_config', value: {
          flag: tmepList.length>0? true: false, vinList: tmepList.map(x =>x.url)
        }
      }).then( res => {
        this.$Message.success("模拟器状态更新成功");
      })
    },
    modifyVin (row) {
      apiRequest.update({
        id: row.id, url: row.url, taskName: row.taskName
      }).then(res => {
        this.search()
      })
    },
    setUrl (index) {
      this.modelForm = {...this.data[index]};
      this.showSettingModel = true;
    },
    startOrStop (id,flag) { //启动或暂停
      apiRequest.update({
        id, startFlag: flag, startTime: new Date().getTime()
      }).then(res => {
        this.search()
      })
    },
    search(flag) { //查询
      if (flag) this.current = 1;
      apiRequest.index({
        pageNum: this.current, pageSize: this.pageSize,sortBy: 'start_flag desc', ...this.searchData
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
  },
}
</script>
