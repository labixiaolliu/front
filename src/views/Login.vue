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
          <validation-provider v-slot="{ errors }" rules="required|length:4" name="code">
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
      <div class="layui-form-item">
        <button type="button" class="layui-btn">立即登陆</button>
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
import { ValidationProvider } from 'vee-validate';
import { getCode } from '../api/login';

export default {
  name: 'Login',
  components: {
    ValidationProvider
  },
  data() {
    return {
      validateCode: '',
      name: '',
      password: '',
      code: ''
    };
  },
  mounted() {
    this._getCode();
  },
  methods: {
    _getCode() {
      getCode().then((res) => {
        if (res.code === 200) {
          this.validateCode = res.data;
        }
      });
    },
    loginWithQQ() {},
    loginWithWeibo() {}
  }
};
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
