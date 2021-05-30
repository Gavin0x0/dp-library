<template>
  <el-page-header
    class="page-header"
    icon="el-icon-arrow-left"
    @back="goBack"
    content="录入图书"
  >
  </el-page-header>
  <el-form
    :model="formData"
    :rules="rules"
    ref="CreateBookForm"
    label-width="100px"
  >
    <el-form-item label="图书编号" prop="book_id">
      <el-input
        v-model="formData.book_id"
        readonly
        placeholder="编号不可自定义，请点击下方生成唯一编号"
      ></el-input>
      <el-button @click.prevent="generateGUID"
        >随机生成唯一编号「GUID」</el-button
      >
    </el-form-item>
    <el-form-item label="书名" prop="book_name">
      <el-input v-model="formData.book_name"></el-input>
    </el-form-item>
    <el-form-item label="作者" prop="book_author">
      <el-input v-model="formData.book_author"></el-input>
    </el-form-item>
    <el-form-item label="出版社" prop="publisher">
      <el-input v-model="formData.publisher"></el-input>
    </el-form-item>
    <el-form-item label="出版日期" prop="pub_date">
      <el-input v-model="formData.pub_date"></el-input>
    </el-form-item>
    <el-form-item label="页数" prop="page_count">
      <el-input v-model="formData.page_count"></el-input>
    </el-form-item>
    <el-form-item label="价格" prop="book_price">
      <el-input v-model="formData.book_price"></el-input>
    </el-form-item>
    <el-form-item label="ISBN" prop="isbn">
      <el-input v-model="formData.isbn"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()">立即录入</el-button>
      <el-button @click="generateMock()">Mock数据</el-button>
      <el-button @click="resetForm()">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { ref } from "vue";
import { createBook } from "../api/index";
export default {
  data() {
    var checkPrice = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      if (!Number.isInteger(value)) {
        callback(new Error("请录入数字值"));
      } else {
        if (value < 0) {
          callback(new Error("大于0元"));
        } else {
          callback();
        }
      }
    };
    return {
      rules: {
        book_id: [
          { required: true, message: "请生成图书证编号", trigger: "change" },
        ],
        book_name: [
          { required: true, message: "请录入书名", trigger: "blur" },
          {
            min: 1,
            max: 40,
            message: "长度在 1 到 40 个字符",
            trigger: ["blur", "change"],
          },
        ],
        book_author: [
          { required: true, message: "请录入作者", trigger: "blur" },
          {
            min: 1,
            max: 40,
            message: "长度在 1 到 40 个字符",
            trigger: ["blur", "change"],
          },
        ],
        publisher: [
          { required: true, message: "请录入出版社", trigger: "blur" },
        ],
        pub_date: [
          { required: true, message: "请录入出版日期", trigger: "blur" },
          {
            pattern: /(^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$)/,
            message: "请录入正确日期格式",
            trigger: "blur",
          },
        ],
        page_count: [
          { required: true, message: "请录入页数", trigger: "blur" },
          { type: "number", message: "页数必须为数字值" },
        ],
        book_price: [
          { required: true, message: "请录入价格", trigger: "blur" },
          { validator: checkPrice, trigger: "blur" },
        ],
        isbn: [{ required: true, message: "请录入ISBN", trigger: "blur" }],
      },
    };
  },
  setup() {
    const router = useRouter();
    const CreateBookForm = ref(null);
    var Mock = require("mockjs");
    var Random = Mock.Random;
    const formData = ref({
      book_id: "",
      book_name: "",
      book_author: "",
      publisher: "",
      pub_date: "",
      page_count: "",
      book_price: "",
      isbn: "",
    });
    function goBack() {
      console.log("go back");
      router.go(-1);
    }
    function resetForm() {
      CreateBookForm.value.resetFields();
    }
    function generateGUID() {
      formData.value.book_id = Random.guid();
    }
    function generateMock() {
      formData.value.book_id = Random.guid();
      formData.value.book_name =
        "《" + Random.csentence(3, 6).split("。")[0] + "》";
      (formData.value.book_author = Random.cname()),
        (formData.value.publisher =
          Random.csentence(2, 7).split("。")[0] + "出版社"),
        (formData.value.pub_date = Random.date()),
        (formData.value.page_count = Random.natural(100, 500));
      formData.value.book_price = Random.natural(60, 100);
      formData.value.isbn = Random.natural(2000000000, 9000000000);
    }
    function onCreateBook() {
      let nowDate = new Date().toLocaleDateString();
      console.log(nowDate);
      formData.value.create_date = nowDate;
      let jsonData = JSON.stringify(formData.value);
      console.log(jsonData);
      createBook(jsonData)
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
          ElMessage.error("录入失败，服务器错误，请联系管理员");
          ElMessage.error(failResponse.statusText);
        });
    }
    function submitForm() {
      CreateBookForm.value.validate((valid) => {
        if (valid) {
          console.log("submit!!");
          onCreateBook();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
    return {
      goBack,
      submitForm,
      resetForm,
      CreateBookForm,
      generateGUID,
      generateMock,
      formData,
    };
  },
};
</script>
<style>
.page-header {
  margin-bottom: 30px;
}
</style>
