import { mapActions } from "vuex";
export default {
  data () {
    return {
      pageStatus: 0,
      data: [],
      // 分页
      total: 0,
      current: 1,
    }
  },
  methods: {
    ...mapActions([
      'initDictByType'
    ]),
    pageChange(index) { //分页时间
      this.page.pageNum = index;
      this.search();
    },
    callbackCreate (data) {
      this.search();
    },
  }
}