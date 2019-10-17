<template>
  <el-table
    ref="desTable"
    :data="desensitizationList"
    style="width: 100%"
    highlight-current-row
    row-key="id"
    @current-change="handleCurrentChange"
  >
    <el-table-column
      type="index"
      width="50"
    />
    <el-table-column
      prop="ruleName"
      label="规则名称"
    />
    <el-table-column
      prop="desTypeName"
      label="脱敏方式"
    />
    <el-table-column
      prop="createdAt"
      label="创建时间"
    />
    <el-table-column
      prop="operatedName"
      label="操作人"
    />
    <el-table-column
      prop="utilization"
      label="引用次数"
    />
  </el-table>
</template>

<script>
import formMixin from '@/mixins/formMixin'
import desensitizationApi from '@/api/desensitization'
export default {
  mixins: [formMixin],
  data() {
    return {
      value: null,
      desensitizationList: []
    }
  },
  watch: {
    data: {
      handler(val) {
        if (val) {
          this.$nextTick(() => {
            this.$refs.desTable.setCurrentRow(val)
          })
        }
      },
      immediate: true
    }
  },
  methods: {
    afterInit() {
      this.getDesensitizationList()
    },
    getDesensitizationList() {
      desensitizationApi.getList().then(response => {
        this.desensitizationList = response.data
      })
    },
    handleCurrentChange(val) {
      if (!val) return
      this.value = val.id
    },
    afterReset() {
      this.$refs.desTable.setCurrentRow()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
