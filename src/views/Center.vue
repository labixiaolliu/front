<template>
  <div class="layui-container fly-user-main center-item">
    <ul class="layui-nav layui-nav-tree" lay-filter="test">
      <!-- 侧边导航: <ul class="layui-nav layui-nav-tree layui-nav-side"> -->
      <!-- <li class="layui-nav-item layui-nav-itemed">
        <a href="javascript:;">默认展开</a>
        <dl class="layui-nav-child">
          <dd><a href="javascript:;">选项1</a></dd>
          <dd><a href="javascript:;">选项2</a></dd>
          <dd><a href="">跳转</a></dd>
        </dl>
      </li>
      <li class="layui-nav-item">
        <a href="javascript:;">解决方案</a>
        <dl class="layui-nav-child">
          <dd><a href="">移动模块</a></dd>
          <dd><a href="">后台模版</a></dd>
          <dd><a href="">电商平台</a></dd>
        </dl>
      </li> -->
      <li class="layui-nav-item" v-for="(item, index) of list" :key="'center' + index">
        <router-link tag="a" :to="{ name: item.link }"
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
          link: 'userSetting'
        },
        {
          name: '我的帖子',
          icon: 'icon-document',
          link: 'userPost'
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
