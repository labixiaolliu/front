<template>
  <div class="reg-item">
    <div class="fly-reg">
      <!-- tab栏目 -->
      <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
        <ul class="layui-tab-title">
          <router-link tag="li" :to="{ name: 'login' }">登陆</router-link>
          <router-link tag="li" :to="{ name: 'reg' }" class="layui-this">注册</router-link>
        </ul>
        <div class="layui-tab-content"></div>
      </div>
      <!-- form表单 -->
      <form class="layui-form layui-form-pane" action="">
        <div class="layui-form-item">
          <validation-provider v-slot="{ errors }" rules="required|email" name="用户名">
            <label class="layui-form-label">输入框</label>
            <div class="layui-input-inline">
              <input
                type="text"
                name="title"
                v-model="name"
                placeholder="请输入用户名"
                autocomplete="off"
                class="layui-input"
              />
            </div>
            <div class="layui-form-mid error">{{ errors[0] }}</div>
          </validation-provider>
        </div>
        <div class="layui-form-item">
          <validation-provider v-slot="{ errors }" rules="required" name="昵称">
            <label class="layui-form-label">昵称</label>
            <div class="layui-input-inline">
              <input
                type="text"
                name="nick"
                v-model="nick"
                placeholder="请输入昵称"
                autocomplete="off"
                class="layui-input"
              />
            </div>
            <div class="layui-form-mid error">{{ errors[0] }}</div>
          </validation-provider>
        </div>
        <div class="layui-form-item">
          <validation-provider v-slot="{ errors }" rules="required|min:6" name="密码">
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
          <validation-provider v-slot="{ errors }" rules="required|min:6" name="重复密码">
            <label class="layui-form-label">确认密码</label>
            <div class="layui-input-inline">
              <input
                type="password"
                name="repassword"
                v-model="repassword"
                placeholder="请输入密码"
                autocomplete="off"
                class="layui-input"
              />
            </div>
            <div class="layui-form-mid error">{{ errors[0] }}</div>
          </validation-provider>
        </div>
        <div class="layui-form-item">
          <validation-provider v-slot="{ errors }" rules="required|length:4" name="验证码">
            <label class="layui-form-label">验证码</label>
            <div class="layui-input-inline">
              <input
                type="text"
                name="title"
                v-model="code"
                placeholder="请输入用户名"
                autocomplete="off"
                class="layui-input"
              />
            </div>
            <div class="layui-form-mid error">{{ errors[0] }}</div>
            <div class="layui-input-inline validate-code" v-html="validateCode" @click="_getCode"></div>
          </validation-provider>
        </div>
      </form>
      <div class="layui-form-item">
        <button type="button" class="layui-btn">立即登陆</button>
      </div>
      <div class="layui-form-item other-login">
        <a type="" class=""
          >或者使用社交账号快捷注册<i class="iconfont icon-qq" @click="loginWithQQ"></i
          ><i class="iconfont icon-weibo" @click="loginWithWeibo"></i
        ></a>
      </div>
    </div>
  </div>
</template>

<script>
import '../local/zh';
import { ValidationProvider, extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { getCode } from '../api/login';

for (let [rule, validation] of Object.entries(rules)) {
  extend(rule, { ...validation });
}

export default {
  name: 'Reg',
  components: {
    ValidationProvider
  },
  data() {
    return {
      validateCode: '',
      repassword: '',
      name: '',
      password: '',
      code: '',
      nick: ''
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
.reg-item
  background #e2e2e2
  width 100%
  height 100%
  position relative
  display flex
  justify-content center
  .fly-reg
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
