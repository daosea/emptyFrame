<template>
  <el-dialog
    v-el-drag-dialog
    :title="edit?editTitle:createTitle"
    :visible.sync="dialogVisible"
    :width="width||'400px'"
    @open="handleOpen"
    @close="handleClose"
    v-on="$listeners"
  >
    <slot :config="config" :data="detailData" :edit="edit" />
    <div slot="footer" class="dialog-footer">
      <slot name="footer" />
      <el-button v-if="cancelButton" @click="handleClose">取 消</el-button>
      <el-button v-if="confirmButton" :loading="loading" type="primary" @click="beforeSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import elDragDialog from '@/directive/el-dragDialog'
export default {
  directives: {
    elDragDialog
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    edit: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '400px'
    },
    config: {
      type: Object,
      default: () => {}
    },
    createTitle: {
      type: String,
      default: ''
    },
    editTitle: {
      type: String,
      default: ''
    },
    cancelButton: {
      type: Boolean,
      default: true
    },
    confirmButton: {
      type: Boolean,
      default: true
    },
    defaults: {
      type: Object,
      default: () => {}
    },
    submitHandler: {
      type: Object,
      default: Function
    }
  },
  data() {
    return {
      form: {},
      rules: {},
      title: '',
      dialogVisible: false,
      loading: false,
      // 提交id update时需要
      submitId: '',
      // 编辑时先根据id获取详情
      getByIdHandler: {},
      dictDatas: {},
      detailData: {},
      array: []
    }
  },
  computed: {
    // 提交成功时提示
    submitMessage() {
      return this.edit ? '编辑成功' : '新增成功'
    }
  },
  watch: {
    visible(val) {
      this.dialogVisible = val // 新增result的watch，监听变更并同步到myResult上
    }
  },
  methods: {
    handleOpen() {
      // 处理数组报错问题
      // const formData = this.setArray(this.array, this.data)
      // this.form = JSON.parse(JSON.stringify(formData))
      // this.setDefults(this.defaults)
      // this.$nextTick(() => {
      //   if (this.$refs['form']) {
      //     if (this.$refs['form'].length > 0) {
      //       this.$refs['form'].forEach(element => {
      //         element.clearValidate()
      //       })
      //     } else {
      //       this.$refs['form'].clearValidate()
      //     }
      //   }
      // })
      this.init()
    },
    // 初始化
    init() {
      if (this.edit) {
        this.submitHandler.getDetail(this.data).then(response => {
          this.detailData = response.data
          this.$emit('detail-data', this.detailData)
        })
      }
    },
    handleClose() {
      this.beforeClose()
      this.$emit('close')
    },
    // 关闭前的一些操作
    beforeClose() {},
    handleGetDetail(id) {
      this.getByIdHandler(id).then(response => {
        this.form = response.results
        this.afterGetDetail()
      })
    },
    afterGetDetail() {},
    handleSubmit(data) {
      this.loading = true
      const submitHandler = this.edit ? this.submitHandler.updateObject : this.submitHandler.addObject
      if (!submitHandler) {
        throw ReferenceError(`${this.edit ? 'updateObject为定义' : 'addObject未定义'}`)
      }
      submitHandler(data)
        .then(res => {
          this.loading = false
          this.formVisible = false
          this.$message({
            message: this.submitMessage,
            type: 'success'
          })
          this.$emit('getPage')
          this.$emit('result', res.results)
          this.handleClose()
        })
        .catch(() => {
          this.loading = false
        })
    },
    beforeSubmit() {
      this.$emit('before-submit')
      // this.$refs.form.validate(valid => {
      //   if (valid) {
      //     this.beforeSubmit()
      //     this.loading = true
      //     this.submitHandler(this.form, this.submitId)
      //       .then(res => {
      //         this.loading = false
      //         this.formVisible = false
      //         this.$message({
      //           message: this.submitMessage,
      //           type: 'success'
      //         })
      //         this.$emit('getPage')
      //         this.$emit('result', res.results)
      //         this.handleClose()
      //       })
      //       .catch(() => {
      //         this.loading = false
      //       })
      //   } else {
      //     return false
      //   }
      // })
    },
    setDefults(setting) {
      if (this.edit) {
        return
      }
      for (const key in setting) {
        this.$set(this.form, key, setting[key])
      }
    },
    setArray(array, data) {
      array.forEach(element => {
        if (!data[element]) {
          data[element] = []
        }
      })
      return data
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
