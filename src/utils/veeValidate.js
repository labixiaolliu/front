import { extend, localize } from 'vee-validate'
import { required, email, min, length, confirmed, is } from 'vee-validate/dist/rules'

import zh from 'vee-validate/dist/locale/zh_CN.json'

extend('required', required)
extend('email', email)
extend('min', min)
extend('length', length)
extend('confirmed', confirmed)
extend('is', is)
extend('mixChart', {
  validate: (value) => {
    let reg = /^[0-9]+$/
    const result = reg.exec(value)
    if (result) {
      return false
    } else {
      return true
    }
  }
})

localize('zh_CN', {
  messages: {
    ...zh.messages,
    required: '请输入{_field_}',
    mixChart: '{_field_}不能全部是数字'
  },
  names: {
    name: '名字',
    email: '邮箱',
    password: '密码',
    code: '验证码',
    nick: '昵称',
    repassword: '重复密码',
    username: '邮箱'
  },
  fields: {
    password: {
      required: '求求你输入个{_field_}吧',
      min: '长度太短啦，起码{length}位吧！'
    },
    repassword: {
      is: '和密码不一致哦'
    }
  }
})
