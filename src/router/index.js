import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'
import jwt from 'jsonwebtoken'
import moment from 'moment'

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

const MyPost = () => import(/* webpackChunkName: 'myPost' */ '../components/user/common/MyPost.vue')
const MyCollection = () => import(/* webpackChunkName: 'myCollection' */ '../components/user/common/MyCollection.vue')
const NotFound = () => import(/* webpackChunkName: 'notFound' */ '../components/NotFound.vue')
const Reset = () => import(/* webpackChunkName: 'reset' */ '../components/Reset.vue')
const ResetPassword = () => import(/* webpackChunkName: 'restPassword' */ '../views/ResetPassword.vue')

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
        component: UserPost,
        children: [
          {
            path: '',
            name: 'myPost',
            component: MyPost
          },
          {
            path: 'myCollection',
            name: 'myCollection',
            component: MyCollection
          }
        ]
      },
      {
        path: '/product',
        name: 'userProduct',
        component: UserProduct
      },
      {
        path: '/setting',
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
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/userHome',
    name: 'userHome',
    component: UserHome
  },
  {
    path: '/reset',
    name: 'reset',
    component: Reset
  },
  {
    path: '/resetPassword',
    name: 'resetPassword',
    component: ResetPassword
  },
  {
    path: '/404',
    component: NotFound
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'layui-this',
  routes
})

router.beforeEach((to, from, next) => {
  // const isLogin = store.state.isLogin
  const token = localStorage.getItem('token')
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  if (token !== '' && token !== null) {
    let payload = jwt.decode(token)
    // 未过期
    console.log(moment())
    console.log(moment(payload.exp * 1000))
    moment().isBefore(moment(payload.exp * 1000))
    if (moment().isBefore(moment(payload.exp * 1000))) {
      store.commit('setToken', token)
      store.commit('setUserInfo', userInfo)
      store.commit('setIsLogin', true)
    } else {
      localStorage.clear()
      store.commit('setToken', '')
      store.commit('setUserInfo', '')
      store.commit('setIsLogin', false)
    }
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // 需要登陆才能访问
    const isLogin = store.state.isLogin
    if (isLogin) {
      // 已经登陆
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
