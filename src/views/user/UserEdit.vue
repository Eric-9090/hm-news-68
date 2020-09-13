<template>
  <div class="uesr-edit">
    <hm-header>编辑资料</hm-header>
   <div class="avatar">
     <img :src="$axios.defaults.baseURL + user.head_img" alt="">
     <van-uploader :after-read="afterRead" />
   </div>
   <!-- 导航 -->
   <hm-navitem @click="showNickName">
     <template>昵称</template>
     <template #content>{{user.nickname}}</template>
   </hm-navitem>
    <hm-navitem @click="showPassword">
     <template>密码</template>
     <template #content>******</template>
   </hm-navitem>
    <hm-navitem @click="showGender">
     <template>性别</template>
     <template #content>{{user.gender == 1 ? '男' : '女'}}</template>
   </hm-navitem>

   <!-- 渲染dialog组件 -->
    <van-dialog v-model="isshowNickName" title="修改昵称" show-cancel-button @confirm='updateNickname'>
      <van-field v-model="nickname" ref="nickname" placeholder="请输入用户名" />
    </van-dialog>
    <van-dialog v-model="isshowPassword" title="修改密码" show-cancel-button @confirm='updatePassword'>
      <van-field v-model="password" placeholder="请输入密码" />
    </van-dialog>
    <van-dialog v-model="isshowGender" title="修改性别" show-cancel-button @confirm='updateGender'>
    <van-radio-group v-model="gender" direction="horizontal">
      <van-radio :name="1">男</van-radio>
      <van-radio :name="0">女</van-radio>
   </van-radio-group>
   </van-dialog>
   <!--裁剪模态框  -->
   <div class="mask" v-show="isShowMask" >
     <van-button type="primary" class='crop' @click="crop">裁剪</van-button>
     <van-button type="danger" class="cancel" @click="isShowMask = false">取消</van-button>
     <vue-cropper
     ref="aa"
     :img='img'
     autoCrop
     autoCropWidth="100"
     autoCropHeight="100"
     fixed
     ></vue-cropper>
   </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  data() {
    return {
      user: '',
      isshowNickName: false,
      nickname: '',
      isshowPassword: false,
      password: '',
      isshowGender: false,
      gender: 0,
      isShowMask: false,
      img: ''
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      // 发送请求 获取个人信息
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.get(`/user/${userId}`)
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.user = data
      }
    },
    async showNickName() {
      this.isshowNickName = true
      this.nickname = this.user.nickname
      // 需要等待DOM更新
      await this.$nextTick()
      // 需要自动获取焦点
      this.$refs.nickname.focus()
    },
    async updateUser(data) {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.post(`/user_update/${userId}`, data)
      // console.log(res.data)
      if (res.data.statusCode === 200) {
        // 重新渲染
        this.getUserInfo()
        this.$toast.success('修改成功')
      }
    },
    async updateNickname() {
      // const userId = localStorage.getItem('userId')
      // const res = await this.$axios.post(`/user_update/${userId}`, {
      // nickname: this.nickname
      // })
      // // console.log(res.data)
      // if (res.data.statusCode === 200) {
      //   // 重新渲染
      //   this.getUserInfo()
      //   this.$toast.success('修改成功')
      // }
      this.updateUser({
        nickname: this.nickname
      })
    },
    showPassword() {
      this.isshowPassword = true
      this.password = this.user.password
    },
    async updatePassword() {
    //   const userId = localStorage.getItem('userId')
    //   const res = await this.$axios.post(`/user_update/${userId}`, {
    //     password: this.password
    //   })
    //   // console.log(res.data)
    //   if (res.data.statusCode === 200) {
    //     // 重新渲染
    //     this.getUserInfo()
    //     this.$toast.success('修改成功')
    //   }
      this.updateUser({
        password: this.password
      })
    },
    showGender() {
      this.isshowGender = true
      this.gender = this.user.gender
    },
    updateGender() {
      this.updateUser({
        gender: this.gender
      })
    },
    isImg(name) {
      if (name.endsWith('.gif') || name.endsWith('.jpg') || name.endsWith('.jpeg') || name.endsWith('.png')) {
        return true
      } else {
        return false
      }
    },
    afterRead(file) {
      // 校验图片的类型和大小 如果满足才上传,不满足,
      if (!this.isImg(file.file.name)) {
        return this.$toast.fail('不支持此格式图片')
      }
      if (file.file.size >= 40 * 1024) {
        return this.$toast.fail('上传图片太大')
      }
      // 显示裁剪框
      this.isShowMask = true
      // 设置裁剪的图片
      this.img = file.content
    },
    crop() {
      this.$refs.aa.getCropBlob(async blob => {
        // 此时可以自行将文件上传至服务器
        // 如果是通过ajax上传文件 请求体不能只能是一个普通对象,必须是一个formData对象
        // 创建formData对象
        const fd = new FormData()
        fd.append('file', blob)
        const res = await this.$axios.post('/upload', fd)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          // 修改用户头像
          this.updateUser({
            head_img: data.url
          })
        }
        // 隐藏裁剪框
        this.isShowMask = false
      })
    }
  }
}
</script>

<style lang='less' scoped>
//给当前组件的所有样式的选择器添加一个属性选择器.avatar会变成.avatar[data-v-xxxxx]
//.van-dialog_content也会变成 .van-dialog_content[data-v-xxx]
//组件的模版中所有元素也会添加上一个属性(不包括动态生成的) data-v-xxxx
.avatar{
  padding: 20px 0;
  text-align: center;
  position: relative;
  img {
    width: 85px;
    width: 85px;
    border-radius: 50%;
  }
  .van-uploader {
  position: absolute;
  left: 50%;
  top: 40px;
  transform: translate(-50%);
  width: 100px;
  height: 100px;
  opacity: 0;
}
}
/**
深度作用选择器
<<<  css的写法
/deep/ less写法
::v-deep scss写法
*/
/deep/ .van-dialog__content {
  padding: 15px;
 .van-field {
  border: 1px solid #8888
}
}
.mask {
  width: 100%;
  height: 100%;
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  .crop,
  .cancel {
    position: fixed;
    top: 0;
    z-index: 1;
  }
  .cancel {
    right: 0;
  }
}

</style>
