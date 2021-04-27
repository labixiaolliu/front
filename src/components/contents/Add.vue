<template>
  <div class="layui-container add-item">
    <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
      <ul class="layui-tab-title">
        <li class="layui-this">发表新帖</li>
      </ul>
    </div>
    <validation-observer ref="form" v-slot="{ validate }">
      <form class="layui-form">
        <div class="layui-form-item layui-form-pane" pane>
          <div class="layui-col-md3">
            <validation-provider v-slot="{ errors }" name="catalog" rules="is_not:请选择">
              <label class="layui-form-label">所在专栏</label>
              <div class="layui-input-block">
                <!-- <select name="type" lay-verify="">
                  <option v-for="(item, index) of catalogs" :key="'catalog' + index" :value="item.value">{{
                    item.text
                  }}</option>
                </select> -->
                <div
                  class="layui-unselect layui-form-select"
                  :class="{ 'layui-form-selected': showCataLog }"
                  @click="openOrCloseCatalog"
                >
                  <div class="layui-select-title">
                    <input type="text" v-model="catalogs[cataindex].text" readonly class="layui-input layui-unselect" />
                    <i class="layui-edge"></i>
                  </div>
                  <dl class="layui-anim layui-anim-upbit">
                    <dd
                      v-for="(item, index) of catalogs"
                      :key="'catalog-d-' + index"
                      :class="{ 'layui-this': index === cataindex }"
                      :lay-value="item.value"
                      @click="choseCatalogIndex(index)"
                    >
                      {{ item.text }}
                    </dd>
                  </dl>
                </div>
              </div>
              <div class="layui-form-mid error">{{ errors[0] }}</div>
            </validation-provider>
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
            <div
              class="layui-unselect layui-form-select"
              :class="{ 'layui-form-selected': showFav }"
              @click="openOrCloseFav"
            >
              <div class="layui-select-title">
                <input type="text" :value="favList[favIndex]" readonly class="layui-input layui-unselect" />
                <i class="layui-edge"></i>
              </div>
              <dl class="layui-anim layui-anim-upbit">
                <dd
                  v-for="(item, index) of favList"
                  :key="'fav-d-' + index"
                  :class="{ 'layui-this': index === favIndex }"
                  :lay-value="item"
                  @click="choseFavIndex(index)"
                >
                  {{ item }}
                </dd>
              </dl>
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
import { addPost } from '@/api/content'
export default {
  name: 'Add',
  components: {
    Editor
  },
  mixins: [codeMixins],
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
        localStorage.setItem('postData', JSON.stringify(data))
      }
    },
    openOrCloseCatalog() {
      this.showCataLog = !this.showCataLog
    },
    choseCatalogIndex(index) {
      this.cataindex = index
      this.setPostLocal()
    },
    openOrCloseFav() {
      this.showFav = !this.showFav
    },
    choseFavIndex(index) {
      this.favIndex = index
      this.setPostLocal()
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
          catalog: this.catalogs[this.cataindex].value,
          title: this.title,
          content: this.content,
          fav: this.favList[this.favIndex]
        }
        addPost(param).then((res) => {
          if (res.code === 200) {
            // 清除贴子的本地缓存
            localStorage.setItem('postData', '')
            this.$pop('', '帖子发布成功，2秒之后跳转到主页！')
            setTimeout(() => {
              this.$router.push({ name: 'index' })
            }, 2000)
          } else {
            this.$alert(res.msg)
          }
        })
      })
    }
  },
  mounted() {
    let dataStr = localStorage.getItem('postData')
    if (dataStr && dataStr !== '') {
      this.$confirm(
        '存在没有提交的帖子，是否加载',
        () => {
          console.log(dataStr)
          let data = JSON.parse(dataStr)
          this.favIndex = data.favIndex
          this.title = data.title
          this.cataindex = data.cataIndex
          this.content = data.content
        },
        () => {
          localStorage.setItem('postData', '')
        }
      )
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
