<template>
  <div class="layui-container flex">
    <div class="layui-row">您确认修改您的邮箱为{{ username }}吗？</div>
    <div class="layui-row btns">
      <button class="layui-btn" @click="update" :class="{ 'layui-btn-disabled': canChange === false }">确认更新</button>
      <router-link class="layui-btn layui-btn-primary" to="/">回到首页</router-link>
    </div>
  </div>
</template>
<script>
import { updateUsername } from '@/api/user'
let obj = {}
export default {
  name: '',
  data() {
    return {
      username: '',
      canChange: true
    }
  },
  methods: {
    update() {
      obj.username = this.username
      updateUsername(obj)
        .then((res) => {
          if (res.code === 200) {
            this.canChange = false
            this.$alert(res.msg)
            this.$store.commit('setUserInfo', {
              ...this.$store.state.userInfo,
              ...{
                username: this.username
              }
            })
            setTimeout(() => {
              this.$router.push('/')
            }, 1000)
          } else {
            this.$alert(res.msg)
          }
        })
        .catch((err) => {
          alert(JSON.stringify(err))
        })
    }
  },
  mounted() {
    let query = window.location.href.replace(/.*\?/, '')
    obj = Object.fromEntries(query.split('&').map((v) => v.split('=')))
    this.username = decodeURIComponent(obj.username)
  }
}
</script>
<style scoped lang="stylus">
.flex
  display flex
  width 100%
  min-height 300px
  justify-content center
  align-items center
  flex-direction column
  .btns
    margin 10px 0
</style>
