<template>
  <div class="setting-item fly-user-main">
    <div class="nav">
      <ul class="layui-nav" lay-filter="">
        <li class="layui-nav-item" v-for="(item, index) of list" :key="'setting' + index">
          <router-link tag="a" :to="{ name: item.link }">{{ item.name }}</router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'UserSetting',
  data() {
    return {
      list: [
        { name: '我的资料', link: 'myInfo' },
        { name: '头像', link: 'picUpload' },
        { name: '密码', link: 'password' },
        { name: '账号', link: 'account' }
      ]
    }
  }
}
</script>
<style scoped lang="stylus">
@media (max-width: 768px)
  .setting-item
    margin-left 0px !important
.setting-item
  margin-left 222px
  background white
  padding 0 20px
  .nav
    border-bottom 1px solid #e2e2e2
    .layui-nav
      background-color #ffffff
      color #666 !important
      .layui-nav-item a
        color rgb(0, 0, 0, 0.7)
</style>
