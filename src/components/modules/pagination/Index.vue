<template>
  <div
    :class="{ 'flex-center': align === 'center', 'flex-start': align === 'left', 'flex-end': align === 'right' }"
    class="page-item"
  >
    <div class="layui-box layui-laypage layui-laypage-default" id="layui-laypage-1">
      <!-- <a href="javascript:;" class="layui-laypage-prev">上一页</a> -->
      <a :class="['layui-laypage-prev', current > 0 ? '' : 'layui-disabled']" v-show="showEnd" @click.prevent="begin">
        <template v-if="type === 'text'">首页</template>
        <i v-else class="layui-icon layui-icon-prev"></i>
      </a>
      <a :class="['layui-laypage-prev', current > 0 ? '' : 'layui-disabled']" @click.prevent="prev">
        <template v-if="type === 'text'">上一页</template>
        <i v-else class="layui-icon layui-icon-left"></i>
      </a>
      <a href="javascript:;" class="layui-disabled" v-if="current - 2 > 0">...</a>
      <template v-for="(item, index) of pages">
        <a
          @click.prevent="changeIndex(index)"
          :key="'page' + index"
          :class="[current === index ? theme : '', current === index ? 'active' : '']"
          v-if="(index <= current && index >= current - 2) || (index >= current && index <= current + 2)"
          >{{ item }}
        </a>
      </template>
      <a href="javascript:;" class="layui-disabled" v-if="current + 1 + 2 < pageNum">...</a>
      <a @click="next" :class="['layui-laypage-next', current < pageNum - 1 ? '' : 'layui-disabled']">
        <template v-if="type === 'text'">下一页</template>
        <i v-else class="layui-icon layui-icon-right"></i>
      </a>
      <a @click="end" :class="['layui-laypage-next', current < pageNum - 1 ? '' : 'layui-disabled']" v-show="showEnd">
        <template v-if="type === 'text'">尾页</template>
        <i v-else class="layui-icon layui-icon-next"></i>
      </a>
    </div>
    <div class="total" v-if="showTotal">到第<input class="imooc-input" ref="jumpPage" />页面 共 {{ pageNum }} 页</div>
    <div class="options">
      <div
        class="layui-unselect layui-form-select"
        :class="{ 'layui-form-selected': showOpt }"
        @click="openOrCloseOption"
      >
        <div class="layui-select-title">
          <input type="text" :value="option[optIndex]" readonly class="layui-input layui-unselect" />
          <i class="layui-edge"></i>
        </div>
        <dl class="layui-anim layui-anim-upbit">
          <dd
            v-for="(item, index) of option"
            :key="'opt-d-' + index"
            :class="{ 'layui-this': index === optIndex }"
            :lay-value="item"
            @click="choseOptionIndex(index)"
          >
            {{ item }}
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  name: 'Pagenation',
  props: {
    showEnd: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'icon'
    },
    align: {
      type: String,
      default: 'center'
    },
    theme: {
      type: String,
      default: 'layui-bg-green'
    },
    showTotal: {
      type: Boolean,
      default: false
    },
    hasSelect: {
      type: Boolean,
      default: true
    },
    total: {
      type: Number,
      default: 10
    },
    // 每页条数
    size: {
      type: Number,
      default: 10
    },
    current: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      option: [10, 20, 30, 50, 100],
      optIndex: 0,
      showOpt: false,
      pages: [],
      limit: 0
      // pageNum: 0
    }
  },
  computed: {
    pageNum() {
      return Math.ceil(this.total / this.size)
    }
  },
  watch: {
    total(newval, oldval) {
      console.log(newval, oldval)
      this.initPages()
    }
  },
  methods: {
    choseOptionIndex(index) {
      if (index !== this.optIndex) {
        let newPage = Math.ceil((this.current * this.limit + 1) / this.option[index]) - 1
        this.limit = this.option[index]
        this.initPages()
        this.$emit('changePageSize', this.option[index], newPage)
      }
    },
    openOrCloseOption() {
      this.showOpt = !this.showOpt
    },
    initPages() {
      let pageNum = Math.ceil(this.total / this.limit)
      this.pages = _.range(1, pageNum + 1)
      this.optIndex = this.option.indexOf(this.limit)
    },
    begin() {
      if (this.current > 0) {
        this.$emit('changePageIndex', 0)
      }
    },
    prev() {
      if (this.current > 0) {
        this.$emit('changePageIndex', this.current - 1)
      }
    },
    next() {
      if (this.current < this.pageNum - 1) {
        this.$emit('changePageIndex', this.current + 1)
      }
    },
    end() {
      if (this.current < this.pageNum - 1) {
        this.$emit('changePageIndex', this.pageNum - 1)
      }
    },
    changeIndex(index) {
      if (index !== this.current) {
        this.$emit('changePageIndex', index)
      }
    }
  },
  mounted() {
    this.option = _.uniq(_.sortBy(_.concat(this.option, this.size)))
    this.limit = this.size
    this.initPages()
    let this_ = this
    this.$refs.jumpPage.onkeydown = function(e) {
      let theEvent = window.event || e
      let code = theEvent.keyCode || theEvent.which || theEvent.charCode
      if (code == 13) {
        if (isNaN(parseInt(this.value))) {
          // 不是数字
          this.value = this_.current + 1
          return
        }
        // 当前页或者页码大于总的
        if (parseInt(this.value) === this_.current + 1 || parseInt(this.value) > this_.pageNum) {
          this.value = this_.current + 1
        } else {
          this_.$emit('changePageIndex', parseInt(this.value) - 1)
        }
      }
    }
  }
}
</script>
<style scoped lang="stylus">
.page-item
  display flex
  align-items center
.total
  color #333
  margin 0 10px
  position relative
  top -2px
.imooc-input
  border 1px solid #e2e2e2
  height 28px
  line-height 28px
  width 25px
  padding 0 10px
  color #333
  text-align center
  margin 0 8px
.active
  border-radius 2px
  position relative
  z-index 100
  &.layui-bg-green
    border 1px solid #009688
.layui-form-select
  width 80px
  .layui-input
    height 30px
    position relative
    top -3px
.options
  margin 0 8px
</style>
