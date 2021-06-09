<template>
  <div class="el-descriptions__title">已借图书</div>
  <template v-for="book in bookContent" :key="book.book_id">
    <el-descriptions :column="2" border style="width: 80%; margin-top: 30px">
      <el-descriptions-item :span="2">
        <template #label>
          <i class="el-icon-user"></i>
          书名
        </template>
        {{ book.book_name }}
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template #label>
          <i class="el-icon-location-outline"></i>
          图书编号
        </template>
        {{ book.book_id }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <i class="el-icon-office-building"></i>
          借出日期
        </template>
        {{ book.borr_date }}
      </el-descriptions-item>
      <el-descriptions-item style="margin-bottom: 20px">
        <template #label>
          <i class="el-icon-mobile-phone"></i>
          应还日期
        </template>
        {{ book.due_date }}
      </el-descriptions-item>
    </el-descriptions>
  </template>
  <template v-if="bookContent.length == 0">
    <h2 style="color: #34343460">尚未借书</h2>
  </template>
</template>

<script>
import { onUpdated } from "@vue/runtime-core";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { getLentBook } from "../api/index";
export default {
  props: { card_id: String },
  setup(props) {
    const bookContent = ref([]);
    onUpdated(() => {
      console.log("Book On Loan Update!", props.card_id);
    });
    //传入card_id
    const getLoanBook = (card_id) => {
      let params = new URLSearchParams();
      params.append("card_id", card_id);
      console.log(params);
      getLentBook(params)
        .then((res) => {
          console.log(res);
          if (res.data.length > 0) {
            bookContent.value = res.data;
            ElMessage.success("查询成功");
          }
        })
        .catch((failResponse) => {
          console.log(failResponse);
          ElMessage.error("获取信息失败，服务器错误，请联系管理员");
          ElMessage.error(failResponse.statusText);
        });
    };
    return {
      bookContent,
      getLoanBook,
    };
  },
};
</script>
