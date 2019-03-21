<template>
<div class="cropper-upload" :style="{height: height+'px', width: width+'px'}">
  <div class="cropper-upload-wrapper" @click="initCropper">
    <Icon type="ios-camera" size="20" v-show="!value"></Icon>
    <img v-if="value" :src="value" alt="">
  </div>

  <Modal v-model="showUpload" fullscreen title="图片选择" footer-hide @on-cancel="clear">
    <div class="cropper-wrapper">
      <div class="cropper-wrapper-image">
        <div class="img-box">
          <img class="cropper-image" :id="imgId" alt="">
        </div>
        <div class="cropper-wrapper-btn">
          <ButtonGroup>
            <Button type="primary" @click="magnify">变大</Button>
            <Button type="primary" @click="shrink">缩小</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button type="primary" @click="move(0, -moveStep)">
              <Icon type="md-arrow-round-up" :size="18"/>
            </Button>
            <Button type="primary" @click="move(0, moveStep)">
              <Icon type="md-arrow-round-down" :size="18"/>
            </Button>
            <Button type="primary" @click="move(-moveStep, 0)">
              <Icon type="md-arrow-round-back" :size="18"/>
            </Button>
            <Button type="primary" @click="move(moveStep, 0)">
              <Icon type="md-arrow-round-forward" :size="18"/>
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button type="primary" @click="scale('X')">上下</Button>
            <Button type="primary" @click="scale('Y')">左右</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button type="primary" icon="md-refresh" @click="reset"></Button>
          </ButtonGroup>
        </div>
      </div>
      <div class="cropper-preview-box">
        <div class="preview-box" :id="previewId" :style="{ height: mathHeigth}"></div>
        <Input :value="width" class="cropper-text">
          <span slot="prepend">  宽  </span>
          <span slot="append">px</span>
        </Input>
        <Input :value="height" class="cropper-text">
          <span slot="prepend">高</span>
          <span slot="append">px</span>
        </Input>
        <Upload action="image/upload" :before-upload="beforeUpload">
          <Button type="primary" icon="md-images" style="width:255px;">选择图片</Button>
        </Upload>
        <Button type="success" long @click="crop">确认提交</Button>
      </div>
    </div>
  </Modal>
</div>
</template>
<script>
import { uploadImg } from '@/api/app'
import Cropper from 'cropperjs'
import './index.less'
import 'cropperjs/dist/cropper.min.css'
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 400
    },
    width: {
      type: Number,
      default: 400
    },
    moveStep: {
      type: Number,
      default: 4
    },
  },
  data () {
    return {
      showUpload: false,
      cropper: null,
    }
  },
  computed: {
    mathHeigth () {
      return (this.height/ this.width * 255).toFixed(2) + 'px !important'
    },
    imgId () {
      return `cropper${this._uid}`
    },
    previewId () {
      return `cropper_preview${this._uid}`
    }
  },
  watch: {
    value (val) {
    },
  },
  methods: {
    beforeUpload (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
        this.replace(event.srcElement.result)
      }
      return false
    },
    initCropper () {
      this.cropper = new Cropper(document.getElementById(this.imgId), {
        viewMode: 1,
        aspectRatio: this.width/this.height,
        minCropBoxWidth: this.width,
        minCropBoxHeight: this.height,
        preview: `#${this.previewId}`,
        // checkCrossOrigin: false,
        // checkOrientation: false,
      })
      this.showUpload=true;
      // if (this.value){
      //   this.replace(this.value)
      // }
    },
    shrink () {
      this.cropper.zoom(-0.1)
    },
    magnify () {
      this.cropper.zoom(0.1)
    },
    move (...argu) {
      this.cropper.move(...argu)
    },
    scale (d) {
      this.cropper[`scale${d}`](-this.cropper.getData()[`scale${d}`])
    },
    replace (src) {
      this.cropper.replace(src)
    },
    crop () {
      this.cropper.getCroppedCanvas({
        width: this.width, height: this.height
      }).toBlob(blob => {
        const formData = new FormData()
        formData.append('file', blob, 'aaa.png')
        uploadImg(formData).then((res) => {
          this.$emit('input', res.url);
          this.showUpload = false;
          this.clear()
        })
      })
    },
    reset () {
      this.cropper.reset();
    },
    clear () {
      this.cropper.destroy();
    }
  },
}
</script>
