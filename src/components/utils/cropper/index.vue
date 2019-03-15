<template>
<div class="cropper-wrapper">
  <div class="img-box">
    <img class="cropper-image" :id="imgId" alt="">
  </div>
  <div class="right-con">
    <div v-if="preview" class="preview-box" :id="previewId"></div>
    <div class="button-box">
      <Upload action="image/upload" :before-upload="beforeUpload">
        <Button style="width: 150px;" type="primary">上传图片</Button>
      </Upload>
      <div v-show="insideSrc">
        <Button style="width: 150px;margin-top: 10px;" type="primary" @click="crop">{{ cropButtonText }}</Button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import Cropper from 'cropperjs'
import './index.less'
import 'cropperjs/dist/cropper.min.css'
export default {
  props: {
    cropButtonText: {
      type: String,
      default: '裁剪'
    }
  },
  data () {
    return {
      cropper: null,
      insideSrc: '',
      preview: true,
    }
  },
  computed: {
    imgId () {
      return `cropper${this._uid}`
    },
    previewId () {
      return `cropper_preview${this._uid}`
    }
  },
  watch: {
    insideSrc (src) {
      this.replace(src)
    }
  },
  methods: {
    beforeUpload (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
        this.insideSrc = event.srcElement.result
      }
      return false
    },
    replace (src) {
      this.cropper.replace(src)
      this.insideSrc = src
    },
    crop () {
      this.cropper.getCroppedCanvas().toBlob(blob => {
        this.$emit('on-crop', blob)
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      let dom = document.getElementById(this.imgId)
      this.cropper = new Cropper(dom, {
        preview: `#${this.previewId}`,
        checkCrossOrigin: true
      })
    })
  }
}
</script>
