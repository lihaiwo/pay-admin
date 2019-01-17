<template>
  <div>
    <div v-show="editStatus==0">
      <Form ref="searchData" :model="searchData" inline>
        <FormItem>
          <Button type="primary" @click="search(true)">查询</Button>
        </FormItem>
      </Form>
      <div class="o-edit-btn">
        <Button type="default" @click="create(true)">新增</Button>
      </div>
      <Table stripe :columns="columns" :data="data"></Table>
      <div class="o-page">
        <Page :total="total" :current="page.pageNum" show-elevator @on-change="pageChange" @on-page-size-change="pageChange"></Page>
      </div>
    </div>
    <edit :status.sync="editStatus" @on-callback="callbackCreate"></edit>
  </div>
</template>
<script>
import { apiInit } from '@/api/app'
const apiRequest = apiInit('board')
import edit from './edit'
import { columns } from './table'
import index from '_c/mixins/index'

export default {
  components: {edit},
  mixins: [index],
  data () {
    return {
      // 表格
      columns: columns(this),
      searchData:{},
    }
  },
  methods: {
    create(isNew,row) {  //新增、修改
      if(isNew) {
        this.editStatus = 1
      }else {
        this.eventHub.$emit('autoCode-edit', {...row})
        this.editStatus = 2
        apiRequest.show(1).then(res => {
          console.log(res)
        })
      }
    },
    remove (id) { //删除
      apiRequest.destroy(id).then(res => {
        this.search();
        this.$Message.success("删除成功");
      })
    },
    search(flag) { //查询
      if (flag) {
        this.page.pageNum = 1
      }
      apiRequest.index().then(res => {
        this.data = res;
      })
    }
  },
  mounted () { //初始化
    this.search(true)
  }
}
</script>
