import Vue from 'vue';
// import VeeValidate, { Validator } from 'vee-validate';
import App from './App.vue';
import router from './router';
import store from './store';
// import './local/zh';

Vue.config.productionTip = false;
// Vue.use(VeeValidate);

// const validator = new Validator();
// validator.localize('zh-CN');

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
