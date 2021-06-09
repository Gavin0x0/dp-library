<template>
  <h1>罚款管理</h1>
  <el-table
    :data="fineData"
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
      prop="need_pay"
      label="应缴金额"
      width="100"
      align="center"
    >
    </el-table-column>
    <el-table-column prop="paid_in" label="实缴金额" width="100" align="center">
    </el-table-column>
    <el-table-column
      prop="return_status"
      label="处理状态"
      width="80"
      align="center"
    >
      <template #default="scope">
        <el-tag
          size="medium"
          :type="scope.row.handle_status ? 'success' : 'danger'"
          >{{ scope.row.handle_status ? "已缴" : "未缴" }}</el-tag
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
import { queryFineInfo } from "../api/index";

export default {
  setup() {
    const fineData = ref([]);
    const dataSize = ref(0); //数据总条数
    const queryData = ref({
      book_id: "",
      book_name: "",
      card_id: "",
      reader_name: "",
      borr_date: "",
      due_date: "",
      page: 1,
      size: 10,
    });
    onMounted(() => {
      getFineInfo();
    });
    function handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      queryData.value.size = val;
      getFineInfo();
    }
    function handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      queryData.value.page = val;
      getFineInfo();
    }
    function getFineInfo() {
      let jsonData = JSON.stringify(queryData.value);
      console.log(jsonData);
      queryFineInfo(jsonData)
        .then((res) => {
          console.log(res);
          fineData.value = res.data;
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
      fineData,
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
