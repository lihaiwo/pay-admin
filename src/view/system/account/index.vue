<template>
  <base-layout>
    <div slot="header-btn">
      <Button type="default" @click="create(true)">新增</Button>
    </div>
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
    <div slot="dialog-children">
      <keep-alive>
        <component v-bind:is="currentTabComponent"></component>
      </keep-alive>
    </div>
  </base-layout>
</template>
<script>
import add from './add'
import edit from './edit'
import { mapActions } from "vuex";
export default {
  components: { add, edit },
  data () {
    return {
      currentTabComponent: 'add',
      searchData: {},
      data: [],
      columns: [
        { title: "账户", key: "appName" },
        { title: "用户名称", key: "title" },
        { title: "角色", key: "weight" },
      ],
      // 分页
      total: 0,
      current: 1,
    }
  },
  methods: {
    ...mapActions([
      'initDictByType'
    ]),
    create () {
    },
    pageChange(index) { //分页
      this.current = index;
      this.search();
    },
    search (flag) {
      if (flag) this.current = 1;
      this.search();
    },
    resetSearch () {
    }
  },
  mounted () {
    // this.initDictByType(['chargingSpeed']).then(()=>{
    //   this.chargingSpeedList = this.$store.getters.getDictListByType('chargingSpeed');
    // })
  }
}
</script>
