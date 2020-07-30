import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

const Login = () => import(/* webpackChunkName: 'Login' */ '../views/Login.vue')
const Reg = () => import(/* webpackChunkName: 'Reg' */ '../views/Reg.vue')
const Forget = () => import(/* webpackChunkName: 'Forget' */ '../views/Forget.vue')
const index = () => import(/* webpackChunkName: 'index' */ '../views/channels/index.vue')
const Template = () => import(/* webpackChunkName: 'template' */ '../views/channels/Template.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '',
        name: 'index',
        component: index
      },
      {
        path: 'index/:catalog',
        name: 'template',
        component: Template
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    alias: '/aaa'
  },
  {
    path: '/reg',
    name: 'reg',
    component: Reg,
    beforeEnter: (to, from, next) => {
      if (from.name === 'login') {
        next()
      } else {
        next('')
      }
    }
  },
  {
    path: '/forget',
    name: 'forget',
    component: Forget
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'layui-this',
  routes
})

export default router
