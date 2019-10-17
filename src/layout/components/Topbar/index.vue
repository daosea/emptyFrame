<template>
  <div class="topbar-container">
    <div class="topbar-left">
      <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
      <svg-icon :icon-class="meta.icon" />
      <div class="text">{{ meta.title }}</div>
    </div>
    <div class="right-menu">
      <screenfull id="screenfull" class="right-menu-item hover-effect" />
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>Home</el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Screenfull from '@/components/Screenfull'
import Hamburger from '@/components/Hamburger'
export default {
  components: {
    Hamburger, Screenfull
  },
  data() {
    return {
      meta: {}
    }
  },
  computed: {
    ...mapGetters([
      'avatar',
      'sidebar'
    ])
  },
  watch: {
    $route: {
      handler() {
        this.getTopInfo()
      },
      immediate: true
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    getTopInfo() {
      this.meta = this.$route.meta
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../styles/variables.scss';
.hamburger-container {
    margin-right: 15px;
    padding: 0 15px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;
    fill: #fff;
    &:hover {
      background:$menuBg;
    }
  }

</style>
