<template>
  <div id="app">
    <div class="layui-content">
      <form class="layui-form layui-form-pane" action="">
        <div class="layui-form-item">
          <label class="layui-form-label">用户名</label>
          <div class="layui-input-inline">
            <input
              type="text"
              name="name"
              lay-verify="required"
              placeholder="请输入用户名"
              v-validate="'required|email'"
              v-model.trim="name"
              autocomplete="off"
              class="layui-input"
            />
          </div>
          <div class="error layui-form-mid">{{ errors.first('name') }}</div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">密码</label>
          <div class="layui-input-inline">
            <input
              type="password"
              name="password"
              lay-verify="required"
              v-validate="'required|min:6'"
              placeholder="请输入密码"
              autocomplete="off"
              v-model.trim="password"
              class="layui-input"
            />
          </div>
          <div class="error layui-form-mid">{{ errors.first('password') }}</div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">验证码</label>
          <div class="layui-input-inline">
            <input
              type="text"
              name="code"
              lay-verify="required"
              placeholder="请输入标题"
              v-validate="'required|digits:4'"
              autocomplete="off"
              v-model.trim="code"
              class="layui-input"
            />
          </div>
          <div class="error layui-form-mid">{{ errors.first('code') }}</div>
          <div class="layui-form-mid svg" v-html="svg" @click="getCaptcha"></div>
        </div>
        <button type="button" class="layui-btn" @click="checkValidate">登陆</button>
        <a href="http://www.layui.com" class="forget-password">忘记密码</a>
      </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
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
    checkValidate() {}
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
    color red
</style>
