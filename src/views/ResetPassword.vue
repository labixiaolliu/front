<template>
  <div class="reset-item">
    <div class="fly-reset">
      <!-- tab栏目 -->
      <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
        <ul class="layui-tab-title">
          <router-link tag="li" :to="{ name: 'login' }">登陆</router-link>
          <router-link tag="li" :to="{ name: 'resetPassword' }" class="layui-this">重置密码</router-link>
        </ul>
        <div class="layui-tab-content"></div>
      </div>
      <!-- form表单 -->
      <validation-observer ref="form">
        <form class="layui-form layui-form-pane" action="">
          <div class="layui-form-item">
            <validation-provider v-slot="{ errors }" rules="required|min:6" name="password">
              <label class="layui-form-label">输入框</label>
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
            <validation-provider
              v-slot="{ errors }"
              :rules="{ required: true, min: 6, is: password }"
              name="repassword"
            >
              <label class="layui-form-label">输入框</label>
              <div class="layui-input-inline">
                <input
                  type="password"
                  name="repassword"
                  v-model="repassword"
                  placeholder="请再次输入密码"
                  autocomplete="off"
                  class="layui-input"
                />
              </div>
              <div class="layui-form-mid error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="layui-form-item">
            <validation-provider v-slot="{ errors }" rules="required|length:4" name="code">
              <label class="layui-form-label">验证码</label>
              <div class="layui-input-inline">
                <input
                  type="text"
                  name="title"
                  v-model="code"
                  placeholder="请输入验证码"
                  autocomplete="off"
                  class="layui-input"
                />
              </div>
              <div class="layui-input-inline validate-code" v-html="validateCode" @click="_getCode"></div>
              <div class="layui-form-mid error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
        </form>
      </validation-observer>
      <div class="layui-form-item">
        <button type="button" class="layui-btn" @click="submit">确认修改</button>
      </div>
    </div>
  </div>
</template>
<script>
import { updatePassword } from '../api/user'
import codeMixins from '../mixins/codeMixins'
let obj = {}
export default {
  name: 'RestPassword',
  data() {
    return {
      password: '',
      repassword: ''
    }
  },
  mixins: [codeMixins],
  methods: {
    submit() {
      this.$refs.form.validate().then((success) => {
        if (success) {
          let param = {
            password: this.password,
            sid: this.$store.state.sid,
            code: this.code
          }
          updatePassword({
            ...param,
            ...{
              key: obj.key,
              username: obj.username
            }
          }).then((res) => {
            if (res.code === 200) {
              this.$alert(res.msg)
              setTimeout(() => {
                this.$router.push('/login')
              }, 1000)
            } else if (res.code === 502) {
              this.$refs.form.setErrors({
                code: res.msg
              })
            } else {
              this.$alert(res.msg)
            }
          })
        }
      })
    }
  },
  mounted() {
    let query = window.location.href.replace(/.*\?/, '')
    obj = Object.fromEntries(query.split('&').map((item) => item.split('=')))
  }
}
</script>
<style scoped lang="stylus">
.reset-item
  background #e2e2e2
  width 100%
  height 100%
  position relative
  display flex
  justify-content center
  .fly-reset
    width 80%
    background #ffffff
    margin-top 30px
    padding 10px
  .validate-code
    margin-top -10px
  .error
    color red
</style>
