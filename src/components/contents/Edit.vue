<template>
  <div class="layui-container add-item">
    <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
      <ul class="layui-tab-title">
        <li class="layui-this">编辑帖子</li>
      </ul>
    </div>
    <validation-observer ref="form" v-slot="{ validate }">
      <form class="layui-form">
        <div class="layui-form-item layui-form-pane" pane>
          <div class="layui-col-md3">
            <label class="layui-form-label">所在专栏</label>
            <div class="layui-input-block">
              <!-- <select name="type" lay-verify="">
                  <option v-for="(item, index) of catalogs" :key="'catalog' + index" :value="item.value">{{
                    item.text
                  }}</option>
                </select> -->
              <div class="layui-unselect layui-form-select">
                <div class="layui-select-title">
                  <input
                    type="text"
                    v-model="catalogs[cataindex].text"
                    readonly
                    class="layui-input layui-unselect layui-disabled"
                  />
                  <i class="layui-edge"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="layui-col-md9 post-title">
            <validation-provider v-slot="{ errors }" name="title" rules="required">
              <label class="layui-form-label">标题</label>
              <div class="layui-input-block">
                <input type="text" name="title" v-model="title" autocomplete="off" class="layui-input" />
              </div>
              <div class="layui-form-mid error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
        </div>
        <editor @changeContent="changeContent" :initContent="content"></editor>
        <div class="layui-form-item layui-form-pane">
          <div class="layui-form-label">悬赏飞吻</div>
          <div class="layui-input-inline">
            <!-- <select name="type" lay-verify="">
              <option v-for="(item, index) of favList" :key="'fav' + index" :value="item">{{ item }}</option>
            </select> -->
            <div class="layui-unselect layui-form-select">
              <div class="layui-select-title">
                <input
                  type="text"
                  :value="favList[favIndex]"
                  readonly
                  class="layui-input layui-unselect layui-disabled"
                />
                <i class="layui-edge"></i>
              </div>
            </div>
          </div>
        </div>
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
          <button type="button" class="layui-btn" @click="validate().then(publishPost)">立即发布</button>
        </div>
      </form>
    </validation-observer>
  </div>
</template>
<script>
import Editor from '../modules/editor/index.vue'
import codeMixins from '../../mixins/codeMixins'
import { editPost } from '@/api/content'
export default {
  name: 'Edit',
  components: {
    Editor
  },
  mixins: [codeMixins],
  props: ['tid', 'post'],
  data() {
    return {
      title: '',
      cataindex: 0,
      showCataLog: false,
      favIndex: 0,
      showFav: false,
      content: '',
      catalog: '',
      catalogs: [
        {
          text: '请选择',
          value: ''
        },
        {
          text: '提问',
          value: 'ask'
        },
        {
          text: '分享',
          value: 'share'
        },
        {
          text: '讨论',
          value: 'discuss'
        },
        {
          text: '建议',
          value: 'advise'
        }
      ],
      favList: [20, 30, 50, 60, 80]
    }
  },
  computed: {
    // catalog() {
    //   return this.catalogs[this.cataindex].text
    // }
  },
  methods: {
    changeContent(content) {
      this.content = content
      this.setPostLocal()
    },
    setPostLocal() {
      if (this.content.trim() !== '' && this.title.trim() !== '') {
        let data = {
          cataIndex: this.cataindex,
          title: this.title,
          content: this.content,
          favIndex: this.favIndex
        }
        localStorage.setItem('eidtPostData', JSON.stringify(data))
      }
    },
    async publishPost() {
      this.$refs.form.validate().then((success) => {
        if (!success) return
        if (this.content === undefined || this.content.trim() === '') {
          this.$alert('帖子内容不能为空')
          return
        }
        let param = {
          sid: this.$store.state.sid,
          code: this.code,
          title: this.title,
          content: this.content,
          tid: this.tid
        }
        editPost(param).then((res) => {
          if (res.code === 200) {
            // 清除贴子的本地缓存
            localStorage.setItem('eidtPostData', '')
            this.$pop('', '帖子发布成功！2秒后跳转')
            setTimeout(() => {
              this.$router.push({ name: 'Detail', params: { tid: this.tid } })
            }, 2000)
          } else {
            this.$alert(res.msg)
          }
        })
      })
    }
  },
  mounted() {
    if (this.post) {
      // 跳转过来的
      this.content = this.post.content
      this.title = this.post.title
      this.favIndex = this.favList.indexOf(parseInt(this.post.fav))
      this.cataindex = this.catalogs.indexOf(this.catalogs.filter((item) => item.value === this.post.catalog)[0])
      let a = this.catalogs.indexOf(this.catalogs.filter((item) => item.value === this.post.catalog)[0])
      console.log(a)
      this.setPostLocal()
    } else {
      let dataStr = localStorage.getItem('eidtPostData')
      if (dataStr && dataStr !== '') {
        this.$confirm(
          '存在没有提交的帖子，是否加载',
          () => {
            let data = JSON.parse(dataStr)
            this.favIndex = data.favIndex
            this.title = data.title
            this.cataindex = data.cataIndex
            this.content = data.content
          },
          () => {
            let data = JSON.parse(dataStr)
            this.favIndex = data.favIndex
            this.cataindex = data.cataIndex
            this.content = ''
            this.title = ''
            this.setPostLocal()
            // localStorage.setItem('eidtPostData', '')
          }
        )
      }
    }
  }
}
</script>
<style scoped lang="stylus">
.add-item
  background #ffffff
  width 86%
  margin-top 20px
  padding 1% 2%
  .post-title
    padding-left 30px
.validate-code
  margin-top -10px
.error
  color red
</style>
