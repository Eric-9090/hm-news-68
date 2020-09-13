<template>
  <div class="index">
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
       <div class="search-box" @click="$router.push('/search')">
          <span class="iconfont iconsearch"></span>
          <span>搜索新闻</span>
       </div>
      </div>
      <div class="user" @click="$router.push('/user')">
        <span class="iconfont iconwode"></span>
      </div>
    </div>
    <!-- tab栏效果 -->
   <van-sticky class="more-sticky">
      <div class="more" @click="$router.push('/manage')">
        <span class="iconfont iconjiantou1"></span>
      </div>
   </van-sticky>
    <van-tabs v-model="active" sticky animated swipeable>
      <van-tab :title="tab.name" v-for="tab in tabList" :key="tab.id">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              :immediate-check="false"
            >
            <hm-post :post="item" v-for="item in newsList" :key="item.id"></hm-post>
            </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      active: 0,
      // 存放栏目列表数据
      tabList: [],
      newsList: [],
      pageIndex: 1,
      pageSize: 5,
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  created() {
    this.getTabList()
  },
  methods: {
    // 判断缓存中是否存在
    async getTabList() {
      const activeList = JSON.parse(localStorage.getItem('activeList'))
      if (activeList) {
        this.tabList = activeList
        this.getNewsList(this.tabList[0].id)
        return
      }
      const res = await this.$axios.get('/category')
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.tabList = data
        // 发送请求获取第一个tab栏的数据
        this.getNewsList(this.tabList[0].id)
      }
      // console.log(this.tabList)
    },
    // 获取新闻列表
    async getNewsList(id) {
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        if (this.pageIndex === 1) {
          this.newsList = []
        }
        this.newsList = [...this.newsList, ...data]

        // 把loading改为fasle
        this.loading = false

        this.refreshing = false
        // 判断 如果没有数据,则把finished改为true
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
      // console.log(this.newsList)
    },
    // 上拉刷新
    onLoad() {
      setTimeout(() => {
        this.pageIndex++
        this.getNewsList(this.tabList[this.active].id)
      }, 1000)
    },
    // 下拉刷新
    onRefresh() {
      // 清空列表数据
      this.finished = false
      // 将loading 设置为true 表示处于加载状态
      this.loading = true
      // 重新加载数据
      // this.onLoad()
      this.newsList = []
      this.pageIndex = 1
      setTimeout(() => {
        this.getNewsList(this.tabList[this.active].id)
      }, 1000)
    }
  },
  watch: {
    active(value) {
      // console.log(value)
      // 重新加载当前分类下的数据
      this.newsList = []
      this.pageIndex = 1
      this.finished = false
      this.loading = true
      setTimeout(() => {
        this.getNewsList(this.tabList[value].id)
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 50px;
  background-color: #ff0000;
  line-height: 50px;
  text-align: center;
  color: #fff;
  .logo,
  .user {
    width: 70px;
  }
  .logo {
    span{
       font-size: 60px;
       }
  }
  .user{
    span {
      font-size: 25px;
    }
  }
  .search {
    flex: 1;
    .search-box {
      height: 34px;
      line-height: 34px;
      background-color: rgba(255,255,255,.5);
      margin-top: 8px;
      border-radius: 17px;
      font-size: 14px;
    }
  }
}
 /deep/ .van-tabs__wrap {
  width: 85%;
}
.more {
      width: 15%;
      height: 44px;
      position: absolute;
      right: 0;
      z-index: 999;
      text-align: center;
      background-color: #fff;
      line-height: 44px;
      .iconjiantou1 {
        position: absolute;
        top: 0;
        right: 10px;
      }
    }
.more-sticky{
   /deep/ .van-sticky--fixed {
      z-index: 1000;
    }
}
</style>
