<template>
  <div class="info-item">
    <validation-observer ref="form">
      <form class="layui-form layui-form-pane" action="">
        <div class="layui-form-item">
          <validation-provider v-slot="{ errors }" rules="required|email" name="username">
            <label class="layui-form-label">邮箱</label>
            <div class="layui-input-inline">
              <input type="text" name="name" autocomplete="off" class="layui-input" v-model="username" />
            </div>
            <div class="layui-form-mid error">{{ errors[0] }}</div>
          </validation-provider>
          <!-- <div class="layui-inline">如果您在邮箱已激活的情况下，变更了邮箱，需<span>重新验证邮箱</span></div> -->
        </div>
        <div class="layui-form-item">
          <validation-provider v-slot="{ errors }" rules="required" name="nick">
            <label class="layui-form-label">昵称</label>
            <div class="layui-input-inline">
              <input type="text" name="title" autocomplete="off" class="layui-input" v-model="nick" />
            </div>
            <div class="layui-form-mid error">{{ errors[0] }}</div>
          </validation-provider>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">性别</label>
          <div class="layui-input-inline custom1">
            <label for="gender1" class="custom2">
              <input v-model="gender" id="gender1" type="radio" name="sex" value="0" title="男" />
              <i class="layui-icon layui-icon-circle" :class="{ 'layui-icon-radio': gender === '0' }"></i>
              男
            </label>
            <label for="gender2">
              <input v-model="gender" id="gender2" type="radio" name="sex" value="1" title="女" />
              <i class="layui-icon layui-icon-circle" :class="{ 'layui-icon-radio': gender === '1' }"></i>
              女
            </label>
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">城市</label>
          <div class="layui-input-inline">
            <input type="text" name="title" autocomplete="off" class="layui-input" v-model="location" />
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label layui-block sign">签名</label>
          <div class="layui-block">
            <textarea v-model="regmark" placeholder="随便写一些刷一下存在感" class="layui-textarea"></textarea>
          </div>
        </div>
        <div class="layui-form-item">
          <button type="button" class="layui-btn" @click="submitUserInfo">确认修改</button>
        </div>
      </form>
    </validation-observer>
  </div>
</template>
<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { updateUserInfo } from '@/api/user'
export default {
  name: 'MyInfo',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      username: '',
      gender: '',
      nick: '',
      location: '',
      regmark: ''
    }
  },
  methods: {
    submitUserInfo() {
      this.$refs.form.validate().then((success) => {
        if (!success) return
        let param = {
          username: this.username,
          nick: this.nick,
          gender: this.gender,
          location: this.location,
          regmark: this.regmark
        }
        updateUserInfo(param).then((res) => {
          if (res.code === 200) {
            this.$alert(res.msg)
            this.$store.commit('setUserInfo', {
              ...this.$store.state.userInfo,
              ...{
                nick: this.nick,
                gender: this.gender,
                location: this.location,
                regmark: this.regmark
              }
            })
          } else if (res.code === 501) {
            this.$refs.form.setErrors({
              username: res.msg
            })
          }
        })
      })
    }
  },
  mounted() {
    let { username, nick, location, gender, regmark } = this.$store.state.userInfo
    this.username = username || ''
    this.nick = nick || ''
    this.location = location || ''
    this.gender = gender || ''
    this.regmark = regmark || ''
  }
}
</script>
<style scoped lang="stylus">
.info-item
  margin-top 20px
  padding 0 20px
  .sign
    width 100%
    text-align left
  .custom1
    padding-top 10px
    padding-left 15px
    >.custom2
      padding-right 16px
  .layui-icon-radio
    color #56cf79
  .error
    color red
</style>
