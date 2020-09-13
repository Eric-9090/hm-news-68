<template>
 <div class="placeholder">
    <div class="hm-header">
    <div class="back"  @click="back">
      <span class="iconfont iconjiantou2"></span>
    </div>
    <div class="title"><slot></slot></div>
    <div class="vacant"></div>
  </div>
 </div>
</template>

<script>
export default {
  methods: {
    back() {
      // this.$router.push()
      // this.$router.back()
      // this.$router.forward()
      // this.$router.go(1)
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less">
.placeholder {
  width: 100%;
  height: 50px;
}
.hm-header {
  position: fixed;
  width: 100%;
  top: 0;
  background-color: #fff;
  display: flex;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 18px;
  z-index: 999;
  // background: #1f4037;
  .back,
  .vacant {
    width: 50px;
    color: #0f2027;
  }
  .title {
    flex: 1;
    color: #0f2027;
  }
}
</style>
