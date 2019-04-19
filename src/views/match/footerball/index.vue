<template>
  <el-table :data="tableData" border stripe style="width: 100%">
    <el-table-column prop="time" label="场次" align="center"></el-table-column>
    <el-table-column prop="type" label="赛事" align="center"></el-table-column>
    <el-table-column prop="zhu" label="主队(让球)" align="center"></el-table-column>
    <el-table-column prop="ke" label="客队" align="center"></el-table-column>
    <el-table-column prop="bifen" label="比分" align="center"></el-table-column>
    <el-table-column prop="banchang" label="半场" align="center"></el-table-column>
    <el-table-column prop="rangqiu" label="让球胜平负" align="center"></el-table-column>
    <el-table-column prop="feirangs" label="胜平负" align="center"></el-table-column>
    <el-table-column prop="zhongjinqie" label="总进球数" align="center"></el-table-column>
    <el-table-column prop="banquanchang" label="半全场" align="center"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="danger" @click="handleEdit(scope.$index)">开奖</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { getFooter } from "@/api/match";
export default {
  data() {
    return {
      tableData: []
    };
  },
  created: function() {
    const _self = this;
    getFooter(this.code)
      .then(response => {
        var data = response["data"];
        for (let i = 0; i < data.length; i++) {
          data[i]["time"] = data[i]["time"][0] + " " + data[i]["time"][1];
          data[i]["zhu"] = data[i]["zhu"][0] + "(" + data[i]["zhu"][1];
        }
        _self.tableData = data;
      })
      .catch(err => {});
  },
  methods: {
    handleEdit: function(index, row) {
      var data = this.tableData[index];
      var that = this;
      // var time = data.time.split(' ')[0];
      $.ajax({
        type: "POST",
        url: "http://localhost/public/admin/match/openjiang",
        dataType: "json",
        data: {
          ke: data.ke,
          changchi: data.time,
          banquanchang: data.banquanchang,
          zhongjinqie: data.zhongjinqie,
          bifen: data.bifen,
          rangqiu: data.rangqiu,
          feirangs: data.feirangs
        },
        success: function(response) {
          if (response.status == 1) {
            that.$message({
              message: response["message"],
              type: "success"
            });
          }
        },
        error: function(error) {}
      });
    }
  }
};
</script>