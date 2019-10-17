<template>
  <el-form ref="form" :rules="rules" :model="form" label-width="80px">
    <el-form-item label="名称" prop="gradeName">
      <el-input v-model="form.gradeName" />
    </el-form-item>
    <el-form-item label="敏感程度" prop="sensitivity">
      <el-radio-group v-model="form.sensitivity">
        <el-radio-button
          v-for="item in dictDatas['dseSentitivity']"
          :key="item.id"
          :label="item.value"
        >{{ item.name }}
        </el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="说明" prop="description">
      <el-input v-model="form.description" type="textarea" :rows="2" />
    </el-form-item>
  </el-form>
</template>

<script>
import formMixin from '@/mixins/formMixin'
export default {
  components: {
  },
  mixins: [formMixin],
  data() {
    return {
      defaults: {
        sensitivity: 'sensitive'
      },
      rules: {
        gradeName: [{ required: true, message: '请输入名称', trigger: 'blur' }]
      },
      dictDatas: {
        dseSentitivity: []
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="sass" scoped>

</style>
