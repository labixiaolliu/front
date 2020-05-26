import { Validator } from 'vee-validate';
const dictionary = {
  'zh-CN': {
    messages: {
      required: field => '请填写' + field,
      email: () => '邮箱格式不正确',
      min: (field, size) => field + '最少不得少于' + size + '位',
      digits: (field, size) => field + '必须为' + size + '位'
    },
    attributes: {
      name: '名字',
      email: '邮箱',
      password: '密码',
      code: '验证码'
    }
  }
};

Validator.localize(dictionary);
