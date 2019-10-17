<template>
  <el-form ref="form" :rules="rules" :model="form" label-width="100px">
    <el-form-item label="脱敏规则名" prop="ruleName">
      <el-input v-model="form.ruleName" />
    </el-form-item>
    <el-form-item label="是否启用" prop="enabled">
      <el-switch v-model="form.enabled" :active-value="1" :inactive-value="0" />
    </el-form-item>
    <el-form-item label="规则说明" prop="description">
      <el-input v-model="form.description" type="textarea" rows="2" />
    </el-form-item>
    <el-form-item label="脱敏方式" prop="desType">
      <el-radio-group v-model="form.desType">
        <el-radio v-for="des in desTypeList" :key="des.value" :label="des.value">{{ des.label }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="form.desType===4" label="映射为" prop="valueMapper">
      <el-row
        v-for="(value,index) in form.ruleExp.valueMapper"
        :key="index"
        class="row-col-10 value-list"
      >
        <el-col :span="10">
          <el-input v-model="value.source">
            <template slot="prepend">源值</template>
          </el-input>
        </el-col>
        <el-col :span="10">
          <el-input v-model="value.target">
            <template slot="prepend">映射值</template>
          </el-input>
        </el-col>
        <el-col :span="2">
          <i v-if="index===0" class="el-icon-plus" @click="handleAddValue" />
          <i v-if="index!==0" class="el-icon-minus" @click="handleMinusValue(index)" />
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item v-if="form.desType===3" label="HASH算法" prop="algorithm">
      <el-select v-model="form.ruleExp.algorithm">
        <el-option
          v-for="item in hashList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item v-if="form.desType===1" label="掩盖方式" prop="chooseType">
      <el-select v-model="form.ruleExp.chooseType" placeholder="请选择" @change="handleChangeMaskType">
        <el-option
          v-for="item in chooseTypeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item v-if="form.desType===1" prop="description">
      <el-row class="row-col-10">
        <el-col :span="4">
          <el-input v-model="form.ruleExp.firstNum">
            <template slot="prefix">前</template>
            <template slot="suffix">位</template>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-input v-model="form.ruleExp.lastNum">
            <template slot="prefix">后</template>
            <template slot="suffix">位</template>
          </el-input>
        </el-col>
        <el-col :span="10">
          <div class="flex-row">
            进行
            <el-select v-model="form.ruleExp.symbol" placeholder="请选择">
              <el-option
                v-for="item in symbolList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item v-if="form.desType===2" label="从" prop="StringCut">
      <el-row class="row-col-10">
        <el-col :span="10">
          <el-input v-model="form.ruleExp.cutFrom">
            <template slot="prefix">开始</template>
          </el-input>
        </el-col>
        <el-col :span="10">
          <el-input v-model="form.ruleExp.cutTo">
            <template slot="prefix">结束</template>
          </el-input>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item v-if="form.desType===5" label="数据类型" prop="Floor">
      <el-select v-model="form.ruleExp.type" placeholder="请选择" @change="changeType">
        <el-option
          v-for="item in typeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item v-if="form.desType===5" label="取整范围" prop="description">
      <template v-if="form.ruleExp.type===1">
        <el-checkbox v-model="form.ruleExp.accuracy.year" label="年" @change="changeAccuracy">年</el-checkbox>
        <el-checkbox v-model="form.ruleExp.accuracy.month" label="月" @change="changeAccuracy">月</el-checkbox>
        <el-checkbox v-model="form.ruleExp.accuracy.day" label="日" @change="changeAccuracy">日</el-checkbox>
      </template>
      <template v-if="form.ruleExp.type===2">
        <el-checkbox v-model="form.ruleExp.accuracy.year" label="年" @change="changeAccuracy">年</el-checkbox>
        <el-checkbox v-model="form.ruleExp.accuracy.month" label="月" @change="changeAccuracy">月</el-checkbox>
        <el-checkbox v-model="form.ruleExp.accuracy.day" label="日" @change="changeAccuracy">日</el-checkbox>
        <el-checkbox v-model="form.ruleExp.accuracy.hour" label="年" @change="changeAccuracy">时</el-checkbox>
        <el-checkbox v-model="form.ruleExp.accuracy.minute" label="月" @change="changeAccuracy">分</el-checkbox>
        <el-checkbox v-model="form.ruleExp.accuracy.second" label="日" @change="changeAccuracy">秒</el-checkbox>
      </template>
      <el-input v-if="form.ruleExp.type===3&&form.ruleExp.accuracy" v-model="form.ruleExp.accuracy.accurayNum" @input="changeNum(form.ruleExp.accuracy.accurayNum)" />
    </el-form-item>
    <el-form-item v-if="form.desType===5" label="效果">{{ example }}</el-form-item>
    <el-form-item v-if="form.desType===7" label="加密算法" prop="encryptId">
      <el-select v-model="form.encryptId" placeholder="请选择">
        <el-option
          v-for="item in encryptList"
          :key="item.id"
          :label="item.algorithmName"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-slider
        v-model="value"
        :max="5"
        :show-tooltip="false"
        :marks="marks"
        :show-stops="false"
      />
    </el-form-item>
  </el-form>
</template>

<script>
import formMixin from '@/mixins/formMixin'
import encryptApi from '@/api/encrypt'
export default {
  components: {},
  mixins: [formMixin],
  data() {
    return {
      value: 0,
      marks: {
        0: '年',
        1: '月',
        2: '日',
        3: '时',
        4: '分',
        5: '秒'
      },
      example: '',
      accurayNum: '1111111111',
      encryptList: [],
      form: {
        ruleExp: {
          valueMapper: [{}],
          accuracy: {
            year: true,
            month: true,
            day: true,
            hour: true,
            minute: true,
            second: true
          }
        }
      },
      rules: {
        gradeName: [{ required: true, message: '请输入名称', trigger: 'blur' }]
      },
      hashList: [
        { label: 'SHA-1', value: 1 }
      ],
      symbolList: [
        { label: '脱敏', value: 1 }
      ],
      typeList: [
        { label: '日期', value: 1 },
        { label: '时间戳', value: 2 },
        { label: '数值', value: 3 }
      ],
      accuracyList: [
        { label: '两位开始取整', value: 1 }
      ],
      chooseTypeList: [
        { label: '前三后三', value: 1, firstNum: 3, lastNum: 3 }
      ],
      desTypeList: [
        { label: '值映射', value: 4 },
        { label: 'HASH', value: 3 },
        { label: '掩盖', value: 1 },
        { label: '剪切', value: 2 },
        { label: '取整', value: 5 },
        { label: '保留格式', value: 7 },
        { label: '加密', value: 6 }
      ]
    }
  },
  methods: {
    // 初始化
    afterInit() {
      if (!this.form.ruleExp) {
        this.$set(this.form, 'ruleExp', {
          valueMapper: [{}],
          accuracy: {
            year: true,
            month: true,
            day: true,
            hour: true,
            minute: true,
            second: true
          }
        })
      }

      if (!this.form.ruleExp.accuracy) {
        this.form.ruleExp.accuracy = {
          year: true,
          month: true,
          day: true,
          hour: true,
          minute: true,
          second: true,
          accurayNum: 0
        }
      }

      if (!this.form.ruleExp.valueMapper) {
        this.form.ruleExp.valueMapper = [{}]
      }
      this.setDefults(this.defaults)
      this.getEncryptList()
    },
    afterReset() {
      this.form.ruleExp = {
        valueMapper: [{}],
        accuracy: {
          year: true,
          month: true,
          day: true,
          hour: true,
          minute: true,
          second: true
        }
      }
    },
    getEncryptList() {
      encryptApi.getList().then(response => {
        this.encryptList = response.data
      })
    },
    handleAddValue() {
      this.form.ruleExp.valueMapper.push({})
    },
    handleMinusValue(index) {
      this.form.ruleExp.valueMapper.splice(index, 1)
    },
    handleChangeMaskType(item) {
      for (let i = 0; i < this.chooseTypeList.length; i++) {
        if (this.chooseTypeList[i].value === item) {
          this.form.ruleExp.firstNum = this.chooseTypeList[i].firstNum
          this.form.ruleExp.lastNum = this.chooseTypeList[i].lastNum
        }
      }
    },
    changeType(index) {
      if (index !== 3) {
        this.changeAccuracy()
      } else {
        this.form.ruleExp.accuracy = {}
        this.example = '111111111'
        this.changeNum()
      }
    },
    // 更改时间
    changeAccuracy() {
      const year = '2019'
      const month = '09'
      const day = '19'
      const hour = '12'
      const minute = '00'
      const second = '00'
      const date = []
      const time = []
      if (this.form.ruleExp.accuracy.year) {
        date.push(year)
      }
      if (this.form.ruleExp.accuracy.month) {
        date.push(month)
      }
      if (this.form.ruleExp.accuracy.day) {
        date.push(day)
      }
      if (this.form.ruleExp.accuracy.hour) {
        time.push(hour)
      }
      if (this.form.ruleExp.accuracy.minute) {
        time.push(minute)
      }
      if (this.form.ruleExp.accuracy.second) {
        time.push(second)
      }
      this.example = date.join('-') + ' ' + time.join(':')
    },

    changeNum(val) {
      if (!val) {
        val = 0
      }
      let last = ''
      for (let i = 0; i < val; i++) {
        last += '0'
      }

      this.example = (this.accurayNum.slice(0, this.accurayNum.length - val)) + last
    }
  }
}
</script>

<style lang="scss" scoped>
// .flex-row {
//   display: flex;
//   & > .el-input {
//     margin-left: 10px;
//     width: 180px;
//   }
//   & > .el-select {
//     margin-left: 10px;
//     width: 180px;
//   }
// }
.value-list {
  margin-bottom: 5px;
}
.row-col-10 {
  & > .el-col {
    //margin-left: 10px;
    padding-right: 10px;
  }
}
</style>
