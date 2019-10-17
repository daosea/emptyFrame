<template>
  <div class="grade" v-on="$listeners">
    <svg-icon class="icon" icon-class="grade-safe" :style="{'color':iconColor}" />
    <div class="text">{{ level }}</div>
  </div>
</template>

<script>
export default {
  name: 'GradeComponent',
  props: {
    data: {
      type: Number,
      default: 1
    },
    selected: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      color: [
        'rgb(47,183,96)',
        'rgb(50,119,245)',
        'rgb(75,135,203)',
        'rgb(251,71,79)',
        'rgb(91,25,143)'
      ]
    }
  },
  computed: {
    iconColor() {
      return this.selected ? this.color[this.data - 1] : ''
    },
    level() {
      return this.data
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
$size:20px;
.grade{
    position: relative;
    width: $size;
    height:$size;
    line-height: 23px;
    color:#ddd;
}
.icon {
  width: $size;
  height: $size;
}
.text {
  position: absolute;
  width: $size;
  height:$size;
  text-align: center;
  top: -1px;
  line-height: 23px;
  z-index: 1;
  color: #fff;
  font-size: 12px;
}
</style>

