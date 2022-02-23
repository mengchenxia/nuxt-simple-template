<template>
  <div class="header">
    <div class="horizontal-section clearfix pc-header">
      <div class="logo-section fl">
        <nuxt-link to="/" class="logo-link">
          <img :src="require('@/assets/imgs/logo.png')" alt="logo">
        </nuxt-link>
      </div>

      <div class="menu-section fl">
        <el-menu
          :default-active="activeMenu"
          :unique-opened="true"
          class="el-menu-demo"
          mode="horizontal"
          @select="menuSelect"
        >
          <el-menu-item index="1">
            <nuxt-link to="/">首页</nuxt-link>
          </el-menu-item>
          <!-- <el-submenu index="2">
            <template slot="title">
              <nuxt-link to="/hardware/jimo">我的工作台</nuxt-link>
            </template>
            <el-menu-item index="2-1">
              <nuxt-link to="/hardware/jimo">jimo 1</nuxt-link>
            </el-menu-item>
            <el-menu-item index="2-2">
              <nuxt-link to="/hardware/jimo">jimo 2</nuxt-link>
            </el-menu-item>
            <el-menu-item index="2-3">
              <nuxt-link to="/hardware/jimo">jimo 3</nuxt-link>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="3" disabled>消息中心</el-menu-item>-->
        </el-menu>
      </div>

      <div class="right-menu-section fr">
        <div class="right-menu-item">
          <svg-icon icon-class="user" class-name="icons" />
        </div>
        <div class="right-menu-item">
          <svg-icon icon-class="language" class-name="icons" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name : 'Horizontal',
  props : {
    // headImg : {
    //   type : String,
    //   default : ''
    // }
  },
  data() {
    return {
      activeMenu : ''
    }
  },
  mounted() {},
  methods : {
    menuSelect( key, keyPath ) {
      console.log( key, keyPath )
    }
  }
}
</script>

<style lang="scss" scoped>
.horizontal-section {
  height: 60px;
  background: #000;
  padding: 0 17px 0 20px;
}

.logo-section {
  height: 100%;
  padding-top: 20px;
  display: inline-block;
  width: 195px;
}
.el-menu-demo{
  background-color: #000;
}
.menu-section {
  width: calc(100% - 420px);
  display: inline-block;
}
</style>
