<template>
  <div class="tips animation" ref="tips" v-show="isShow" :class="{ shake: type === 'shake' }">
    <div class="content">{{ msg }}</div>
  </div>
</template>
<script>
export default {
  name: 'PopComponent',
  props: {
    type: {
      default: '',
      type: String
    },
    msg: {
      default: '',
      type: String
    },
    isShow: {
      default: false,
      type: Boolean
    }
  },
  watch: {
    isShow(newVal, oldVal) {
      if (oldVal !== newVal && newVal === true) {
        setTimeout(() => {
          let width = this.$refs.tips.clientWidth
          let height = this.$refs.tips.clientHeight
          this.$refs.tips.style.marginLeft = -width / 2 + 'px'
          this.$refs.tips.style.marginTop = -height / 2 + 'px'
        }, 0)
        setTimeout(() => {
          this.isShow = false
          this.msg = ''
          this.type = ''
        }, 3000)
      }
    }
  }
}
</script>
<style scoped lang="stylus">
@keyframes shakeIn
  0%, 100%
    transform translateX(0)
  10%, 30%, 50%, 70%
    transform translateX(-10px)
  20%, 40%, 60%, 80%
    transform translateX(10px)
.animation
  animation-duration 0.3s
  animation-fill-mode both
.tips
  position fixed
  left 50%
  top 50%
  .content
    background rgba(0, 0, 0, 0.4)
    color #fff
    padding 10px 15px
    border-radius 6px
.shake
  animation-name shakeIn
</style>
