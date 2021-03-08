<template>
  <div class="post-item fly-user-main">
    <div class="nav">
      <ul class="layui-nav" lay-filter="">
        <li class="layui-nav-item" v-for="(item, index) of list" :key="'post' + index">
          <router-link tag="a" :to="{ name: item.link }">{{ item.name }}</router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'UserPost',
  data() {
    return {
      list: [
        { name: '我的帖子', link: 'myPost' },
        { name: '我收藏的帖子', link: 'myCollection' }
      ]
    }
  }
}
</script>
<style scoped lang="stylus">
@media (max-width: 768px)
  .post-item
    margin-left 0px !important
.post-item
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
