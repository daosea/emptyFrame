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
      <el-steps direction="vertical" :active="active">
        <el-step title="基础信息">
          <template slot="description">
            <baseinfo ref="baseinfo" :data="slotProps.data" :edit="slotProps.edit" />
          </template>
        </el-step>
        <el-step title="脱敏方式">
          <template slot="description">
            <desensitization ref="desensitization" :data="slotProps.data.desVO" :edit="slotProps.edit" />
          </template>
        </el-step>
      </el-steps>
    </template>
    <!-- <el-button slot="footer" style="margin-top: 12px;" @click="handleNext">下一步</el-button> -->
  </table-dialog>
</template>

<script>
import tableDialog from '@/dialog'
import baseinfo from './baseinfo'
import desensitization from './desensitization'
import api from '@/api/recognise'
export default {
  components: {
    tableDialog,
    baseinfo,
    desensitization
  },
  data() {
    return {
      showButton: false,
      active: 1,

      config: {
        width: '800px',
        submitHandler: api,
        createTitle: '新建识别规则',
        editTitle: '编辑识别规则'
      }
    }
  },
  methods: {
    handleOpen() {
      this.$nextTick(() => {
        this.$refs.baseinfo.init()
        this.$refs.desensitization.init()
      })
    },
    handleClose() {
      this.$refs.baseinfo.reset()
      this.$refs.desensitization.reset()
    },
    beforeSubmit() {
      this.$refs.baseinfo.validate()(valid => {
        if (valid) {
          const submitData = {
            ...this.$refs.baseinfo.form,
            desVO: {
              id: this.$refs.desensitization.value
            }
          }
          this.$refs.tableDialog.handleSubmit(submitData)
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
