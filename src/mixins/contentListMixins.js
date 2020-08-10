import { getList } from '../api/content.js'
const contentListMixins = {
  data() {
    return {
      list: []
    }
  },
  methods: {
    _getList() {
      this.isLoad = true
      console.log('status: ' + this.status)
      let opation = {
        page: this.page,
        limit: this.limit,
        catalog: this.catalog || '',
        sort: this.sort || '',
        isEnd: this.status || '',
        isTop: this.isTop,
        tag: this.tag || ''
      }
      getList(opation)
        .then((res) => {
          if (res.code === 200) {
            this.isLoad = false
            if (res.data.length < this.limit) {
              this.isEnd = true
            }
            if (this.list.length > 0) {
              this.list = this.list.concat(res.data)
            } else {
              this.list = res.data
            }
          } else {
            this.$alert(res.msg)
          }
        })
        .catch((err) => {
          if (err) {
            this.isLoad = false
            this.$alert(err.message)
          }
        })
    }
  },
  mounted() {
    let catalog = this.$route.params['catalog']
    if (typeof catalog !== 'undefined' && catalog !== '') {
      this.catalog = catalog
    }
    this._getList()
  }
}

export default contentListMixins
