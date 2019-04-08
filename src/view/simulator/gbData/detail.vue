<template>
  <div>{{row.url}}</div>
</template>
<script>
export default {
  props: {
    row: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
    }
  },
  mounted () {
  }
}
</script>
