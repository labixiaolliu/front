<template>
  <div class="login-item">
    <div class="fly-login">
      <!-- tab栏目 -->
      <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
        <ul class="layui-tab-title">
          <router-link tag="li" :to="{ name: 'login' }" class="layui-this">登陆</router-link>
          <router-link tag="li" :to="{ name: 'reg' }">注册</router-link>
        </ul>
        <div class="layui-tab-content"></div>
      </div>
      <!-- form表单 -->
      <validation-observer ref="form">
        <form class="layui-form layui-form-pane" action="">
          <div class="layui-form-item">
            <validation-provider v-slot="{ errors }" rules="required|email" name="name">
              <label class="layui-form-label">输入框</label>
              <div class="layui-input-inline">
                <input
                  type="text"
                  v-model="name"
                  name="name"
                  placeholder="请输入用户名"
                  autocomplete="off"
                  class="layui-input"
                />
              </div>
              <div class="layui-form-mid error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="layui-form-item">
            <validation-provider v-slot="{ errors }" rules="required|min:6" name="password">
              <label class="layui-form-label">密码框</label>
              <div class="layui-input-inline">
                <input
                  type="password"
                  name="password"
                  v-model="password"
                  placeholder="请输入密码"
                  autocomplete="off"
                  class="layui-input"
                />
              </div>
              <div class="layui-form-mid error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="layui-form-item">
            <validation-provider v-slot="{ errors }" rules="required|length:4" vid="code" name="code">
              <label class="layui-form-label">验证码</label>
              <div class="layui-input-inline">
                <input
                  type="text"
                  name="code"
                  v-model="code"
                  placeholder="请输入用户名"
                  autocomplete="off"
                  class="layui-input"
                />
              </div>
              <div class="layui-form-mid error">{{ errors[0] }}</div>
              <div class="layui-input-inline validate-code" v-html="validateCode" @click="_getCode()"></div>
            </validation-provider>
          </div>
        </form>
      </validation-observer>
      <div class="layui-form-item">
        <button type="button" class="layui-btn" @click="submit()">立即登陆</button>
        <router-link tag="a" class="layui-btn forget-pass" :to="{ name: 'forget' }">忘记密码?</router-link>
      </div>
      <div class="layui-form-item other-login">
        <a type="" class=""
          >或者使用社交账号登陆<i class="iconfont icon-qq" @click="loginWithQQ"></i
          ><i class="iconfont icon-weibo" @click="loginWithWeibo"></i
        ></a>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '../api/login'
import codeMixins from '../mixins/codeMixins'

export default {
  name: 'Login',
  mixins: [codeMixins],
  data() {
    return {
      name: '',
      password: ''
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate().then((success) => {
        if (!success) {
          return
        } else {
          login({
            username: this.name,
            password: this.password,
            code: this.code,
            sid: this.$store.state.sid
          })
            .then((res) => {
              console.log(res)
              if (res.code === 200) {
                console.log(res.token)
                this.name = ''
                this.password = ''
                this.code = ''
                this.$store.commit('setIsLogin', true)
                this.$store.commit('setUserInfo', res.data)
                this.$store.commit('setToken', res.token)
                this.$nextTick(() => {
                  this.$refs.form.reset()
                  this.$router.push({ name: 'index' })
                })
              } else if (res.code === 402) {
                //验证码错误
                this.$refs.form.setErrors({
                  code: [res.msg]
                })
              } else if (res.code === 403) {
                //用户名密码错误
                this.$alert('用户名或者密码错误')
              }
            })
            .catch((error) => {
              if (error.code === 500) {
                this.$alert('校验用户名密码错误')
              } else {
                this.$alert('服务器错误')
              }
            })
        }
      })
    },
    loginWithQQ() {},
    loginWithWeibo() {}
  }
}
</script>

<style lang="stylus" scoped>
.login-item
  background #e2e2e2
  width 100%
  height 100%
  position relative
  display flex
  justify-content center
  .fly-login
    width 80%
    background #ffffff
    margin-top 30px
    padding 10px
  .validate-code
    top -10px
  .layui-btn
    margin-top -10px
  .forget-pass
    background-color #fff
    color #333
  .other-login
    margin-top 10px
  .icon-qq:before
    content '\E618'
    font-size 25px
    margin-left 8px
    color #7CA9C9
    cursor pointer
  .icon-weibo:before
    content '\E617'
    font-size 25px
    margin-left 4px
    color #E6162D
    cursor pointer
  .error
    color red
</style>
