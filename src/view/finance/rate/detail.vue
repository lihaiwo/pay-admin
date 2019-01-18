<template>
  <div>{{row}}</div>
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
  }
}
</script>
