<template>
  <Card class="o-create-card" v-show="isShow">
    <p slot="title">导入</p>
    <div>
      <Upload
        :before-upload="handleUpload"
        multiple
        type="drag"
        action="//jsonplaceholder.typicode.com/posts/">
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>Click or drag files here to upload</p>
        </div>
    </Upload>
    </div>
    <div class="o-create-btn">
      <Button type="primary" @click="handleSubmit">确定</Button>
      <Button @click="closeDiv">取消</Button>
    </div>
  </Card>
</template>
<script>
import children from '_c/mixins/children'
import { importf } from '@/libs/excel';
export default {
  mixins: [ children ],
  props: {
    value: {
      type: Number,
      default: 3
    },
    event: {
      type: String,
      default: "import-form"
    }
  },
  data() {
    return {
      jsonData: null,
    };
  },
  methods: {
    handleSubmit() {
      this.closeDiv();
      this.$emit("on-callback", this.jsonData);
    },
    
    handleUpload(file) {
      importf(file).then( json => {
        this.jsonData = json
      })
      return false
    },
  }
};
</script>
