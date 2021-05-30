<template>
  <el-page-header
    class="page-header"
    icon="el-icon-arrow-left"
    @back="goBack"
    content="创建借阅卡"
  >
  </el-page-header>
  <el-form
    :model="formData"
    :rules="rules"
    ref="CreateCardForm"
    label-width="100px"
  >
    <el-form-item label="借书证编号" prop="card_id">
      <el-input
        v-model="formData.card_id"
        readonly
        placeholder="编号不可自定义，请点击下方生成唯一编号"
      ></el-input>
      <el-button @click.prevent="generateGUID"
        >随机生成唯一编号「GUID」</el-button
      >
    </el-form-item>
    <el-form-item label="姓名" prop="reader_name">
      <el-input v-model="formData.reader_name"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="reader_sex">
      <el-radio-group v-model="formData.reader_sex">
        <el-radio label="男"></el-radio>
        <el-radio label="女"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="身份证号" prop="reader_id">
      <el-input v-model="formData.reader_id"></el-input>
    </el-form-item>
    <el-form-item label="单位名称" prop="unit_name">
      <el-input v-model="formData.unit_name"></el-input>
    </el-form-item>
    <el-form-item label="联系电话" prop="phone_num">
      <el-input v-model="formData.phone_num"></el-input>
    </el-form-item>
    <el-form-item label="读者类型" prop="reader_type">
      <el-select v-model="formData.reader_type" placeholder="请选择读者类型">
        <el-option label="普通员工" value="普通员工"></el-option>
        <el-option label="区域经理" value="区域经理"></el-option>
        <el-option label="总经理" value="总经理"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()">立即创建</el-button>
      <el-button @click="generateMock()">Mock数据</el-button>
      <el-button @click="resetForm()">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { ref } from "vue";
import { createLibCard } from "../api/index";
export default {
  data() {
    return {
      rules: {
        card_id: [
          { required: true, message: "请生成借阅证编号", trigger: "change" },
        ],
        reader_name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 2,
            max: 6,
            message: "长度在 2 到 6 个字符",
            trigger: ["blur", "change"],
          },
        ],
        reader_sex: [
          { required: true, message: "请选择性别", trigger: "blur" },
        ],
        reader_id: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: "请输入合法身份证号",
            trigger: "blur",
          },
        ],
        unit_name: [
          { required: true, message: "请输入单位名", trigger: "blur" },
        ],
        reader_type: [
          { required: true, message: "请选择读者类型", trigger: "blur" },
        ],
        phone_num: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          {
            pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/,
            message: "请输入合法手机号/电话号",
            trigger: "blur",
          },
        ],
      },
    };
  },
  setup() {
    const router = useRouter();
    const CreateCardForm = ref(null);
    var Mock = require("mockjs");
    var Random = Mock.Random;
    //扩展函数：手机号生成
    Mock.Random.extend({
      phone: function () {
        var phonePrefixs = ["138", "187", "189"]; // 自己写前缀哈
        return this.pick(phonePrefixs) + Mock.mock(/\d{8}/); //Number()
      },
    });
    const formData = ref({
      card_id: "",
      reader_name: "",
      reader_sex: "",
      reader_id: "",
      unit_name: "",
      reader_type: "",
      phone_num: "",
      create_date: "",
    });
    function goBack() {
      console.log("go back");
      router.go(-1);
    }
    function resetForm() {
      CreateCardForm.value.resetFields();
    }
    function generateGUID() {
      formData.value.card_id = Random.guid();
    }
    function generateMock() {
      formData.value.card_id = Random.guid();
      formData.value.reader_name = Random.cname();
      formData.value.reader_sex = Random.string("男女", 1, 1);
      formData.value.reader_id = Random.id();
      formData.value.unit_name = "DP公司";
      formData.value.reader_type = "普通员工";
      formData.value.phone_num = Random.phone();
    }
    function createCard() {
      let nowDate = new Date().toLocaleDateString();
      console.log(nowDate);
      formData.value.create_date = nowDate;
      let jsonData = JSON.stringify(formData.value);
      console.log(jsonData);
      createLibCard(jsonData)
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
          ElMessage.error("创建失败，服务器错误，请联系管理员");
          ElMessage.error(failResponse.statusText);
        });
    }
    function submitForm() {
      CreateCardForm.value.validate((valid) => {
        if (valid) {
          console.log("submit!!");
          createCard();
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
      CreateCardForm,
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
