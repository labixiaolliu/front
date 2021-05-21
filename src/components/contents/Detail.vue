<template>
  <div>
    <gg-pannel></gg-pannel>
    <div class="layui-container">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-sm8 layui-col-xs12">
          <div class="layui-content">
            <div class="poster">
              <div class="title-header">
                <h1>Imooc社区，基于layui的极简社区页面模板</h1>
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
                  <img :src="post.uid ? post.uid.pic : '/resource/avatar.jpg'" class="poster-avatar" />
                  <div class="post-msg">
                    <div>
                      <span class="name">{{ post.uid ? post.uid.username : '' }}</span>
                      <i class="iconfont icon-renzheng" title="认证信息" v-if="post.uid && post.uid.isVip !== '0'"></i>
                      <i class="layui-badge fly-badge-vip layui-hide-xs" v-if="post.uid && post.uid.isVip !== '0'"
                        >VIP{{ post.uid.isVip }}</i
                      >
                      <span class="date">{{ post.created | moment }}</span>
                    </div>
                    <div>
                      <span class="fav">悬赏：{{ post.fav }}积分</span>
                    </div>
                  </div>
                </div>
                <div class="layui-btn-container">
                  <button type="button" class="layui-btn">编辑</button>
                  <button type="button" class="layui-btn">收藏</button>
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
                  <div class="response-li">
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
                            <span class="fav">2018-12-12</span>
                          </div>
                        </div>
                        <div class="res-detail">非常精彩，这是一条被采纳的回复</div>
                      </div>
                      <img src="/resource/caina.png" class="get-icon" />
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
                  </div>
                  <div class="response-li">
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
                      <!-- <img src="/resource/caina.png" class="get-icon" /> -->
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
                  </div>
                </div>
                <gg-page
                  :total="total"
                  :current="current"
                  :size="size"
                  :showEnd="true"
                  @changePageIndex="changePageIndex"
                  @changePageSize="changePageSize"
                ></gg-page>
                <gg-edit @changeContent="changeContent" :initContent="content"></gg-edit>
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
import { getPostById } from '../../api/content'
import { excapeHtml } from '../../utils/excapeHtml'
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
      total: 101,
      size: 15,
      post: {},
      htmlContent: ''
    }
  },
  // computed: {
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
  methods: {
    changeContent(content) {
      this.content = content
    },
    publishResponse() {
      this.$refs.form.validate().then((success) => {
        if (!success) return
      })
    },
    changePageIndex(index) {
      // this.total++
      this.current = index
    },
    changePageSize(pageSize, page) {
      // this.total++
      this.current = page
      this.size = pageSize
    }
  },
  mounted() {
    getPostById(this.tid).then((res) => {
      if (res.code === 200) {
        console.log(res)
        this.post = res.data
        this.htmlContent = excapeHtml(this.post.content)
      }
    })
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
  .res-icons
    width 100%
    display flex
    margin-top 10px
    color #867676
    a
      margin 0 5px
      color #867676
    .icon-group
      display flex
      width 80%
      .count
        display flex
        align-items center
        i
          padding 0 5px 0 5px
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
.response-li:nth-last-child(1)
  border none
  margin-bottom 20px
.error
  color red
.validate-code
  margin-top -8px
</style>
