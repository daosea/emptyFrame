<template>
  <div>
    <el-row>
      <el-form ref="form" :rules="rules" :model="form" label-width="100px">
        <el-col :span="8">
          <el-form-item label="函数名称" prop="displayName">
            <el-input v-model="form.displayName" />
          </el-form-item>
          <el-form-item label="函数英文名" prop="funName">
            <el-input v-model="form.funName" />
          </el-form-item>
          <el-form-item label="脚本类型" prop="funSyntax">
            <el-select v-model="form.funSyntax" placeholder="请选择">
              <el-option
                v-for="item in dictDatas['dseFunSyntax']"
                :key="item.id"
                :label="item.name"
                :value="parseInt(item.value)"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="函数类型" prop="funType">
            <el-select v-model="form.funType" placeholder="请选择">
              <el-option
                v-for="item in dictDatas['dseFunType']"
                :key="item.id"
                :label="item.name"
                :value="parseInt(item.value)"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="参数" prop="funParams">
            <el-input v-model="form.funParams" />
          </el-form-item>
          <el-form-item label="返回类型" prop="returnType">
            <el-select v-model="form.returnType" placeholder="请选择">
              <el-option
                v-for="item in dictDatas['dseReturnType']"
                :key="item.id"
                :label="item.name"
                :value="parseInt(item.value)"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="启用" prop="enabled">
            <el-switch v-model="form.enabled" :active-value="1" :inactive-value="0" />
          </el-form-item>
          <el-form-item label="说明" prop="description">
            <el-input v-model="form.description" type="textarea" :rows="4" />
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="测试值" prop="testParams">
            <el-input v-model="form.testParams" placeholder="多参数请用逗号分隔，例如：val,param" />
          </el-form-item>
          <el-form-item label="Script" prop="funExpression">
            <el-input v-model="form.funExpression" type="textarea" :rows="13" />
          </el-form-item>
          <el-form-item label="Console" prop="output">
            <el-input v-model="form.output" type="textarea" :rows="5" />
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-button type="primary" class="run" @click="testFunc">运行</el-button>
  </div>
</template>

<script>
import formMixin from '@/mixins/formMixin'
import { testFunc } from '@/api/function'
export default {
  components: {

  },
  mixins: [formMixin],
  data() {
    return {
      defaults: {
        funSyntax: 1,
        funType: 1,
        returnType: 1
      },
      rules: {
        displayName: [
          { required: true, message: '请输入函数名称', trigger: 'blur' }
        ]
      },
      dictDatas: {
        dseFunSyntax: [],
        dseFunType: [],
        dseReturnType: []
      }
    }
  },
  methods: {
    testFunc() {
      testFunc(this.form).then(response => {
        // this.form.output = response.data
        this.$set(this.form, 'output', response.data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.run {
  position: absolute;
  top: 15px;
  right: 50px;
}
</style>
