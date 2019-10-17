<template>
  <el-form ref="form" :rules="rules" :model="form" label-width="80px">
    <el-form-item label="名称" prop="ruleName">
      <el-input v-model="form.ruleName" />
    </el-form-item>
    <el-form-item label="安全等级" prop="gradeId">
      <el-select v-model="form.gradeId" placeholder="请选择">
        <el-option
          v-for="item in gradeList"
          :key="item.id"
          :label="item.gradeName"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="是否启用" prop="enabled">
      <el-switch v-model="form.enabled" :active-value="1" :inactive-value="0" />
    </el-form-item>
    <el-form-item label="识别方式" prop="enabled">
      <el-radio v-model="form.recogniseType" label="content">基于内容</el-radio>
    </el-form-item>
    <el-form-item label="识别函数" prop="gradeId">
      <el-select v-model="form.functionId" placeholder="请选择">
        <el-option
          v-for="item in functionList"
          :key="item.id"
          :label="item.displayName"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="" prop="testParams">
      <el-row>
        <el-col :span="19">
          <el-input v-model="form.testParams" />
        </el-col>
        <el-col :span="4" :offset="1">
          <el-button type="primary">运行</el-button>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="说明" prop="description">
      <el-input v-model="form.description" type="textarea" :rows="2" />
    </el-form-item>
  </el-form>
</template>

<script>
import formMixin from '@/mixins/formMixin'
import gradeApi from '@/api/grade'
import functionApi from '@/api/function'
export default {
  components: {
  },
  mixins: [formMixin],
  data() {
    return {
      gradeList: [],
      functionList: [],
      form: {
        recogniseType: 'content'
      },
      defaults: {
      },
      rules: {
        ruleName: [{ required: true, message: '请输入名称', trigger: 'blur' }]
      }
    }
  },
  methods: {
    afterInit() {
      this.getGradeList()
      this.getFunctionList()
    },
    getGradeList() {
      gradeApi.getList().then(response => {
        this.gradeList = response.data
      })
    },
    getFunctionList() {
      functionApi.getList().then(response => {
        this.functionList = response.data
      })
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
