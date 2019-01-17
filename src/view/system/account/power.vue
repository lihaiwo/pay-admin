<template>
  <Card class="o-create-card" v-show="isShow">
    <p slot="title">设置权限</p>
    <Tree :data="data"></Tree>
    <div class="o-create-btn">
      <Button type="primary" @click="handleSubmit">确定</Button>
      <Button @click="closeDiv">取消</Button>
    </div>
  </Card>
</template>
<script>
import children from '_c/mixins/children'
export default {
  mixins: [ children ],
  props: {
    value: {
      type: Number,
      default: 10
    },
    event: {
      type: String,
      default: 'power-tree'
    }
  },
  data() {
    return {
      data: [
        {
          title: "parent 1",
          expand: true,
          children: [
            {
              title: "parent 1-1",
              expand: true,
              children: [
                {
                  title: "leaf 1-1-1"
                },
                {
                  title: "leaf 1-1-2"
                }
              ]
            },
            {
              title: "parent 1-2",
              expand: true,
              children: [
                {
                  title: "leaf 1-2-1"
                },
                {
                  title: "leaf 1-2-1"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {
    handleSubmit() {
      this.closeDiv()
      this.$emit("on-callback", {});
    }
  },
  mounted () {
    this.eventHub.$on(this.event, data =>{
    })
  },
};
</script>
