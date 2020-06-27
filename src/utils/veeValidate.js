import { extend, localize } from 'vee-validate';
import { required, email, min, length, confirmed } from 'vee-validate/dist/rules';

import zh from 'vee-validate/dist/locale/zh_CN.json';

extend('required', required);
extend('email', email);
extend('min', min);
extend('length', length);
extend('confirmed', confirmed);

localize('zh_CN', {
  messages: {
    ...zh.messages,
    required: '请输入{_field_}'
  },
  names: {
    name: '名字',
    email: '邮箱',
    password: '密码',
    code: '验证码'
  },
  fields: {
    password: {
      required: '求求你输入个{_field_}吧',
      min: '长度太短啦，起码{length}位吧！'
    }
  }
});
