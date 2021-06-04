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
    <el-menu-item index="/card-management">借阅证管理</el-menu-item>
    <el-menu-item index="/book-management">图书管理</el-menu-item>
    <el-menu-item index="/borrow-management">借/续/还 管理</el-menu-item>
    <el-menu-item index="/renew-management">续借管理</el-menu-item>
    <el-menu-item index="/return-management">还书管理</el-menu-item>
    <el-menu-item index="/fine-management">罚款管理</el-menu-item>
    <el-menu-item index="/book-query">图书查询</el-menu-item>
    <el-menu-item style="float: right" index="/about">关于</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "/",
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
