import AlertComponent from './Alert.vue'

const Alert = {}
Alert.install = (Vue) => {
  const AlertConstructor = Vue.extend(AlertComponent)
  const instance = new AlertConstructor()
  instance.$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)
  // 4. 添加实例方法
  Vue.prototype.$alert = (msg) => {
    // 逻辑...
    instance.message = msg
    instance.isShow = true
    instance.type = 'alert'
  }
  Vue.prototype.$confirm = (msg, success, cancel) => {
    instance.message = msg
    instance.isShow = true
    if (typeof success !== 'undefined') {
      instance.success = success
    }
    if (typeof cancel !== 'undefined') {
      instance.cancel = cancel
    }
    instance.type = 'confirm'
  }
}

export default Alert
