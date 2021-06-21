<template>
  <div>
    <div class="fly-home fly-panel">
      <img :src="userInfo.pic ? userInfo.pic : '/resource/avatar.jpg'" />
      <div>
        <span class="name">{{ userInfo.nick }}</span>
        <i class="iconfont icon-nan"></i>
        <i class="layui-badge fly-badge-vip">{{ userInfo.isVip === '0' ? '非Vip' : 'vip' + userInfo.isVip }}</i>
      </div>
      <p>认证信息：软件开发人员</p>
      <p class="fly-home-info">
        <i class="iconfont icon-kiss" title="飞吻"></i>
        <span style="color: #FF7200;">{{ userInfo.favs }} 积分</span>
        <i class="iconfont icon-shijian"></i>
        <span>{{ userInfo.created | moment }}加入</span>
        <i class="iconfont icon-chengshi"></i>
        <span>{{ userInfo.location }}</span>
      </p>
      <p>({{ userInfo.regmark }})</p>
      <div>
        <a class="layui-btn layui-btn-primary"> 加为好友</a>
        <a class="layui-btn  layui-btn-normal"> 发起会话</a>
      </div>
    </div>
    <div class="layui-container">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md6 fly-home-jie">
          <div class="fly-panel">
            <h3>{{ userInfo.nick }} 最近的提问</h3>
            <ul>
              <li v-for="(item, index) of posts" :key="'post' + index" class="post-item">
                <router-link tag="a" :to="{ name: 'Detail', params: { tid: item._id } }">{{ item.title }}</router-link>
                <!-- <a>{{ item.title }}</a> -->
                <span class="time">{{ item.created | moment }}</span>
                <span class="read-answer">{{ item.reads }}阅/{{ item.answer }}答</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="layui-col-md6 fly-home-da">
          <div class="fly-panel">
            <h3>{{ userInfo.nick }} 最近的回答</h3>
            <ul>
              <li v-for="(item, index) of comments" :key="'comment' + index">
                <div>
                  {{ item.created | moment }} 在
                  <router-link v-if="item.pid" class="link" :to="{ name: 'Detail', params: { tid: item.pid._id } }">{{
                    item.pid.title
                  }}</router-link>
                  <a v-else class="link">（用户已删除该帖）</a>

                  中回答
                </div>
                <div class="answer-content" v-richtext="item.content"></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="layui-col-md6 layui-col-xm12 posts"></div> -->
  </div>
</template>
<script>
import { getUserInfo, getPosts, getComments } from '../api/user'
export default {
  name: 'UserHome',
  props: ['uid'],
  data() {
    return {
      userInfo: {},
      posts: [],
      comments: []
    }
  },
  methods: {
    getUserInfo() {
      getUserInfo({ uid: this.uid }).then((res) => {
        if (res.code === 200) {
          this.userInfo = res.data
        } else {
          this.$alert(res.msg)
        }
      })
    },
    getComments() {
      getComments({ uid: this.uid, page: 0 }).then((res) => {
        if (res.code === 200) {
          this.comments = res.data.comments
        } else {
          this.$alert(res.msg)
        }
      })
    },
    getPosts() {
      getPosts({ uid: this.uid, page: 0 }).then((res) => {
        if (res.code === 200) {
          this.posts = res.data.posts
        } else {
          this.$alert(res.msg)
        }
      })
    }
  },
  mounted() {
    this.getUserInfo()
    this.getComments()
    this.getPosts()
  }
}
</script>
<style scoped lang="stylus">
@media (max-width: 768px)
  .posts, .comments
    padding 10px 0 !important
.posts
  padding 10px 5px 10px 30px
  background #ffffff
.comments
  padding 10px 30px 10px 5px
  background #ffffff
.fly-home .name
  font-size 25px
  padding 0 5px
.fly-home>p, .fly-home>div
  margin 3px 0
.fly-panel
  display block
  color #757476
  padding-bottom 10px
  h3
    height 50px
    line-height 50px
    padding-left 6px
  ul
    color #757476
    li
      // height 40px
      line-height 40px
      font-size 15px
      padding-left 12px
.post-item
  display flex
  flex-wrap wrap
  &:after
    content ''
    width 95%
    margin-left 1%
    height 1px
    background #eee
  a
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    max-width 70%
  .time
    margin 0 10px
    flex-grow 1
  .read-answer
    margin-right 10px
.answer-content
  background #eee
  margin 0 10px 0 0
  padding 3px 10px
.link
  color #01aaed
</style>
