<!-- 导航栏 -->
<template>
  <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    router
    @select="handleSelect"
    background-color="#eeeeee"
    text-color="#303841"
    active-text-color="#5e9bf7"
  >
    <el-menu-item index="/">首页</el-menu-item>
    <el-menu-item index="/operation-page">功能页面</el-menu-item>
    <el-menu-item index="/card-management">借阅证管理</el-menu-item>
    <el-menu-item index="/book-management">图书管理</el-menu-item>
    <el-menu-item index="/borrow-management">借阅管理</el-menu-item>
    <el-menu-item index="/fine-management">罚款管理</el-menu-item>
    <el-menu-item style="float: right" index="/about">关于</el-menu-item>
  </el-menu>
</template>

<script>
import { onMounted, ref, getCurrentInstance } from "vue";
export default {
  setup() {
    const activeIndex = ref("/");
    const { ctx } = getCurrentInstance();

    onMounted(() => {
      console.log("Path:", ctx.$router.currentRoute.value.fullPath);
    });
    function handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
    return {
      activeIndex,
      handleSelect,
    };
  },
};
</script>

<style></style>
