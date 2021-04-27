import { getCode } from '../api/login'
import { v4 as uuidv4 } from 'uuid'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
const codeMixins = {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      validateCode: '',
      code: ''
    }
  },
  methods: {
    _getCode() {
      let sid = this.$store.state.sid
      getCode(sid).then((res) => {
        if (res.code === 200) {
          this.validateCode = res.data
        }
      })
    }
  },
  mounted() {
    let sid = ''
    if (!localStorage.getItem('sid')) {
      sid = uuidv4()
      localStorage.setItem('sid', sid)
    } else {
      sid = localStorage.getItem('sid')
    }
    this.$store.commit('setSid', sid)
    this._getCode()
  }
}
export default codeMixins
