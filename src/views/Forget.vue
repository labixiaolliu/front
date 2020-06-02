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
          <label class="layui-form-label">输入框</label>
          <div class="layui-input-inline">
            <input
              type="text"
              name="title"
              required
              lay-verify="required"
              placeholder="请输入用户名"
              autocomplete="off"
              class="layui-input"
            />
          </div>
          <div class="layui-form-mid layui-word-aux">辅助文字</div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">验证码</label>
          <div class="layui-input-inline">
            <input
              type="text"
              name="title"
              required
              lay-verify="required"
              placeholder="请输入用户名"
              autocomplete="off"
              class="layui-input"
            />
          </div>
          <div class="layui-form-mid layui-word-aux">辅助文字</div>
          <div class="layui-input-inline validate-code" v-html="validateCode" @click="getValidateCode"></div>
        </div>
      </form>
      <div class="layui-form-item">
        <button type="button" class="layui-btn">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Forget',
  data() {
    return {
      validateCode: ''
    };
  },
  mounted() {
    this.getValidateCode();
  },
  methods: {
    getValidateCode() {
      axios.get('http://localhost:3000/getCaptcha').then((res) => {
        console.log(res);

        if (res.status === 200) {
          const { data } = res;
          if (data.code === 200) {
            this.validateCode = data.data;
          }
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
</style>
