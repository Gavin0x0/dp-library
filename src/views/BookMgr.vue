<template>
  <h1>图书管理</h1>
  <router-view></router-view>
  <el-button
    type="primary"
    plain
    @click="gotoCreateBook"
    style="margin-bottom: 20px"
    >创建图书</el-button
  >
  <el-table
    :data="booksData"
    style="width: 100%"
    max-height="700"
    size="mini"
    align="left"
  >
    <el-table-column prop="book_id" label="图书编号" width="300">
    </el-table-column>
    <el-table-column prop="book_name" label="书名" width="200">
    </el-table-column>
    <el-table-column prop="book_author" label="作者" width="100">
    </el-table-column>
    <el-table-column prop="publisher" label="出版社" width="200">
    </el-table-column>
    <el-table-column prop="pub_date" label="出版日期" width="200">
    </el-table-column>
    <el-table-column prop="page_count" label="页数" width="120">
    </el-table-column>
    <el-table-column prop="book_price" label="价格" width="120">
    </el-table-column>
    <el-table-column prop="ibsn" label="IBSN" width="180"> </el-table-column>
    <el-table-column prop="available_status" label="在库状态" width="120">
      <template #default="scope">
        <el-tag
          size="medium"
          :type="scope.row.available_status ? 'success' : 'danger'"
          >{{ scope.row.available_status ? "在库" : "不在库" }}</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="80">
      <template #default="scope">
        <el-button
          @click.prevent="deleteBook(scope.$index)"
          type="danger"
          size="mini"
        >
          移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { ref } from "vue";
export default {
  methods: {},
  setup() {
    const router = useRouter();
    const booksData = ref([]);
    onMounted(() => {
      var Mock = require("mockjs");
      var Random = Mock.Random;
      console.log("onMounted");
      let size = 20;
      for (let i = 0; i <= size; i++) {
        console.log(Random.date());
        let mockBook = {
          book_id: Random.guid(),
          book_name: "《" + Random.csentence(3, 6).split("。")[0] + "》",
          book_author: Random.cname(),
          publisher: "DP公司出版社",
          pub_date: Random.date(),
          page_count: Random.natural(100, 500),
          book_price: Random.natural(60, 100) + "元",
          ibsn: Random.natural(2000000000, 9000000000),
          available_status: Random.boolean(),
        };
        booksData.value.push(mockBook);
      }
    });
    function gotoCreateBook() {
      router.push({ path: "/create-book" });
    }
    function deleteBook(index) {
      console.log("删除：", index);
      booksData.value.splice(index, 1);
    }
    return {
      booksData,
      deleteBook,
      gotoCreateBook,
    };
  },
};
</script>

<style>
.el-table {
  background: rgb(228, 189, 117);
}
</style>
