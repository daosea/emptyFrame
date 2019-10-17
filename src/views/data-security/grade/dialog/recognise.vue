<template>
  <mulite-transfer v-model="value" :titles="titles" :data="transferData" />
</template>

<script>
import recogniseApi from '@/api/recognise'
import muliteTransfer from '@/components/MuliteTransfer'
export default {
  components: {
    muliteTransfer
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    edit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value: [],
      transferData: [],
      titles: [['规则名称', '安全级别'], ['规则名称', '安全级别']]
    }
  },
  watch: {
    data: {
      handler(val) {
        this.value = val
      }
    }
  },
  methods: {
    init() {
      this.getRecognise()
    },
    reset() {
      this.value = []
      this.transferData = []
    },
    // 获取识别规则
    getRecognise() {
      recogniseApi.getPage({ unpaged: true }).then(response => {
        this.transferData = this.generateData(response.data.content)
      })
    },
    generateData(data) {
      const transferData = []
      for (let i = 0; i < data.length; i++) {
        transferData.push({
          key: data[i].id,
          label: [data[i].ruleName, data[i].gradeName]
        })
      }
      return transferData
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
