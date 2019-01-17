<template>
  <div class="container">
    <div v-show="isShow">
      <slot name="search"></slot>
      <div class="o-edit-btn">
        <slot name="header-btn"></slot>
      </div>
      <slot name="body-table"></slot>
    </div>
    <div>
      <slot name="children"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BaseLayout',
  props: {
    value: {
      type: Number,
      default: 0
    },
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
}
</script>
