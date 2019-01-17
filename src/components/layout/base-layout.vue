<template>
  <div class="container">
    <div>
      <slot name="search"></slot>
    </div>
    <div class="o-edit-btn">
      <slot name="header-btn"></slot>
    </div>
    <div class="">
      <slot name="body-table"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BaseLayout'
}
</script>
