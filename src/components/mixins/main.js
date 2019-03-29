import { mapActions } from "vuex";
export default {
  data () {
    return {
      pageStatus: 0,
      data: [],
      // 分页
      total: 0,
      current: 1,
      pageSize: this.$config.pageSize,
    }
  },
  methods: {
    ...mapActions([
      'initDictByType'
    ]),
    pageChange(index) { //分页时间
      this.current = index;
      this.search();
    },
    pageSizeChange (pageSize) {
      this.pageSize = pageSize;
      this.search();
    },
    callbackCreate (data) {
      this.search();
    },
  }
}