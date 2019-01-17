export default {
  props: {
    status: {
      type: Number,
      default: 0
    },
  },
  computed: {
    isShow () {
      return this.value === this.status
    },
  },
  methods: {
    RequestFilter (dom) {
      const request = {}
      for(let key of Object.keys(dom)) {
        if(!key.startsWith('_')) {
          request[key] = dom[key]
        }
      }
      return request
    },
    closeDiv() {
      this.$emit('update:status', 0)
    },
  },
  destroyed () {
    if(this.event) {
      this.eventHub.$off(this.event)
    }
  },
}