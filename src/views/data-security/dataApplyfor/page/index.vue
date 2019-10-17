<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="待申请" name="applying">
      <applying />
    </el-tab-pane>
    <el-tab-pane label="已申请" name="applyed">
      <applyed />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import applying from './applying.vue'
import applyed from './applyed.vue'
export default {
  components: {
    applyed, applying
  },
  data() {
    return {
      activeName: 'applying'
    }
  }
}
</script>
