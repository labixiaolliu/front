<template>
  <div v-show="isShow">
    <div class="alert-view">
      <div class="msg">{{ message }}</div>
      <button class="commit-btn success" @click="close()" v-if="type === 'alert'">确认</button>
      <div v-else class="btn-group">
        <button class="commit-btn cancel" @click="confirmCancel()">取消</button>
        <button class="commit-btn confirm" @click="confirmSubmit()">确认</button>
      </div>
    </div>
    <div class="alert-mask" @click="closeMask()"></div>
  </div>
</template>

<script>
export default {
  name: 'AlertComponemt',
  props: {
    message: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'alert'
    },
    successFunc: {
      type: Function,
      default: () => {
        console.log('点击sucess！！')
      }
    },
    cancel: {
      type: Function,
      default: () => {
        console.log('点击cancel！！')
      }
    }
  },
  methods: {
    close() {
      this.isShow = false
    },
    closeMask() {
      if (this.type === 'alert') {
        this.close()
      }
    },
    confirmCancel() {
      this.cancel()
      this.close()
    },
    confirmSubmit() {
      this.successFunc()
      this.close()
    }
  }
}
</script>

<style lang="stylus" scoped>
$btn-main = #009688
$btn-dark = darken($btn-main, 10%)
.alert-view
  width 300px
  height 150px
  position fixed
  left 50%
  top 50%
  margin-left -150px
  margin-top -75px
  background #ffffff
  border-radius 6px
  display flex
  flex-direction column
  flex-wrap nowrap
  justify-content center
  align-items center
  z-index 3000
  .msg
    flex 1
    display flex
    justify-content center
    align-items center
  .commit-btn
    width 100px
    height 40px
    line-height 40px
    border-radius 10px
    border none
    &.success
      background $btn-main
      color #ffffff
      margin-bottom 10px
      &:hover
        background $btn-dark
  .btn-group
    width 100%
    display flex
    flex-flow row nowrap
    justify-content space-around
    align-items center
    margin-bottom 10px
    .cancel
      background #ededed
      color #ffffff
    .confirm
      background $btn-main
      color #ffffff
.alert-mask
  position fixed
  width 100%
  height 100%
  left 0
  top 0
  background rgba(0, 0, 0, 0.4)
  z-index 2000
</style>
