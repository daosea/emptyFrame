import { getDictDatas } from '@/utils/dict'
export default {
  props: {
    data: {
      type: Object,
      default: () => { }
    },
    edit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {},
      defaults: {
      },
      rules: {

      }
    }
  },
  watch: {
    data: {
      handler(val) {
        this.setDefults(val)
      },
      immediate: true
    }
  },
  methods: {
    // 初始化
    init() {
      getDictDatas(this.dictDatas)
      this.setDefults(this.defaults)
      this.afterInit()
    },
    afterInit() {},
    // 重置
    reset() {
      if (this.$refs['form']) {
        this.$refs['form'].resetFields()
        // if (this.$refs['form'].length > 0) {
        //   this.$refs['form'].forEach(element => {
        //     element.resetField()
        //   })
        // } else {

        // }
      }
      this.afterReset()
    },
    afterReset() {},
    // 表单验证
    validate() {
      return this.$refs.form.validate
    },
    // 设置默认值
    setDefults(setting) {
      for (const key in setting) {
        this.$set(this.form, key, setting[key])
      }
    }
  }
}
