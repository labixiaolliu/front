<template>
  <div>
    <gg-pannel></gg-pannel>
    <div class="layui-container">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-sm8 layui-col-xs12">
          <div class="layui-content">
            <div class="poster">
              <div class="title-header">
                <h1>{{ post.title }}</h1>
                <div class="layui-btns">
                  <div class="layui-btn-container">
                    <button v-if="post.catalog === 'ask'" type="button" class="layui-btn layui-btn-xs">提问</button>
                    <button v-else-if="post.catalog === 'advise'" type="button" class="layui-btn layui-btn-xs">
                      建议
                    </button>
                    <button v-else-if="post.catalog === 'discuss'" type="button" class="layui-btn layui-btn-xs">
                      交流
                    </button>
                    <button v-else-if="post.catalog === 'share'" type="button" class="layui-btn layui-btn-xs">
                      分享
                    </button>
                    <button v-else-if="post.catalog === 'news'" type="button" class="layui-btn layui-btn-xs">
                      动态
                    </button>
                    <button type="button" class="layui-btn layui-btn-grey layui-btn-xs" v-if="post.isEnd === '0'">
                      未结
                    </button>
                    <button type="button" class="layui-btn layui-btn-grey layui-btn-xs" v-else>
                      已结
                    </button>
                    <button type="button" class="layui-btn layui-bg-cyan layui-btn-xs" v-if="post.isTop === '1'">
                      置顶
                    </button>
                    <button
                      v-for="(item, index) of post.tags"
                      :key="'tag' + index"
                      type="button"
                      :class="['layui-btn', 'layui-btn-xs', item.class]"
                    >
                      {{ item.name }}
                    </button>
                  </div>
                  <div class="layui-btn-container">
                    <!-- <button type="button" class="layui-btn layui-btn-xs">删除</button>
                    <button type="button" class="layui-btn layui-btn-xs">置顶</button>
                    <button type="button" class="layui-btn layui-btn-xs">加精</button> -->
                  </div>
                  <div class="icons">
                    <div class="count">
                      <i class="layui-icon layui-icon-dialogue"></i>
                      <p>{{ post.answer }}</p>
                    </div>
                    <div class="count">
                      <i class="layui-icon layui-icon-read"></i>
                      <p>{{ post.reads }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="poster-msg">
                <div class="layui-msgs">
                  <!-- <img :src="post.user ? post.user.pic : '/resource/avatar.jpg'" class="poster-avatar" /> -->
                  <router-link
                    class="poster-avatar"
                    tag="img"
                    :src="post.user.pic"
                    v-if="post.user"
                    :to="{ name: 'userHome', params: { uid: post.user._id } }"
                  ></router-link>
                  <img v-else src="/resource/avatar.jpg" class="poster-avatar" />
                  <div class="post-msg">
                    <div>
                      <span class="name">{{ post.user ? post.user.nick : '' }}</span>
                      <i
                        class="iconfont icon-renzheng"
                        title="认证信息"
                        v-if="post.user && post.user.isVip !== '0'"
                      ></i>
                      <i class="layui-badge fly-badge-vip layui-hide-xs" v-if="post.user && post.user.isVip !== '0'"
                        >VIP{{ post.user.isVip }}</i
                      >
                      <span class="date">{{ post.created | moment }}</span>
                    </div>
                    <div>
                      <span class="fav">悬赏：{{ post.fav }}积分</span>
                    </div>
                  </div>
                </div>
                <div class="layui-btn-container">
                  <router-link
                    tag="button"
                    class="layui-btn"
                    v-show="post.isEnd === '0' && user._id === post.user._id"
                    :to="{ name: 'Edit', params: { tid: post._id, post: post } }"
                    >编辑</router-link
                  >
                  <button
                    type="button"
                    class="layui-btn"
                    :class="{ 'layui-btn-primary': post.isFav }"
                    @click.prevent="setCollect"
                  >
                    {{ !post.isFav ? '收藏' : '取消收藏' }}
                  </button>
                </div>
              </div>
              <div class="post-content" v-html="htmlContent"></div>
            </div>
            <div class="poster-res">
              <fieldset>
                <legend><a name="brief">回帖</a></legend>
              </fieldset>
              <validation-observer ref="form" v-slot="{ validate }">
                <div class="post-list layui-row">
                  <div class="response-li" v-for="(comment, index) of comments" :key="'comment' + index + comment._id">
                    <div class="res-content">
                      <div class="res-msgs">
                        <!-- <img  class="poster-avatar" /> -->
                        <router-link
                          tag="img"
                          class="poster-avatar"
                          :src="comment.uid.pic"
                          :to="{ name: 'userHome', params: { uid: comment.uid._id } }"
                        ></router-link>
                        <div class="response-msg">
                          <div>
                            <span class="name">{{ comment.uid.nick }}</span>
                            <i
                              class="iconfont icon-renzheng"
                              title="认证信息"
                              v-show="comment.uid.isVip && comment.uid.isVip !== '0'"
                            ></i>
                            <i
                              class="layui-badge fly-badge-vip layui-hide-xs"
                              v-show="comment.uid.isVip && comment.uid.isVip !== '0'"
                              >VIP{{ comment.uid.isVip }}</i
                            >
                            <span class="date"></span>
                          </div>
                          <div>
                            <span class="fav">{{ comment.created | moment }}</span>
                          </div>
                        </div>
                        <!-- <div class="res-detail" v-html="excape(comment.content)"></div> -->
                        <div class="res-detail" v-richtext="comment.content"></div>
                      </div>
                      <div class="get-icon" v-if="comment.isBest === '1'">
                        <img src="/resource/caina.png" />
                      </div>
                      <div class="res-icons">
                        <div class="icon-group">
                          <div class="count" :class="comment.handed && comment.handed === '1' ? 'active' : ''">
                            <i class="layui-icon layui-icon-dialogue" @click="handComment(comment)"></i>
                            <p>{{ comment.hands }}</p>
                          </div>
                          <div class="count" @click="reply(comment)">
                            <i class="layui-icon layui-icon-read"></i>
                            <p>回复</p>
                          </div>
                        </div>
                        <a
                          v-if="post.isEnd === '0' && comment.uid._id === user._id"
                          @click="editComment(comment, index)"
                          >编辑</a
                        >
                        <a v-if="post.isEnd === '0' && post.user._id === user._id" @click="setCommentBest(comment)"
                          >采纳</a
                        >
                        <!-- <a>删除</a> -->
                      </div>
                    </div>
                  </div>
                  <div v-if="comments.length === 0" class="zero-res">消灭零回复!</div>
                  <!-- <div class="response-li">
                    <div class="res-content">
                      <div class="res-msgs">
                        <img src="/resource/avatar.jpg" class="poster-avatar" />
                        <div class="response-msg">
                          <div>
                            <span class="name">贤心</span>
                            <i class="iconfont icon-renzheng" title="认证信息"></i>
                            <i class="layui-badge fly-badge-vip layui-hide-xs">VIP1</i>
                            <span class="date"></span>
                          </div>
                          <div>
                            <span class="fav">2017-11-30</span>
                          </div>
                        </div>
                        <div class="res-detail">非常精彩，这是一条被采纳的回复</div>
                      </div>
                      <div class="res-icons">
                        <div class="icon-group">
                          <div class="count">
                            <i class="layui-icon layui-icon-dialogue"></i>
                            <p>66</p>
                          </div>
                          <div class="count">
                            <i class="layui-icon layui-icon-read"></i>
                            <p>回复</p>
                          </div>
                        </div>
                        <a>编辑</a>
                        <a>采纳</a>
                        <a>删除</a>
                      </div>
                    </div>
                  </div> -->
                </div>
                <gg-page
                  :total="total"
                  :current="current"
                  :size="size"
                  :showEnd="true"
                  :showTotal="true"
                  @changePageIndex="changePageIndex"
                  @changePageSize="changePageSize"
                  v-show="comments.length > 0"
                ></gg-page>
                <gg-edit @changeContent="changeContent" :initContent="content" ref="editor"></gg-edit>
                <div class="layui-form-item layui-form-pane">
                  <validation-provider v-slot="{ errors }" name="code" rules="required|length:4">
                    <label class="layui-form-label">验证码</label>
                    <div class="layui-input-inline">
                      <input
                        type="text"
                        name="title"
                        v-model="code"
                        placeholder="请输入验证码"
                        autocomplete="off"
                        class="layui-input"
                      />
                    </div>
                    <div class="layui-form-mid error">{{ errors[0] }}</div>
                    <div class="layui-input-inline validate-code" v-html="validateCode" @click="_getCode"></div>
                  </validation-provider>
                </div>
                <div class="layui-form-item">
                  <button type="button" class="layui-btn" @click="validate().then(publishResponse)">立即发布</button>
                </div>
              </validation-observer>
            </div>
          </div>
        </div>
        <div class="layui-col-sm4 layui-col-xs12">
          <gg-hot></gg-hot>
          <gg-ad></gg-ad>
          <gg-link></gg-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Pannel from '../Pannel'
import HotList from '../slider/HotList'
import Ads from '../slider/Ads'
import Links from '../slider/Links'
import Edit from '../modules/editor/index'
import codeMixins from '../../mixins/codeMixins'
import Pagination from '../modules/pagination/Index'
import { getPostById, getComments, addComment, updateComment, acceptComment, handComment } from '../../api/content'
import { setCollect } from '../../api/user'
import { excapeHtml } from '../../utils/excapeHtml'
import { scrollToElem } from '../../utils/common'
export default {
  name: 'Detail',
  components: {
    'gg-pannel': Pannel,
    'gg-hot': HotList,
    'gg-ad': Ads,
    'gg-link': Links,
    'gg-edit': Edit,
    'gg-page': Pagination
  },
  mixins: [codeMixins],
  props: ['tid'],
  data() {
    return {
      content: '',
      current: 0,
      total: 0,
      size: 10,
      post: {},
      htmlContent: '',
      comments: [],
      excape: excapeHtml,
      selectIndex: -1
    }
  },
  computed: {
    user() {
      return this.$store.state.userInfo
    }
  },
  //   htmlContent() {
  //     if (this.post.content && (typeof this.post.content === 'undefined' || this.post.content.trim() === '')) {
  //       console.log(1)
  //       console.log(this.post.content)
  //       return excapeHtml(this.post.content)
  //     } else {
  //       console.log(2)
  //       return ''
  //     }
  //   }
  // },
  watch: {
    tid() {
      this.getPost()
      this.getComments()
    }
  },
  methods: {
    changeContent(content) {
      this.content = content
    },
    publishResponse() {
      this.$refs.form.validate().then((success) => {
        if (!success) return
        let user = this.$store.state.userInfo
        if (!this.$store.state.isLogin) {
          this.$pop('shake', '请先登陆')
          return
        }
        if (user.status !== '0') {
          this.$pop('shake', '该用户已被禁言')
          return
        }
        let param = {
          sid: this.$store.state.sid,
          code: this.code,
          content: this.content,
          pid: this.tid
        }
        if (this.selectIndex >= 0) {
          // 更新操作
          if (this.content === this.comments[this.selectIndex].content) {
            this.$pop('shake', '评论数据没有发生改变～～～')
            return
          }
          param.cid = this.comments[this.selectIndex]._id
          updateComment(param).then((res) => {
            if (res.code === 200) {
              let temp = { ...this.comments[this.selectIndex] }
              temp.content = this.content
              this.comments.splice(this.selectIndex, 1, temp)
              this.$pop('', res.msg)
              this.selectIndex = -1
              this.content = ''
              this.code = ''
              // 重置验证消息，重新获取验证码
              this.$nextTick(() => {
                this.$refs.form.reset()
              })
              this._getCode()
            } else {
              this.$alert(res.msg)
            }
          })
          return
        }
        addComment(param).then((res) => {
          if (res.code === 200) {
            // 发不成功
            this.$pop('', res.msg)
            this.content = ''
            this.code = ''
            // 重置验证消息，重新获取验证码
            this.$nextTick(() => {
              this.$refs.form.reset()
            })
            this._getCode()
            // 将新评论塞到当前页面
            let comment = res.data
            let user = this.$store.state.userInfo
            comment.uid = {
              pic: user.pic,
              nick: user.nick,
              username: user.username,
              _id: user._id,
              isVip: user.isVip
            }
            this.comments.push(comment)
            if (this.total === 0) {
              this.total += 1
            }
          } else {
            this.$alert(res.msg)
          }
        })
      })
    },
    changePageIndex(index) {
      // this.total++
      this.current = index
      this.getComments()
    },
    changePageSize(pageSize, page) {
      // this.total++
      this.current = page
      this.size = pageSize
      this.getComments()
    },
    getComments() {
      getComments({ tid: this.tid, page: this.current, limit: this.size }).then((res) => {
        if (res.code === 200) {
          this.comments = res.data
          this.total = res.total
        } else {
          this.$alert(res.msg)
        }
      })
    },
    editComment(comment, index) {
      this.content = comment.content
      scrollToElem('.layui-input-block', 500, 62)
      document.getElementById('edit').focus()
      this.selectIndex = index
    },
    setCommentBest(comment) {
      this.$confirm(
        '确定采纳此条评论为最佳么',
        () => {
          acceptComment({ tid: this.post._id, cid: comment._id }).then((res) => {
            if (res.code === 200) {
              this.$pop('', res.msg)
              this.comments.isBest = '1'
              let temp = { ...comment }
              temp.isBest = '1'
              this.comments.splice(this.comments.indexOf(comment), 1, temp)
              this.post.isEnd = '1'
            } else {
              this.$alert(res.msg)
            }
          })
        },
        () => {}
      )
    },
    handComment(comment) {
      if (!this.$store.state.isLogin) {
        this.$pop('shake', '请先登陆')
        return
      }
      handComment({ cid: comment._id }).then((res) => {
        if (res.code === 200) {
          this.$pop('', res.msg)
          let temp = { ...comment }
          temp.hands += 1
          temp.handed = '1'
          this.comments.splice(this.comments.indexOf(comment), 1, temp)
        } else {
          this.$alert(res.msg)
        }
      })
    },
    reply(comment) {
      // 插入@xxx
      let reg = /^@[\S]+/g
      if (this.content) {
        if (this.content && reg.test(this.content)) {
          // 有@的人，进行替换
          this.content = this.content.replace(reg, `@${comment.uid.nick} `)
        } else {
          this.content = `@${comment.uid.nick} ${this.content}`
        }
      } else {
        // 没内容，直接加@
        this.content = `@${comment.uid.nick} `
      }

      // 下拉
      scrollToElem('.layui-input-block', 500, 62)
      document.getElementById('edit').focus()
      this.selectIndex = -1
    },
    getPost() {
      getPostById(this.tid).then((res) => {
        if (res.code === 200) {
          this.post = res.data
          this.htmlContent = excapeHtml(this.post.content)
        } else {
          this.$alert(res.msg)
        }
      })
    },
    setCollect() {
      if (this.$store.state.isLogin) {
        let param = {
          tid: this.post._id,
          title: this.post.title,
          isFav: this.post.isFav ? 0 : 1
        }
        setCollect(param).then((res) => {
          if (res.code === 200) {
            this.post.isFav = this.post.isFav ? 0 : 1
            this.$pop('', res.msg)
          } else {
            this.$alert(res.msg)
          }
        })
      } else {
        this.$pop('shake', '请先登录，再进行收藏！')
      }
    }
  },
  mounted() {
    this.getPost()
    this.getComments()
  }
}
</script>
<style scoped lang="stylus">
.layui-btn-container .layui-btn
  margin-bottom 0
.layui-btn-container
  margin-right 30px
.layui-content
  position relative
.layui-btns
  display flex
  align-items center
  margin 10px 10px 10px 0
.layui-btn-grey
  background #c2c2c2
.icons
  padding 0 10px
  display flex
  flex 1
  justify-content flex-end
  padding-right 0px
  .count
    display flex
    align-items center
    i
      padding 0 5px 0 5px
.poster
  background #fff
  padding 10px 20px
  border-radius 3px
.poster-msg
  background #f2f2f2
  padding 10px
  border-radius 3px
  .layui-btn-container
    display flex
    justify-content flex-end
    margin-left 20px
    margin-right 0
.post-content
  margin 20px 0 10px 0
  position relative
  >>>img
    max-width 100%
.layui-msgs
  display flex
  align-items center
  .post-msg
    display flex
    flex-direction column
    justify-content space-around
    height 60px
    span
      margin-left 10px
      font-size 12px
    .name
      color #5FB878
    .date
      color #827676
    .fav
      color #FF5722
.res-content
  display flex
  flex-wrap wrap
  .res-msgs
    width 80%
    display flex
    flex-wrap wrap
    .response-msg
      width 70%
      display flex
      flex-direction column
      justify-content space-around
      margin-left 15px
      span, i
        margin 0 5px
      span
        color #5fb878
      .fav
        color #7d6565
    .res-detail
      width 100%
      font-size 15px
      color #252323
      margin 10px 0 0
  .get-icon
    width 15%
    display flex
    justify-content center
    align-items center
    img
      width 100%
  .res-icons
    width 100%
    display flex
    margin-top 10px
    color #867676
    a
      margin 0 5px
      color #867676
      cursor pointer
    .icon-group
      display flex
      width 80%
      .count
        display flex
        align-items center
        &.active
          color red
        i
          padding 0 5px 0 5px
          cursor pointer
.poster-avatar
  width 50px
  height 50px
.poster-res
  background #ffffff
  margin-top 15px
  padding 25px 15px
  fieldset
    border none
    padding 0
    border-top 1px solid #eee
    margin 0 auto
    legend
      margin 0 auto
      padding 0 10px
      font-size 22px
      font-weight 300px
    a
      font-size 30px
      color #a29797
.response-li
  border-bottom 1px solid #e8e8e8
  margin-bottom 8px
  padding-bottom 5px
.zero-res
  text-align center
  height 50px
  line-height 50px
  color #a29797
  font-size 20px
.response-li:nth-last-child(1)
  border none
  margin-bottom 20px
.error
  color red
.validate-code
  margin-top -8px
</style>
