<template>
  <div>
    <hm-header>注册</hm-header>
    <hm-logo></hm-logo>
    <van-form @submit="register">
      <van-field
        v-model="user.username"
        label="用户名"
        placeholder="输入你的用户名/手机号码"
        :rules="rules.username"
      />
      <van-field
        v-model="user.nickname"
        label="昵称"
        placeholder="输入你的昵称"
        :rules="rules.nickname"
      />
      <van-field
        v-model="user.password"
        type="password"
        label="密码"
        placeholder="输入密码"
        :rules="rules.password"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          注册
        </van-button>
      </div>
      <p class="tips">立即<router-link to="/login">登陆</router-link>?</p>
    </van-form>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  // 三个路由的钩子函数
  // beforeRouteEnter(to, from, next) {
  //   console.log('beforeRouteEnter')
  //   next()
  // },
  data() {
    return {
      user: {
        username: '',
        nickname: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'onChange' },
          { pattern: /^\d{5,11}$/, message: '用户名长度是5-11位数' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'onChange' },
          { pattern: /^\d{3,9}$/, message: '密码长度是3-9位数字' }
        ],
        nickname: [
          { required: true, message: '请填写昵称', trigger: 'onChange' },
          { pattern: /^[\u4e00-\u9fa5]{2,6}$/, message: '昵称为2-6位中文' }
        ]
      }
    }
  },
  methods: {
    async register() {
      const res = await this.$axios.post('/register', this.user)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.$router.push({
          name: 'login',
          params: this.user
        })
      } else {
        this.$toast(message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
// background: #1f4037;

.tips {
  padding: 15px;
  font-size: 16px;
  text-align: right;
  a {
    color: #999;
  }
}
</style>
