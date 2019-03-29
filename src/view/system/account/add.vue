<template>
  <Card class="o-create-card" v-show="isShow">
    <p slot="title">账户{{statusName}}</p>
    <a href="#" slot="extra" @click.prevent=""><Icon type="ios-refresh-circle" />重置</a>
    <Row :gutter="16">
      <Form ref="addForm" :model="addForm" :rules="ruleValidate" :label-width="120">
        <Col span="12">
          <FormItem label="账户" prop="userName">
            <Input v-model="addForm.userName" placeholder="账户"></Input>
          </FormItem>
          <FormItem label="用户密码" prop="pwd">
            <Input v-model="addForm.pwd" type="password" placeholder="用户密码"></Input>
          </FormItem>
          <FormItem label="角色" prop="userRoleName">
            <Input v-model="addForm.userRoleName" placeholder="角色"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="用户姓名" prop="nickName">
            <Input v-model="addForm.nickName" placeholder="用户姓名"></Input>
          </FormItem>
          <FormItem label="电话" prop="phone">
            <Input v-model="addForm.phone" placeholder="电话"></Input>
          </FormItem>
        </Col>
        <Col span="24">
          <FormItem label="备注" prop="des">
            <Input type="textarea" :rows="3" v-model="addForm.userComment" placeholder="备注"></Input>
          </FormItem>
        </col>
      </Form>
    </Row>
    <div class="o-create-btn">
      <Button type="primary" @click="handleSubmit('addForm')">提交</Button>
      <Button @click="closeDiv(),resetFields('addForm')">取消</Button>
    </div>
  </Card>
</template>
<script>
import { apiInit } from '@/api/app'
const apiRequest = apiInit('sys_user_info')
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
      ruleValidate: { //表单效验

      }
    }
  },
  methods: {
    handleSubmit (name) { //新增、保存提交按钮
      this.$refs[name].validate(valid => {
        if (valid) {
          if(this.status==1) {
            apiRequest.create(this.addForm).then( res => {
              this.closeDiv()
              this.$emit("on-callback", {});
              this.resetFields('addForm');
              this.$Message.success("新增成功");
            })
          }else{
            apiRequest.update(this.addForm).then( res => {
              this.closeDiv()
              this.$emit("on-callback", {});
              this.resetFields('addForm');
              this.$Message.success("修改成功");
            })
          }
        }
      })
    },
    //清除模态框验证状态
    resetFields(formRule){
      this.$refs[formRule].resetFields();
    },
  },
  mounted () {
    this.eventHub.$on(this.event, data =>{
      this.addForm =  data
    })
  },
}
</script>
