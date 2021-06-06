<template>
  <h1>功能页面</h1>
  <el-row :gutter="20">
    <el-col :span="12">
      <div class="buttons-container">
        <el-button type="success" plain>借出图书</el-button>
        <el-button type="primary" plain>续借图书</el-button>
        <el-button type="danger" plain>缴纳罚金</el-button>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="buttons-container">
        <el-button type="warning" plain>还书入库</el-button>
      </div>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12"
      ><el-form :inline="true" :model="queryForm" class="demo-form-inline">
        <el-form-item label="输入借阅卡号">
          <el-input
            v-model="queryForm.card"
            placeholder="请输入卡号"
            style="width: 20vw"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onQueryCard">查询</el-button>
        </el-form-item>
      </el-form>
      <lib-card-des :card_id="card_id" @fun="getStatusFromCard"></lib-card-des>
      <books-on-loan :card_id="card_id" ref="booksOnLoan"></books-on-loan>
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12"
      ><el-form :inline="true" :model="queryForm" class="demo-form-inline">
        <el-form-item label="输入图书编号">
          <el-input
            v-model="queryForm.book"
            placeholder="请输入编号"
            style="width: 20vw"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onQueryBook">查询</el-button>
        </el-form-item>
      </el-form>
      <book-des :book_id="book_id" @fun="getStatusFromCard"></book-des>
    </el-col>
  </el-row>
</template>

<script>
import BookDes from "../components/BookDes.vue";
import LibCardDes from "../components/LibCardDes.vue";
import BooksOnLoan from "../components/BooksOnLoan";
import { ref } from "vue";
export default {
  components: { LibCardDes, BookDes, BooksOnLoan },
  setup() {
    const card_id = ref("");
    const book_id = ref("");
    const queryForm = ref({
      card: "",
      book: "",
    });
    const booksOnLoan = ref();
    function onQueryCard() {
      console.log("onQueryCard");
      card_id.value = queryForm.value.card;
      booksOnLoan.value.getLoanBook();
    }
    function onQueryBook() {
      console.log("onQueryBook");
      book_id.value = queryForm.value.book;
    }
    // 监听子组件抛出的借阅卡状态参数
    const getStatusFromCard = (e) => {
      console.log("子组件给的值：", e);
    };
    //监听子组件抛出的书籍状态参数
    function getStatusFromBook(params) {
      console.log("get from book", params);
    }
    return {
      card_id,
      book_id,
      onQueryCard,
      onQueryBook,
      queryForm,
      getStatusFromCard,
      getStatusFromBook,
      booksOnLoan,
    };
  },
};
</script>
<style>
.buttons-container {
  margin: 0 0 30px 0;
}
</style>
