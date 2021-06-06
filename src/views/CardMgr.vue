<template>
  <h1>借阅证管理</h1>
  <el-button
    type="primary"
    plain
    @click="gotoCreateCard"
    style="margin-bottom: 20px"
    >创建借阅证</el-button
  >
  <el-form :inline="true" size="mini" :model="queryData">
    <el-form-item label="借阅证编号:">
      <el-input
        v-model="queryData.card_id"
        placeholder="输入借阅证编号"
      ></el-input>
    </el-form-item>
    <el-form-item label="姓名:">
      <el-input
        v-model="queryData.reader_name"
        placeholder="输入姓名"
      ></el-input>
    </el-form-item>
    <el-form-item label="性别:">
      <el-select v-model="queryData.reader_sex" placeholder="选择性别">
        <el-option label="默认" value=""></el-option>
        <el-option label="男" value="男"></el-option>
        <el-option label="女" value="女"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="身份证号:">
      <el-input
        v-model="queryData.reader_id"
        placeholder="输入身份证号"
      ></el-input>
    </el-form-item>
    <el-form-item label="单位名:">
      <el-input
        v-model="queryData.unit_name"
        placeholder="输入单位名"
      ></el-input>
    </el-form-item>
    <el-form-item label="联系电话:">
      <el-input
        v-model="queryData.phone_num"
        placeholder="输入联系电话"
      ></el-input>
    </el-form-item>
    <el-form-item label="可用状态:">
      <el-select v-model="queryData.available_status" placeholder="可用状态">
        <el-option label="默认" value=""></el-option>
        <el-option label="可用" value="true"></el-option>
        <el-option label="不可用" value="false"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getCard">查询</el-button>
    </el-form-item>
  </el-form>
  <el-table
    border
    :data="cardsData"
    style="width: 100%"
    size="mini"
    align="left"
  >
    <el-table-column prop="card_id" label="借阅证编号" width="280">
    </el-table-column>
    <el-table-column prop="reader_name" label="姓名" align="center">
    </el-table-column>
    <el-table-column prop="reader_sex" label="性别" width="60" align="center">
    </el-table-column>
    <el-table-column prop="reader_id" label="身份证" width="160" align="center">
    </el-table-column>
    <el-table-column prop="unit_name" label="单位"> </el-table-column>
    <el-table-column
      prop="create_date"
      label="办证日期"
      width="100"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="reader_type"
      label="读者类型"
      width="80"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="max_borr"
      label="最大借书数"
      width="100"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="debt_count"
      label="欠款金额"
      width="80"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="phone_num"
      label="联系电话"
      width="120"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="available_status"
      label="可用状态"
      width="80"
      align="center"
    >
      <template #default="scope">
        <el-tag
          size="medium"
          :type="scope.row.available_status ? 'success' : 'danger'"
          >{{ scope.row.available_status ? "可用" : "不可用" }}</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="80" align="center">
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
import { queryLibCard } from "../api/index";
export default {
  setup() {
    const router = useRouter();
    const cardsData = ref([]); //表格数据
    const dataSize = ref(0); //数据总条数
    const queryData = ref({
      card_id: "",
      reader_name: "",
      reader_sex: "",
      reader_id: "",
      unit_name: "",
      reader_type: "",
      phone_num: "",
      available_status: null,
      page: 1,
      size: 10,
    });
    onMounted(() => {
      getCard();
    });
    function handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      queryData.value.size = val;
      getCard();
    }
    function handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      queryData.value.page = val;
      getCard();
    }
    function getCard() {
      let jsonData = JSON.stringify(queryData.value);
      console.log(jsonData);
      queryLibCard(jsonData)
        .then((res) => {
          console.log(res);
          cardsData.value = res.data;
          dataSize.value = res.data_count;
        })
        .catch((failResponse) => {
          console.log(failResponse);
          ElMessage.error("获取信息失败，服务器错误，请联系管理员");
          ElMessage.error(failResponse.statusText);
        });
    }
    function gotoCreateCard() {
      router.push({ path: "/create-card" });
    }
    function deleteCard(index) {
      console.log("删除：", index);
      cardsData.value.splice(index, 1);
    }
    return {
      dataSize,
      queryData,
      cardsData,
      getCard,
      deleteCard,
      gotoCreateCard,
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
