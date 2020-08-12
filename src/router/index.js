import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

const Login = () => import(/* webpackChunkName: 'Login' */ '../views/Login.vue')
const Reg = () => import(/* webpackChunkName: 'Reg' */ '../views/Reg.vue')
const Forget = () => import(/* webpackChunkName: 'Forget' */ '../views/Forget.vue')
const index = () => import(/* webpackChunkName: 'index' */ '../views/channels/index.vue')
const Template = () => import(/* webpackChunkName: 'template' */ '../views/channels/Template.vue')
const Center = () => import(/* webpackChunkName: 'center' */ '../views/Center.vue')
const UserHome = () => import(/* webpackChunkName: 'center' */ '../views/UserHome.vue')

const UserCenter = () => import(/* webpackChunkName: 'center' */ '../components/user/Center.vue')
const UserMsg = () => import(/* webpackChunkName: 'center' */ '../components/user/Msg.vue')
const UserPost = () => import(/* webpackChunkName: 'center' */ '../components/user/Post.vue')
const UserProduct = () => import(/* webpackChunkName: 'center' */ '../components/user/Product.vue')
const UserSetting = () => import(/* webpackChunkName: 'center' */ '../components/user/Setting.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        name: 'index',
        component: index
      },
      {
        path: '/index/:catalog',
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
  },
  {
    path: '/center',
    name: 'center',
    component: Center,
    children: [
      {
        path: '',
        name: 'userCenter',
        component: UserCenter
      },
      {
        path: '/msg',
        name: 'userMsg',
        component: UserMsg
      },
      {
        path: '/post',
        name: 'userPost',
        component: UserPost
      },
      {
        path: '/product',
        name: 'userProduct',
        component: UserProduct
      },
      {
        path: '/setting',
        name: 'userSetting',
        component: UserSetting
      }
    ]
  },
  {
    path: '/userHome',
    name: 'userHome',
    component: UserHome
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'layui-this',
  routes
})

export default router
