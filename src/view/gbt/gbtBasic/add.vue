<template>
  <Card class="o-create-card" v-show="isShow">
    <p slot="title">国标{{statusName}}</p>
    <a href="#" slot="extra" @click.prevent=""><Icon type="ios-refresh-circle" />重置</a>
    <Row :gutter="16">
      <Form ref="addForm" :model="addForm" :rules="ruleValidate" :label-width="120">
        <Col span="12">
          <FormItem label="国标类型" prop="topic">
            <Select v-model="addForm.topic">
              <Option value="gb_data">国标数据</Option>
            </Select>
          </FormItem>
          <FormItem label="原始key" prop="originKey">
            <Input v-model="addForm.originKey" placeholder="原始key"></Input>
          </FormItem>
          <FormItem label="信号key" prop="signalKey">
            <Input v-model="addForm.signalKey" placeholder="信号key"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="信号名称" prop="signalName">
            <Input v-model="addForm.signalName" placeholder="信号名称"></Input>
          </FormItem>
          <FormItem label="分组" prop="group">
            <Select v-model="addForm.group">
            </Select>
          </FormItem>
          <FormItem label="类型" prop="type">
            <Select v-model="addForm.type">
              <Option value="0">枚举</Option>
              <Option value="1">键值</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="24">
          <FormItem label="描述及要求" prop="des">
            <Input type="textarea" :rows="3" v-model="addForm.des" placeholder="描述及要求"></Input>
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
import children from '_c/mixins/children'
import { apiInit } from '@/api/app'
const apiRequest = apiInit('gbt')
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
      default: 'gbt-add'
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
