<template>
  <div class="navItem" @click="clickFn">
    <div class="title">
      <slot></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
    <div class="arrow">
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clickFn() {
      if (this.to) {
        this.$router.push(this.to)
      }
      // 触发click事件
      this.$emit('click')
    }
  },
  props: {
    to: {
      type: String
    }
  }
}
</script>

<style lang="less" scoped>
.navItem {
  display: flex;
  align-items: center;
  height: 60px;
  border-bottom: 1px solid #ccc;
  font-size: 16px;
  margin-left: 10px;
  padding-right: 10px;
  .content {
    flex: 1;
    text-align: right;
    font-size: 14px;
    color: #ccc;
  }
  .arrow {
    padding-left: 10px;
    // .iconjiantou1 {
    //   color: #ccc;
    // }
  }
}
</style>
