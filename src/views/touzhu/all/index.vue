<template>
  <el-table :data="tableData" border stripe style="width: 100%">
    <el-table-column label="玩法" align="center">
      <template slot-scope="scope">
        <el-tag :type="scope.row.type === '足球'?'success':'danger'">{{scope.row.type}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="username" label="发起人" align="center"></el-table-column>
    <el-table-column prop="daili" label="代理id" align="center"></el-table-column>
    <el-table-column prop="id" label="id" align="center"></el-table-column>
    <el-table-column prop="bei" label="投注倍数" align="center"></el-table-column>
    <!-- <el-table-column prop="con" label="客队" align="center"></el-table-column> -->
    <el-table-column prop="money" label="金额" align="center"></el-table-column>
    <el-table-column prop="chuan" label="投注" align="center"></el-table-column>
    <el-table-column prop="state" label="状态" align="center"></el-table-column>
    <el-table-column prop="jiangjin" label="奖金" align="center"></el-table-column>
    <el-table-column prop="create_time" label="时间" align="center"></el-table-column>
  </el-table>
</template>
<script>
import { getAll, getCount } from "@/api/buy";
export default {
  data() {
    return {
      tableData: [],
      code: this.$store.state.user.code
    };
  },
  created: function() {
    this.get(1);
    const _self = this;
    getCount(this.code)
      .then(response => {
        _self.countNum = Number(response.data);
      })
      .catch(err => {});
  },
  methods: {
    get: function(page) {
      var code = this.$store.state.user.code;
      const _self = this;
      getAll(code, page)
        .then(response => {
          var data = response["data"];
          for (let i = 0; i < data.length; i++) {
            data[i]["jiangjin"] = data[i]["jiangjin"] + "(" + data[i]["freeze"] + ")";
            if (data[i]["state"] == 0) {
              data[i]["state"] = "未开奖";
            } else if (data[i]["state"] == 1) {
              data[i]["state"] = "未中奖";
            } else if (data[i]["state"] == 2) {
              data[i]["state"] = "已中奖";
            };
            if (data[i]["type"] == 0) {
              data[i]["type"] = "足球";
            } else if (data[i]["type"] == 1) {
              data[i]["type"] = "篮球";
            };
            var maths = JSON.parse(response["data"][0]["con"]);
          }
          _self.tableData = data;
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped>
</style>

