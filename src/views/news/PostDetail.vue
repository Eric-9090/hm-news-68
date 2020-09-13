<template>
  <div class="post-detail">
   <div class="header">
      <div class="left" @click="$router.back()">
      <span class="iconfont iconjiantou2"></span>
    </div>
    <div class="center">
      <span class="iconfont iconnew"></span>
    </div>
    <div class="right">
      <div class="followed" v-if="post.has_follow" @click="unfollow">已关注</div>
      <div class="follow" @click="follow" v-else>关注</div>
    </div>
   </div>
   <div class="content">
     <div class="title">{{post.title}}</div>
     <div class="name">
       <span v-if="post.user">{{post.user.nickname}}</span>
       <span>{{post.create_date | time}}</span>
     </div>
     <div class="info" v-html="post.content" v-if="post.type === 1"></div>
     <video :src="getUrl(post.content)" v-else controls autoplay muted></video>
     <div class="buttons">
       <div class="good" @click="like" :class="{active: post.has_like}">
         <span class="iconfont icondianzan"></span>
         <span>{{post.like_length || 0}}</span>
       </div>
       <div class="share">
         <span class="iconfont iconweixin"></span>
         <span>微信</span>
       </div>
     </div>
   </div>
   <!-- 评论 -->
   <div class="comment-list">
     <h3>精彩跟帖</h3>
     <hm-comment :comment=comment v-for="comment in commentList" :key="comment.id" @reply='onReply'></hm-comment>
   </div>
   <div class="footer-textarea" v-if="isShowTextarea">
     <textarea @blur="onBlur" :placeholder="'回复: '+ nickname" ref="textarea" v-model="content"></textarea>
     <van-button type="primary" @click="publish">发送</van-button>
   </div>
   <div class="footer-input" v-else>
     <div class="search">
       <input type="text" placeholder="回复" @focus="onFocus">
     </div>
     <span class="iconfont iconpinglun-">
       <i>{{this.replyNum}}</i>
     </span>
     <span class="iconfont iconshoucang" :class="{now: post.has_star}" @click="star"></span>
     <span class="iconfont iconfenxiang"></span>
   </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {
        user: {}
      },
      commentList: [],
      isShowTextarea: false,
      content: '',
      nickname: '',
      replyId: '',
      replyNum: ''
    }
  },
  created() {
    this.getInfo()
    // 获取文章的评论
    this.getCommentList()
    // 给bus注册自定义事件
    this.$bus.$on('reply', this.onReply)
  },
  destroyed() {
    this.$bus.$off('reply', this.onReply)
  },
  methods: {
    noLogin() {
      // 判断是否登陆
      const token = localStorage.getItem('token')
      if (!token) {
        this.$router.push({
          path: '/login',
          query: {
            back: true
          }
        })
        // 没有登陆
        return true
      } else {
        // 代表登陆了
        return false
      }
    },
    async getInfo() {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post/${id}`)
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.post = data
        // console.log(this.post)
      }
    },
    getUrl(url) {
      const div = document.createElement('div')
      div.innerHTML = url
      return div.innerText
    },
    async follow() {
      if (this.noLogin()) return
      // 发送请求,进行关注
      // console.log('发送请求,进行关注')
      const res = await this.$axios.get(`/user_follows/${this.post.user.id}`)
      // console.log(res)
      if (res.data.statusCode === 200) {
        this.$toast.success('关注成功')
        this.getInfo()
      }
    },
    async unfollow() {
      // 发送请求 取消关注
      const res = await this.$axios.get(`/user_unfollow/${this.post.user.id}`)
      if (res.data.statusCode === 200) {
        this.$toast.success('取消关注')
        this.getInfo()
      }
    },
    async like() {
      if (this.noLogin()) return
      const res = await this.$axios.get(`/post_like/${this.post.id}`)
      // console.log(res.data)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getInfo()
      }
    },
    async star() {
      const token = localStorage.getItem('token')
      if (!token) {
        this.$router.push({
          path: '/login',
          query: {
            back: true
          }
        })
        return
      }
      const res = await this.$axios.get(`/post_star/${this.post.id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getInfo()
      }
    },
    async getCommentList() {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post_comment/${id}`)
      // console.log(res.data.length)
      // console.log()
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = data
        this.replyNum = data.length
      }
      // console.log(data.length)
      // console.log(this.replyNum)
    },
    async onFocus() {
      this.isShowTextarea = true
      await this.$nextTick()
      this.$refs.textarea.focus()
    },
    async publish() {
      const res = await this.$axios.post(`/post_comment/${this.post.id}`, {
        content: this.content,
        parent_id: this.replyId
      })
      // console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getCommentList()
        this.content = ''
        this.isShowTextarea = false
      }
    },
    async onReply(id, nickname) {
      // console.log(id, nickname)
      this.isShowTextarea = true
      await this.$nextTick()
      this.$refs.textarea.focus()
      this.nickname = '@' + nickname
      this.replyId = id
    },
    onBlur() {
      // console.log('触发了')
      if (!this.content) {
        this.isShowTextarea = false
        this.replyId = ''
        this.nickname = ''
      }
    }
  }
}
</script>

<style lang='less' scoped>
.post-detail {
  padding-bottom: 50px;
}
.header {
  display: flex;
  padding: 0 10px;
  border-bottom: 1px solid #ccc;
  height: 50px;
  align-items: center;
  .left {
    span {
      line-height: 50px;
    }
  }
  .center {
    flex: 1;
    span {
      font-size: 40px;
    }
  }
  .right {
    font-size: 14px;
    div {
      width: 50px;
      height: 25px;
      text-align: center;
      line-height: 25px;
      border-radius: 15px;
    }
    .followed {
      border: 1px solid #ccc;
    }
    .follow {
      color: #fff;
      background-color:  #f00;
    }
  }
}
.content {
  padding: 10px;
  border-bottom: 3px solid #ccc;
  .title {
    font-weight: 700;
    font-size: 18px;
    }
    .name {
      font-size:14px ;
      color: #666;
      margin: 10px 0;
      span:first-child {
        margin-right: 20px;
    }
    }
  .info {
    font-size: 14px;
     /deep/ img {
      width: 100%;
    }

  }
  video {
    width: 100%;
  }
  .buttons {
    display: flex;
    justify-content: space-around;
    padding: 20px 0;
    div {
      width: 80px;
      height: 30px;
      line-height: 30px;
      border-radius: 20px;
      border: 1px solid #ccc;
      text-align: center;
      font-size: 16px;
      .iconfont {
        font-size: 18px;
        margin-right:5px ;
      }
      .iconweixin {
        color: rgb(31, 172, 31);
      }
    }
    .active {
      border-color:orange ;
      color: orange;
    }
  }
}
.comment-list {
  h3 {
    text-align: center;
    padding: 0 10px;
  }
}
.footer-input {
  width: 100%;
  height: 50px;
  display: flex;
  border-top: 1px solid #ccc;
  position: fixed;
  bottom: 0;
  align-items: center;
  justify-content: space-around;
  padding: 0 10px;
  background-color: #fff;
  .iconfont {
    position: relative;
    font-size: 24px;
    }
  .now {
    color: orangered;
  }
  .iconpinglun- {
    i {
      position: absolute;
      top: -5px;
      right: -10px;
      background-color: red;
      font-size: 12px;
      color: #fff;
      padding:0 8px;
      border-radius: 10px;
      font-style: normal;
    }
  }
  .search {
    width: 180px;
    padding-right: 10px;
    input {
      width: 100%;
      height: 30px;
      // margin-top: 10px;
      background-color:#ddd ;
      border-radius: 15px;
      border: none;
      font-size: 14px;
      padding-left: 20px;
  }
}
}
.footer-textarea {
  width: 100%;
  height: 100px;
  display: flex;
  position: fixed;
  z-index: 999;
  bottom: 0;
  padding: 10px;
  align-items: flex-end;
  background-color: #fff;
  border-top: 1px solid #ccc;
  justify-content: space-around;
  textarea {
    width: 260px;
    height: 80px;
    background-color: #ccc;
    border-radius: 10px;
    border: none;
    padding:10px;
    font-size: 14px;
    resize: none;
  }
}
</style>
