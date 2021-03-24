<template>
  <div class="password-item">
    <form class="layui-form layui-form-pane" action="">
      <validation-observer ref="form">
        <div class="layui-form-item">
          <validation-provider v-slot="{ errors }" rules="required|min:6" name="oldpassword">
            <label class="layui-form-label">当前密码</label>
            <div class="layui-input-inline">
              <input type="password" class="layui-input" v-model="oldpassword" />
            </div>
            <div class="layui-form-mid error">{{ errors[0] }}</div>
          </validation-provider>
        </div>
        <div class="layui-form-item">
          <validation-provider v-slot="{ errors }" rules="required|min:6" name="password">
            <label class="layui-form-label">新密码</label>
            <div class="layui-input-inline">
              <input type="password" class="layui-input" v-model="password" />
            </div>
            <div class="layui-inline">6到16个字符</div>
            <div class="layui-form-mid error">{{ errors[0] }}</div>
          </validation-provider>
        </div>
        <div class="layui-form-item">
          <validation-provider v-slot="{ errors }" :rules="{ required: true, min: 6, is: password }" name="repassword">
            <label class="layui-form-label">确认密码</label>
            <div class="layui-input-inline">
              <input type="password" class="layui-input" v-model="repassword" />
            </div>
            <div class="layui-form-mid error">{{ errors[0] }}</div>
          </validation-provider>
        </div>
        <div class="layui-form-item">
          <button type="button" class="layui-btn" @click="submit">确认修改</button>
        </div>
      </validation-observer>
    </form>
  </div>
</template>
<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { resetPassword } from '@/api/user'
export default {
  name: 'Password',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      oldpassword: '',
      password: '',
      repassword: ''
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate().then((success) => {
        if (success) {
          if (this.oldpassword === this.password) {
            this.$refs.form.setErrors({
              password: '新老密码不能相同'
            })
            return
          }
          let param = {
            oldpwd: this.oldpassword,
            newpwd: this.password
          }
          resetPassword(param).then((res) => {
            if (res.code === 200) {
              this.$alert(res.msg)
              this.oldpassword = ''
              this.password = ''
              this.repassword = ''
              this.$refs.form.reset()
            } else if (res.code === 501) {
              this.$refs.form.setErrors({
                oldpassword: res.msg
              })
            } else {
              this.$alert(res.msg)
            }
          })
        }
      })
    }
  }
}
</script>
<style scoped lang="stylus">
.password-item
  margin-top 20px
  padding 0 20px
.error
  color red
</style>
