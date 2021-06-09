<template>
  <h1>借阅管理</h1>
  <el-table
    :data="borrInfoData"
    style="width: 100%"
    size="mini"
    align="left"
    border
  >
    <el-table-column prop="book_id" label="图书编号" width="280">
    </el-table-column>
    <el-table-column prop="book_name" label="书名" align="center">
    </el-table-column>
    <el-table-column
      prop="reader_name"
      label="借阅人"
      width="100"
      align="center"
    >
    </el-table-column>
    <el-table-column prop="card_id" label="借阅卡编号" width="280">
    </el-table-column>
    <el-table-column
      prop="renew_num"
      label="续借次数"
      width="100"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="borr_date"
      label="借阅日期"
      width="100"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="due_date"
      label="应还日期"
      width="100"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="return_date"
      label="归还日期"
      width="100"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="return_status"
      label="归还状态"
      width="80"
      align="center"
    >
      <template #default="scope">
        <el-tag
          size="medium"
          :type="scope.row.return_status ? 'success' : 'danger'"
          >{{ scope.row.return_status ? "已还" : "未还" }}</el-tag
        >
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
import { ref } from "vue";
import { queryBorrInfo } from "../api/index";

export default {
  setup() {
    const borrInfoData = ref([]);
    const dataSize = ref(0); //数据总条数
    const queryData = ref({
      book_id: "",
      book_name: "",
      card_id: "",
      reader_name: "",
      return_status: "",
      page: 1,
      size: 10,
    });
    onMounted(() => {
      getBorrInfo();
    });
    function handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      queryData.value.size = val;
      getBorrInfo();
    }
    function handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      queryData.value.page = val;
      getBorrInfo();
    }
    function getBorrInfo() {
      let jsonData = JSON.stringify(queryData.value);
      console.log(jsonData);
      queryBorrInfo(jsonData)
        .then((res) => {
          console.log(res);
          borrInfoData.value = res.data;
          dataSize.value = res.data_count;
        })
        .catch((failResponse) => {
          console.log(failResponse);
          ElMessage.error("获取信息失败，服务器错误，请联系管理员");
          ElMessage.error(failResponse.statusText);
        });
    }
    return {
      dataSize,
      queryData,
      borrInfoData,
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
