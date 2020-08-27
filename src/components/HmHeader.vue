<template>
  <div class="hm-header">
    <div class="back">
      <span class="iconfont iconjiantou2"></span>
    </div>
    <div class="title">登陆</div>
    <div class="vacant"></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less">
.hm-header {
  display: flex;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 18px;
  background: #1f4037;
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
