<template>
  <div class="forget-item">
    <div class="fly-forget">
      <!-- tab栏目 -->
      <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
        <ul class="layui-tab-title">
          <router-link tag="li" :to="{ name: 'login' }">登陆</router-link>
          <router-link tag="li" :to="{ name: 'forget' }" class="layui-this">忘记密码</router-link>
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
                v-model="user"
                placeholder="请输入用户名"
                autocomplete="off"
                class="layui-input"
              />
            </div>
            <div class="layui-form-mid error">{{ errors[0] }}</div>
          </validation-provider>
        </div>
        <div class="layui-form-item">
          <validation-provider v-slot="{ errors }" name="验证码" rules="required|length:4">
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
        <button type="button" class="layui-btn" @click="submit">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
import '../local/zh';
import { ValidationProvider, extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { getCode, forget } from '../api/login';

for (let [rule, vallidation] of Object.entries(rules)) {
  extend(rule, {
    ...vallidation
  });
}
export default {
  name: 'Forget',
  components: {
    ValidationProvider
  },
  data() {
    return {
      user: '',
      code: '',
      validateCode: ''
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
    submit() {
      forget({ user: this.user, code: this.code }).then((res) => {
        if (res.code === 200) {
          alert('邮件发送成功');
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.forget-item
  background #e2e2e2
  width 100%
  height 100%
  position relative
  display flex
  justify-content center
  .fly-forget
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
