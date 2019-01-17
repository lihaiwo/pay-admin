<template>
    <div class="fc">
      <div class="fc-toolbar">
        <div class="fc-left"></div>
        <RadioGroup class="fc-right" v-model="type" type="button">
          <Radio label="月"></Radio>
          <Radio label="周"></Radio>
          <Radio label="天"></Radio>
        </RadioGroup>
      </div>
      <agenda-week></agenda-week>
    </div>
</template>
<script>
import { dateFtt } from '@/libs/tools'
import agendaWeek from './agendaWeek.vue'
export default {
  components: { agendaWeek },
  data() {
    return {
      type: '周',
    };
  },
  methods: {
  },
  mounted () {
  }
};
</script>
<style lang="less" src="./index.less">
</style>
