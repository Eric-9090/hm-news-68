<template>
  <div>
    <hm-header>登陆</hm-header>
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
      <p class="tips">
        没有账号,去<router-link to="/register">注册</router-link>?
      </p>
    </van-form>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  created() {
    const { username, password } = this.$route.params
    this.username = username
    this.password = password
  },
  methods: {
    async login() {
      const res = await this.$axios.post('/login', {
        username: this.username,
        password: this.password
      })
      const { statusCode, message, data } = res.data
      if (statusCode === 200) {
        // 在组件中必须 通过this.$toast才能使用
        this.$toast.success(message)
        // 保存token
        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', data.user.id)
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
          { required: true, trigger: 'onChange' },
          { pattern: /^\d{5,11}$/, message: '用户名长度是5-11位数' }
        ],
        password: [
          { required: true, trigger: 'onChange' },
          { pattern: /^\d{3,9}$/, message: '密码长度是3-9位数字' }
        ]
      }
    }
  }
}
</script>

<style lang="less" scoped>
//scoped 作用域 当前组件的样式带了scoped,只会在当前组件生效

.tips {
  padding: 15px;
  font-size: 16px;
  text-align: right;
  a {
    color: #999;
  }
}
</style>
