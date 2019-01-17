<template>
  <Card class="o-create-card" v-show="isShow">
    <p slot="title">元数据{{editStatusName}}</p>
    <a href="#" slot="extra" @click.prevent="resetFields('formValidate')"><Icon type="ios-loop-strong"></Icon>重置</a>
    <Row :gutter="16">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <Col span="12">
          <FormItem label="类型" prop="type">
            <Select v-model="formValidate.type">
              <Option :value="item.kname" v-for="item in boardList" :key="item.id">{{item.cname}}</Option>
            </Select>
          </FormItem>
          <FormItem label="名称" prop="cname">
            <Input v-model="formValidate.cname" placeholder="请输入名称"></Input>
          </FormItem>
          <FormItem label="备注" prop="remarks">
            <Input v-model="formValidate.remarks" placeholder="请输入名称"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="字段名" prop="kname">
            <Input v-model="formValidate.kname" placeholder="请输入字段名"></Input>
          </FormItem>
          <FormItem label="url" prop="url">
            <Input v-model="formValidate.url" placeholder="请输入url">
              <Upload slot="append" action="/system/upload" :on-success="uploadCb" :show-upload-list="false">
                <Button icon="ios-cloud-upload-outline">上传</Button>
              </Upload>
            </Input>
          </FormItem>
        </Col>
      </Form>
    </Row>
    <div class="o-create-btn">
      <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
      <Button @click="closeDiv(),resetFields('formValidate')">取消</Button>
    </div>
  </Card>
</template>
<script>
import simple from '_c/mixins/simple'
import { apiInit } from '@/api/app'
const apiRequest = apiInit('code_view')

export default {
  mixins: [simple],
  props: {
    value: {
      type: Array,
      default: () => {
        return [1,2]
      }
    },
    event: {
      type: String,
      default: 'autoCode-edit'
    }
  },
  computed: {
    isShow () {
      return this.value.indexOf(this.status) > -1
    },
    editStatusName () {
      return this.status==1?'新增':'修改'
    }
  },
  data () {
    return {
      // 字典
      boardList: [],
      // form表单
      formValidate: {  //保存新增的表单
      },
      ruleValidate: { //表单效验的配置文件
      },
    }
  },
  methods: {
    handleSubmit (name) { //新增、保存提交按钮
      this.$refs[name].validate(valid => {
        if (valid) {
          if(this.status==1) {
            apiRequest.create(this.formValidate).then( res => {
              this.closeDiv()
              this.$emit("on-callback", {});
              this.resetFields('formValidate');
              this.$Message.success("新增成功");
            })
          }else{
            apiRequest.update(this.RequestFilter(this.formValidate)).then( res => {
              this.closeDiv()
              this.$emit("on-callback", {});
              this.resetFields('formValidate');
              this.$Message.success("修改成功");
            })
          }
        }
      })
    },
    uploadCb (res) {
      this.formValidate.url = res.url
    },
    //清除模态框验证状态
    resetFields(formRule){
      this.$refs[formRule].resetFields();
    },
  },
  mounted () {
    this.boardList = this.$store.state.app.cacheObj.board
    this.eventHub.$on(this.event, data =>{
      const { id, type, cname, remarks, kname, url } = data
      this.formValidate =  { type, cname, remarks, kname, url, id }
    })
  },
 
}
</script>
