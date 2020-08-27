<template>
  <div>
    <hm-header></hm-header>
    <hm-logo></hm-logo>
    <van-form @submit="login">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名/手机号码"
        :rules="rules.username"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="rules.password"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  methods: {
    async login() {
      const res = await axios.post('http://192.168.144.81:3000/login', {
        username: this.username,
        password: this.password
      })
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        // 在组件中必须 通过this.$toast才能使用
        this.$toast.success(message)
        // 保存token
        // 跳转个人中心
        this.$router.push('/user')
      } else {
        this.$toast(message)
      }
    }
  },
  data() {
    return {
      username: '',
      password: '',
      rules: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'onChange' },
          { pattern: /^\d{5,11}$/, message: '用户名长度是5-11位数' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'onChange' },
          { pattern: /^\d{3,9}$/, message: '密码长度是3-9位数字' }
        ]
      }
    }
  }
}
</script>

<style lang="less">
body {
  background: #1f4037;
  .van-field {
    background: none;
    .van-field__label {
      display: none;
    }
    .van-field__control {
      font-size: 18px;
      color: #ccc;
    }
  }
}
</style>
