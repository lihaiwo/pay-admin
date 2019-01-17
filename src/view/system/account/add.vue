<template>
  <Card class="o-create-card" v-show="isShow">
    <p slot="title">账户{{statusName}}</p>
    <a href="#" slot="extra" @click.prevent=""><Icon type="ios-refresh-circle" />重置</a>
    <Row :gutter="16">
      <Form ref="addForm" :model="addForm" :rules="ruleValidate" :label-width="120">
        <Col span="12">
          <FormItem label="App名称" prop="appName">
            <Select v-model="addForm.appName">
              <Option value="xianjinsujie">现金速借</Option>
              <Option value="jingyudai">鲸鱼贷</Option>
            </Select>
          </FormItem>
          <FormItem label="App首页广告图" prop="picture">
            <Input v-model="addForm.picture" placeholder="请输入App首页广告图地址"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="跳转URL" prop="url">
            <Input v-model="addForm.url" placeholder="请输入跳转URL"></Input>
          </FormItem>
          <FormItem label="启用状态" prop="status">
            <Select v-model="addForm.status">
              <Option v-for="item in statusList" :value="item.key" :key="item.key">{{ item.value }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Form>
    </Row>
    <div class="o-create-btn">
      <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
      <Button @click="closeDiv">取消</Button>
    </div>
  </Card>
</template>
<script>
import children from '_c/mixins/children'
export default {
  mixins: [children],
  props: {
    value: {
      type: Array,
      default: () => {
        return [1,2]
      }
    },
    event: {
      type: String,
      default: 'account-add'
    }
  },
  computed: {
    isShow () {
      return this.value.indexOf(this.status) > -1
    },
    statusName () {
      return this.status==1?'新增':'修改'
    }
  },
  data () {
    return {
      addForm: {},
      //字典
      statusList: [],
      ruleValidate: { //表单效验

      }
    }
  },
  methods: {
    handleSubmit (name) { //新增、保存提交按钮
      this.$refs[name].validate(valid => {
        if (valid) {
          this.closeDiv()
          this.$emit("on-callback", {bb:111});
        }
      })
    },
  },
  mounted () {
    // this.eventHub.$on(this.event, data =>{
    // })
  },
}
</script>
