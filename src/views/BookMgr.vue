<template>
  <h1>图书管理</h1>
  <router-view></router-view>
  <el-button
    type="primary"
    plain
    @click="gotoCreateBook"
    style="margin-bottom: 20px"
    >录入图书</el-button
  >
  <el-table
    :data="booksData"
    style="width: 100%"
    size="mini"
    align="left"
    border
  >
    <el-table-column prop="book_id" label="图书编号" width="280">
    </el-table-column>
    <el-table-column prop="book_name" label="书名" align="center">
    </el-table-column>
    <el-table-column prop="book_author" label="作者" width="100" align="center">
    </el-table-column>
    <el-table-column prop="publisher" label="出版社" align="center">
    </el-table-column>
    <el-table-column prop="pub_date" label="出版日期" width="120">
    </el-table-column>
    <el-table-column prop="page_count" label="页数" width="60" align="center">
    </el-table-column>
    <el-table-column prop="book_price" label="价格" width="60" align="center">
    </el-table-column>
    <el-table-column prop="isbn" label="ISBN" width="120"> </el-table-column>
    <el-table-column
      prop="available_status"
      label="在库状态"
      width="80"
      align="center"
    >
      <template #default="scope">
        <el-tag
          size="medium"
          :type="scope.row.available_status ? 'success' : 'danger'"
          >{{ scope.row.available_status ? "在库" : "不在库" }}</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="80" align="center">
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
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="queryData.page"
    :page-sizes="[10, 20, 50, 100]"
    :page-size="queryData.size"
    layout="prev, pager, next, jumper, ->, total, sizes"
    :total="dataSize"
  >
  </el-pagination>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { queryBook } from "../api/index";

export default {
  setup() {
    const router = useRouter();
    const booksData = ref([]);
    const dataSize = ref(0); //数据总条数
    const queryData = ref({
      book_id: "",
      book_name: "",
      book_author: "",
      publisher: "",
      pub_date: "",
      page_count: "",
      book_price: "",
      isbn: "",
      available_status: null,
      page: 1,
      size: 10,
    });
    onMounted(() => {
      getBook();
    });
    function handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      queryData.value.size = val;
      getBook();
    }
    function handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      queryData.value.page = val;
      getBook();
    }
    function getBook() {
      let jsonData = JSON.stringify(queryData.value);
      console.log(jsonData);
      queryBook(jsonData)
        .then((res) => {
          console.log(res);
          booksData.value = res.data;
          dataSize.value = res.data_count;
        })
        .catch((failResponse) => {
          console.log(failResponse);
          ElMessage.error("获取信息失败，服务器错误，请联系管理员");
          ElMessage.error(failResponse.statusText);
        });
    }
    function gotoCreateBook() {
      router.push({ path: "/create-book" });
    }
    function deleteBook(index) {
      console.log("删除：", index);
      booksData.value.splice(index, 1);
    }
    return {
      dataSize,
      queryData,
      booksData,
      deleteBook,
      gotoCreateBook,
      handleSizeChange,
      handleCurrentChange,
    };
  },
};
</script>

<style>
.el-table {
  background: rgb(228, 189, 117);
}
</style>
