<template>
  <div>
    <div v-for="(option,index) in options" @click="check(option)" 
      :class="{ active: option.value == currentValue }">
      <slot :option="option"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CommonList',
  props: {
    options: {
      type: Array,
      required: true
    },
    value: String
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  methods: {
    check (option) {
      this.currentValue = option.value;
      this.$emit('input', option.value);
    }
  },
  watch: {
    value(val) {
      this.currentValue = val;
    },
  }
}
</script>
