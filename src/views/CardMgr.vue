<template>
  <h1>借阅证管理</h1>
  <el-button
    type="primary"
    plain
    @click="gotoCreateCard"
    style="margin-bottom: 20px"
    >创建借阅证</el-button
  >
  <el-table
    :data="cardsData"
    style="width: 100%"
    max-height="700"
    size="mini"
    align="center"
  >
    <el-table-column fixed prop="card_id" label="借阅证编号" width="300">
    </el-table-column>
    <el-table-column prop="reader_name" label="姓名" width="100">
    </el-table-column>
    <el-table-column prop="reader_sex" label="性别" width="100">
    </el-table-column>
    <el-table-column prop="reader_id" label="身份证" width="200">
    </el-table-column>
    <el-table-column prop="unit_name" label="单位" width="200">
    </el-table-column>
    <el-table-column prop="create_date" label="办证日期" width="120">
    </el-table-column>
    <el-table-column prop="reader_type" label="读者类型" width="120">
    </el-table-column>
    <el-table-column prop="max_borr" label="最大借书数" width="80">
    </el-table-column>
    <el-table-column prop="debt_count" label="欠款金额" width="120">
    </el-table-column>
    <el-table-column prop="phone_num" label="联系电话" width="120">
    </el-table-column>
    <el-table-column prop="available_status" label="可用状态" width="120">
      <template #default="scope">
        <el-tag
          size="medium"
          :type="scope.row.available_status ? 'success' : 'danger'"
          >{{ scope.row.available_status ? "可用" : "不可用" }}</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="80">
      <template #default="scope">
        <el-button
          @click.prevent="deleteCard(scope.$index)"
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
    const cardsData = ref(null);
    onMounted(() => {
      var Mock = require("mockjs");
      var Random = Mock.Random;
      //扩展函数：手机号生成
      Mock.Random.extend({
        phone: function () {
          var phonePrefixs = ["138", "187", "189"]; // 自己写前缀哈
          return this.pick(phonePrefixs) + Mock.mock(/\d{8}/); //Number()
        },
      });
      console.log("onMounted");
      let mockData = [];
      let size = 50;
      for (let i = 0; i <= size; i++) {
        console.log(Random.date());
        let mockCard = {
          card_id: Random.guid(),
          reader_name: Random.cname(),
          reader_sex: Random.string("男女", 1, 1),
          reader_id: Random.id(),
          unit_name: "DP公司",
          create_date: Random.date(),
          reader_type: "普通员工",
          max_borr: 3,
          debt_count: 0.0,
          phone_num: Random.phone(),
          available_status: Random.boolean(),
        };
        mockData.push(mockCard);
      }
      cardsData.value = mockData;
    });
    function gotoCreateCard() {
      router.push({ path: "/" });
    }
    function deleteCard(index) {
      console.log("删除：", index);
      cardsData.value.splice(index, 1);
    }
    return {
      cardsData,
      deleteCard,
      gotoCreateCard,
    };
  },
};
</script>

<style>
.el-table {
  background: rgb(228, 189, 117);
}
</style>
