import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

const Login = () => import(/* webpackChunkName: 'Login' */ '../views/Login.vue')
const Reg = () => import(/* webpackChunkName: 'Reg' */ '../views/Reg.vue')
const Forget = () => import(/* webpackChunkName: 'Forget' */ '../views/Forget.vue')
const index = () => import(/* webpackChunkName: 'index' */ '../views/channels/index.vue')
const Template = () => import(/* webpackChunkName: 'template' */ '../views/channels/Template.vue')
const Center = () => import(/* webpackChunkName: 'center' */ '../views/Center.vue')
const UserHome = () => import(/* webpackChunkName: 'userHome' */ '../views/UserHome.vue')

const UserCenter = () => import(/* webpackChunkName: 'userCenter' */ '../components/user/Center.vue')
const UserMsg = () => import(/* webpackChunkName: 'msg' */ '../components/user/Msg.vue')
const UserPost = () => import(/* webpackChunkName: 'post' */ '../components/user/Post.vue')
const UserProduct = () => import(/* webpackChunkName: 'product' */ '../components/user/Product.vue')
const UserSetting = () => import(/* webpackChunkName: 'setting' */ '../components/user/Setting.vue')

const PicUpload = () => import(/* webpackChunkName: 'picUpload' */ '../components/user/common/PicUpload.vue')
const Password = () => import(/* webpackChunkName: 'password' */ '../components/user/common/Password.vue')
const MyInfo = () => import(/* webpackChunkName: 'myInfo' */ '../components/user/common/MyInfo.vue')
const Account = () => import(/* webpackChunkName: 'account' */ '../components/user/common/Account.vue')

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
        component: UserSetting,
        children: [
          {
            path: '',
            name: 'myInfo',
            component: MyInfo
          },
          {
            path: 'password',
            name: 'password',
            component: Password
          },
          {
            path: 'picUpload',
            name: 'picUpload',
            component: PicUpload
          },
          {
            path: 'account',
            name: 'account',
            component: Account
          }
        ]
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
