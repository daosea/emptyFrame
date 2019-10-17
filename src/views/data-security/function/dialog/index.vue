<template>
  <table-dialog
    ref="tableDialog"
    v-bind="$attrs"
    :width="config.width||'400px'"
    :create-title="config.createTitle"
    :edit-title="config.editTitle"
    :submit-handler="config.submitHandler"
    v-on="$listeners"
    @open="handleOpen"
    @close="handleClose"
    @before-submit="beforeSubmit"
  >
    <template v-slot="slotProps">
      <baseinfo ref="baseinfo" :data="slotProps.data" :edit="slotProps.edit" />
    </template>
  </table-dialog>
</template>

<script>
import tableDialog from '@/dialog'
import baseinfo from './baseinfo'

import api from '@/api/function'
export default {
  components: { tableDialog, baseinfo },
  data() {
    return {
      config: {
        width: '1000px',
        submitHandler: api,
        createTitle: '新建识别函数',
        editTitle: '编辑识别函数'
      }
    }
  },
  methods: {

    handleOpen() {
      this.$nextTick(() => {
        this.$refs.baseinfo.init()
      })
    },
    handleClose() {
      this.$refs.baseinfo.reset()
    },
    beforeSubmit() {
      this.$refs.baseinfo.validate()(valid => {
        if (valid) {
          this.$refs.tableDialog.handleSubmit(this.$refs.baseinfo.form)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

