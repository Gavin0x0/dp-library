<template>
  <el-descriptions title="图书信息" :column="2" border style="width: 80%">
    <el-descriptions-item :span="2">
      <template #label>
        <i class="el-icon-user"></i>
        书名
      </template>
      {{ bookContent.book_name }}
    </el-descriptions-item>
    <el-descriptions-item :span="2">
      <template #label>
        <i class="el-icon-location-outline"></i>
        ISBN
      </template>
      {{ bookContent.isbn }}
    </el-descriptions-item>
    <el-descriptions-item :span="2">
      <template #label>
        <i class="el-icon-office-building"></i>
        出版社
      </template>
      {{ bookContent.publisher }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <i class="el-icon-mobile-phone"></i>
        作者
      </template>
      {{ bookContent.book_author }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <i class="el-icon-tickets"></i>
        在库状态
      </template>
      <el-tag
        size="small"
        :type="bookContent.available_status ? 'success' : 'danger'"
        >{{ bookContent.available_status ? "在库" : "不在库" }}</el-tag
      >
    </el-descriptions-item>
  </el-descriptions>
  <h5>{{ "Debug book_id:" + book_id }}</h5>
</template>

<script>
import { onUpdated } from "@vue/runtime-core";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { queryBook } from "../api/index";
export default {
  props: { book_id: String },
  setup(props, context) {
    const bookContent = ref({
      book_id: "",
      book_name: "",
      book_author: "",
      publisher: "",
      pub_date: "",
      isbn: "",
      available_status: true,
    });
    onUpdated(() => {
      console.log("Book Descriptions Update!", props.book_id);
      getBook();
      sendStatusBack();
    });

    function getBook() {
      let jsonData = JSON.stringify({
        book_id: props.book_id,
        size: 1,
        page: 1,
      });
      console.log(jsonData);
      queryBook(jsonData)
        .then((res) => {
          console.log(res);
          if (res.data.length > 0) {
            bookContent.value = res.data[0];
            ElMessage.success("查询成功");
          } else {
            ElMessage.error("查无此书");
          }
        })
        .catch((failResponse) => {
          console.log(failResponse);
          ElMessage.error("获取信息失败，服务器错误，请联系管理员");
          ElMessage.error(failResponse.statusText);
        });
    }
    //向父组件返回借阅卡状态
    function sendStatusBack() {
      context.emit("fun", "hello father");
    }
    return {
      bookContent,
    };
  },
};
</script>
