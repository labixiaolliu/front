<template>
  <div id="app">
    <div class="layui-content">
      <form class="layui-form layui-form-pane" action="">
        <div class="layui-form-item" :class="{ 'form-group--error': $v.name.$error }">
          <label class="layui-form-label">用户名</label>
          <div class="layui-input-inline">
            <input
              type="text"
              name="title"
              lay-verify="required"
              placeholder="请输入用户名"
              v-model.trim="$v.name.$model"
              autocomplete="off"
              class="layui-input"
            />
          </div>
          <div class="layui-form-mid error" v-if="!$v.name.required">用户名不能为空</div>
          <div class="layui-form-mid error" v-if="!$v.name.email">用户名不符合规则</div>
        </div>
        <div class="layui-form-item" :class="{ 'form-group--error': $v.password.$error }">
          <label class="layui-form-label">密码</label>
          <div class="layui-input-inline">
            <input
              type="password"
              name="title"
              lay-verify="required"
              placeholder="请输入密码"
              autocomplete="off"
              v-model.trim="$v.password.$model"
              class="layui-input"
            />
          </div>
          <div class="layui-form-mid error" v-if="!$v.password.required">密码不能为空</div>
        </div>
        <div class="layui-form-item" :class="{ 'form-group--error': $v.code.$error }">
          <label class="layui-form-label">验证码</label>
          <div class="layui-input-inline">
            <input
              type="text"
              name="title"
              lay-verify="required"
              placeholder="请输入标题"
              autocomplete="off"
              v-model.trim="$v.code.$model"
              class="layui-input"
            />
          </div>
          <div class="layui-form-mid svg" v-html="svg" @click="getCaptcha"></div>
          <div class="layui-form-mid error" v-if="!$v.code.required">验证码不能为空</div>
        </div>
        <button type="button" class="layui-btn" @click="checkValidate">登陆</button>
        <a href="http://www.layui.com" class="forget-password">忘记密码</a>
      </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { required, email } from 'vuelidate/lib/validators';
export default {
  name: 'app',
  data() {
    return {
      svg: '',
      code: '',
      name: '',
      password: ''
    };
  },
  validations: {
    name: {
      required,
      email
    },
    password: {
      required
    },
    code: {
      required
    }
  },
  mounted() {
    this.getCaptcha();
  },
  methods: {
    getCaptcha() {
      axios.get('http://localhost:3000/getCaptcha').then(res => {
        console.log(res);
        if (res.status === 200) {
          const { data } = res;
          if (data.code === 200) {
            this.svg = data.data;
            // this.code = data.text;
          }
        }
      });
    },
    checkValidate() {
      // if (!this.$v.$invalid) {
      //   alert('校验成功');
      // } else {
      //   alert('校验失败');
      // }
    }
  }
};
</script>

<style lang="stylus" scoped>
.layui-content
  background #f2f2f2
  .layui-form
    width 600px
    margin-left 10%
  .forget-password
    margin-left 20px
    &:hover
      color red
  .layui-form-item input
    width 200px
  .svg
    position relative
    margin-left 20px
    margin-top -20px
  .error
    display none
  .form-group--error .error
    display block
</style>
