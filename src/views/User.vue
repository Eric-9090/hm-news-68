<template>
  <div class="user">
    <div class="header">
      <div class="avatar">
        <img :src="$axios.defaults.baseURL + user.head_img"
             alt="" />
      </div>
      <div class="info">
        <div class="name">
          <!-- <span v-if="user.gender === 1" class="iconfont iconxingbienan"></span>
          <span v-else class="iconfont iconxingbienv"></span> -->
          <span class="iconfont"
                :class="user.gender === 1 ? 'iconxingbienan' : 'iconxingbienv'"></span>
          <span>{{ user.nickname }}</span>
        </div>
        <div class="time">
          {{ user.create_date | time }}
        </div>
      </div>
      <div class="arrow ">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <hm-navitem to="/my-follow">我的关注 <template #content>关注的的内容</template></hm-navitem>
    <hm-navitem>我的跟帖 <template #content>跟帖/回复</template></hm-navitem>
    <hm-navitem>我的收藏 <template #content>文章/视频</template></hm-navitem>
    <hm-navitem to="/edit">设置</hm-navitem>
    <div style="margin:50px 5px">
      <van-button type="danger"
                  block
                  @click="logout">退出</van-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: ''
    }
  },
  async created() {
    // token必须放到请求头里 Authorization
    const userId = localStorage.getItem('userId')

    const res = await this.$axios.get(`/user/${userId}`)
    // console.log(res.data)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.user = data
    }
  },
  methods: {
    async logout() {
      // 弹框提醒
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '确定退出?'
        })
      } catch {
        return this.$toast('取消退出')
      }
      // 说明点了确定
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      this.$router.push('/login')
      this.$toast.success('退出成功')
    }
  }
}
</script>
<style lang="less" scoped>
.user {
  .header {
    display: flex;
    align-items: center;
    padding: 30px 10px;
    border-bottom: 3px solid #ccc;
    .avatar {
      // flex: 1;

      width: 70px;
      height: 70px;
      img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
    }
    .info {
      flex: 1;
      padding-left: 10px;
      font-size: 16px;
      .time {
        margin-top: 10px;
        color: #888;
      }
      .iconxingbienan {
        color: skyblue;
      }
      .iconxingbienv {
        color: pink;
      }
    }
  }
}
</style>
