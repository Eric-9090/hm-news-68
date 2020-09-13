<template>
  <div ref="father">
    <div class="hm-sticky"
         ref="sticky">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    // const rect = father.getBoundingClientRect()
    // console.log(rect)
    window.addEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll() {
      const father = this.$refs.father
      const sticky = this.$refs.sticky
      const rect = father.getBoundingClientRect()
      // console.log(rect.top)
      if (rect.top <= 0) {
        sticky.classList.add('hm-sticky--fixed')
        father.style.height = sticky.offsetHeight + 'px'
      } else {
        sticky.classList.remove('hm-sticky--fixed')
        father.style.height = ''
      }
    }
  },
  destroyed() {
    window.addEventListener('scroll', this.onScroll)
  }
}
</script>

<style lang="less" scoped>
.hm-sticky--fixed {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 99;
}
</style>
