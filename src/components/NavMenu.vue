<!-- 导航栏 -->
<template>
  <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    router
    @select="handleSelect"
    background-color="#eeeeee"
    text-color="#303841"
    active-text-color="#ff5722"
  >
    <el-menu-item index="/home">首页</el-menu-item>
    <el-submenu index="/class">
      <template #title>分类</template>
      <el-menu-item index="/1">选项1</el-menu-item>
      <el-menu-item index="/2">选项2</el-menu-item>
      <el-menu-item index="/3">选项3</el-menu-item>
    </el-submenu>
    <el-menu-item style="float: right" index="/about">关于</el-menu-item>
    <el-menu-item style="float: right" index="/mine">我的</el-menu-item>
    <el-menu-item style="float: right" index="/cart">购物车</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "/home",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style></style>
