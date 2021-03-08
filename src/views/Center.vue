<template>
  <div class="layui-container fly-user-main center-item">
    <ul class="layui-nav layui-nav-tree" lay-filter="test">
      <li class="layui-nav-item" v-for="(item, index) of list" :key="'center' + index">
        <router-link tag="a" :to="{ name: item.link }" :active-class="item.activeClass"
          ><i class="frontfont" :class="item.icon"></i>{{ item.name }}</router-link
        >
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'Center',
  data() {
    return {
      list: [
        {
          name: '我的主页',
          icon: 'icon-home',
          link: 'userHome'
        },
        {
          name: '用户中心',
          icon: 'icon-user',
          link: 'userCenter'
        },
        {
          name: '产品中心',
          icon: 'icon-product',
          link: 'userProduct'
        },
        {
          name: '我的消息',
          icon: 'icon-message',
          link: 'userMsg'
        },
        {
          name: '基本设置',
          icon: 'icon-Settingscontroloptions',
          link: 'myInfo',
          activeClass: 'layui-this'
        },
        {
          name: '我的帖子',
          icon: 'icon-document',
          link: 'myPost',
          activeClass: 'layui-this'
        }
      ]
    }
  }
}
</script>
<style scoped lang="stylus">
@import '../assets/iconfont/iconfont.css'

.center-item
  margin-top 10px
  .frontfont
    margin-right 15px
</style>
