<template>
  <el-descriptions title="借阅卡信息" :column="2" border style="width: 80%">
    <el-descriptions-item>
      <template #label>
        <i class="el-icon-user"></i>
        持卡人姓名
      </template>
      {{ cardContent.reader_name }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <i class="el-icon-location-outline"></i>
        性别
      </template>
      {{ cardContent.reader_sex }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <i class="el-icon-mobile-phone"></i>
        联系电话
      </template>
      {{ cardContent.phone_num }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <i class="el-icon-tickets"></i>
        可用状态
      </template>
      <el-tag
        size="small"
        :type="cardContent.available_status ? 'success' : 'danger'"
        >{{ cardContent.available_status ? "可用" : "不可用" }}</el-tag
      >
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <i class="el-icon-office-building"></i>
        已借书数
      </template>
      0
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <i class="el-icon-office-building"></i>
        最大借书数
      </template>
      {{ cardContent.max_borr }}
    </el-descriptions-item>
  </el-descriptions>
  <h5>{{ "Debug card_id:" + card_id }}</h5>
</template>

<script>
import { onUpdated } from "@vue/runtime-core";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { queryLibCard } from "../api/index";
export default {
  props: { card_id: String },
  setup(props, context) {
    const cardContent = ref({
      reader_name: "",
      reader_sex: "",
      reader_id: "",
      reader_type: "",
      unit_name: "",
      phone_num: "",
      max_borr: "",
      available_status: true,
    });
    onUpdated(() => {
      console.log("Card Descriptions Update!", props.card_id);
      sendStatusBack();
      getCard();
    });
    function getCard() {
      let jsonData = JSON.stringify({
        card_id: props.card_id,
        size: 1,
        page: 1,
      });
      console.log(jsonData);
      queryLibCard(jsonData)
        .then((res) => {
          console.log(res);
          if (res.data.length > 0) {
            cardContent.value = res.data[0];
            ElMessage.success("查询成功");
          } else {
            ElMessage.error("查无此人");
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
      cardContent,
    };
  },
};
</script>
