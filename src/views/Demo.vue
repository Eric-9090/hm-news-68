<template>
<!--
  img:裁剪图片地址
  autoCrop:是否默认生成裁剪框
  autoCropWidth autoCropHeigth 指定裁剪框宽和高
  fixed 固定裁剪框的宽高比
 -->
  <div class="demo">
    <van-button type="primary" @click="crop">裁剪</van-button>
    <!--两种都可以 <VueCropper></VueCropper>
    <vue-cropper></vue-cropper> -->
    <vue-cropper
     ref="cropper"
     autoCrop
     autoCropWidth='150'
     autoCropHeigth='150'
     fixed
     img='https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1819216937,2118754409&fm=26&gp=0.jpg'>
     </vue-cropper>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  methods: {
    crop() {
      // 获取裁剪后图片的base64数据,一般用于直接显示
      // this.$refs.cropper.getCropData(data => {
      //   console.log(data)
      // })
      // 获取裁剪后图片的数据,用于上传
      this.$refs.cropper.getCropBlob(data => {
        console.log(data)
      })
    }
  }
}
</script>

<style lang="less" >
.demo {
  width: 100%;
  height: 100%;
  position: fixed;
}

</style>
