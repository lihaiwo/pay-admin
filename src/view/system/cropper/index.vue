<template>
  <div>
    <cropper 
      crop-button-text="确认提交"
      @on-crop="handleCroped"></cropper>
  </div>
</template>
<script>
import Cropper from '@/components/utils/cropper'
import { uploadImg } from '@/api/app'
export default {
  components: {
    Cropper
  },
  data () {
    return {
    }
  },
  methods: {
    handleCroped (blob) {
      const formData = new FormData()
      formData.append('file', blob, 'aaa.png')
      uploadImg(formData).then(() => {
        this.$Message.success('Upload success~')
      })
    }
  }
}
</script>