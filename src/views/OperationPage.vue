<template>
  <h1>功能页面</h1>
  <el-row :gutter="20">
    <el-col :span="12">
      <div class="buttons-container">
        <el-button type="success" plain @click="borrowBook">借出图书</el-button>
        <el-button type="primary" plain @click="renewBook">续借图书</el-button>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="buttons-container">
        <el-button type="warning" plain @click="returnBook">还书入库</el-button>
        <el-button type="danger" plain @click="openPayFine">缴纳罚金</el-button>
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
      <lib-card-des
        :card_id="card_id"
        @fun="getStatusFromCard"
        ref="libCardDes"
      ></lib-card-des>
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
      <book-des
        :book_id="book_id"
        @fun="getStatusFromCard"
        ref="bookDes"
      ></book-des>
    </el-col>
  </el-row>
</template>

<script>
import BookDes from "../components/BookDes.vue";
import LibCardDes from "../components/LibCardDes.vue";
import BooksOnLoan from "../components/BooksOnLoan";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  getReturnBook,
  getBorrowBook,
  getPayFine,
  getRenewBook,
} from "../api/index";
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
    //子组件的实例
    const libCardDes = ref();
    const bookDes = ref();
    const booksOnLoan = ref();
    //查询借阅卡信息
    function onQueryCard() {
      console.log("onQueryCard");
      card_id.value = queryForm.value.card;
      libCardDes.value.getCard(queryForm.value.card);
      booksOnLoan.value.getLoanBook(queryForm.value.card);
    }
    //查询图书信息
    function onQueryBook() {
      console.log("onQueryBook");
      book_id.value = queryForm.value.book;
      bookDes.value.getBook(queryForm.value.book);
    }
    //还书入库
    function returnBook() {
      let params = new URLSearchParams();
      params.append("book_id", queryForm.value.book);
      console.log(params);
      getReturnBook(params)
        .then((res) => {
          console.log(res);
          if (res.success) {
            ElMessage.success(res.msg);
          } else {
            ElMessage.error(res.msg);
          }
        })
        .catch((failResponse) => {
          console.log(failResponse);
          ElMessage.error("获取信息失败，服务器错误，请联系管理员");
          ElMessage.error(failResponse.statusText);
        });
    }

    //借出图书
    function borrowBook() {
      let params = new URLSearchParams();
      params.append("book_id", queryForm.value.book);
      params.append("card_id", queryForm.value.card);
      console.log(params);
      getBorrowBook(params)
        .then((res) => {
          console.log(res);
          if (res.success) {
            ElMessage.success(res.msg);
          } else {
            ElMessage.error(res.msg);
          }
        })
        .catch((failResponse) => {
          console.log(failResponse);
          ElMessage.error("获取信息失败，服务器错误，请联系管理员");
          ElMessage.error(failResponse.statusText);
        });
    }
    //续借图书
    function renewBook() {
      let params = new URLSearchParams();
      params.append("book_id", queryForm.value.book);
      getRenewBook(params)
        .then((res) => {
          console.log(res);
          if (res.success) {
            ElMessage.success(res.msg);
          } else {
            ElMessage.error(res.msg);
          }
        })
        .catch((failResponse) => {
          console.log(failResponse);
          ElMessage.error("获取信息失败，服务器错误，请联系管理员");
          ElMessage.error(failResponse.statusText);
        });
    }
    //打开缴纳罚金窗口
    function openPayFine() {
      ElMessageBox.prompt("请输入缴纳的金额", "缴纳罚金", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          payFine(value);
        })
        .catch(() => {
          ElMessage.error("取消缴纳罚金");
        });
    }
    //缴纳罚金
    function payFine(value) {
      let params = new URLSearchParams();
      params.append("payment", value);
      params.append("book_id", queryForm.value.book);
      getPayFine(params)
        .then((res) => {
          console.log(res);
          if (res.success) {
            ElMessage.success(res.msg);
          } else {
            ElMessage.error(res.msg);
          }
        })
        .catch((failResponse) => {
          console.log(failResponse);
          ElMessage.error("获取信息失败，服务器错误，请联系管理员");
          ElMessage.error(failResponse.statusText);
        });
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
      libCardDes,
      bookDes,
      booksOnLoan,
      returnBook,
      borrowBook,
      renewBook,
      payFine,
      openPayFine,
    };
  },
};
</script>
<style>
.buttons-container {
  margin: 0 0 30px 0;
}
</style>
