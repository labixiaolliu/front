import { localize } from 'vee-validate';

localize({
  en: {
    messages: {
      required: field => '请填写' + field,
      email: () => '邮箱格式不正确',
      min: (field, { length }) => `${field}最少不得少于${length}位`,
      digits: (field, { length }) => `${field}必须为${length}位`
    },
    attributes: {
      name: '名字',
      email: '邮箱',
      password: '密码',
      code: '验证码'
    }
  }
});
