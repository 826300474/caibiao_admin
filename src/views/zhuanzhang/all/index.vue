<template>
  <div>
    <div style="padding:10px;" class="clearfix">
      <div class="left">
        <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div class="right">
        <el-button type="success" icon="el-icon-refresh" size="medium" @click="shuaxin">刷新</el-button>
      </div>
    </div>
    <el-table
      border
      stripe
      ref="multipleTable"
      :data="myDate"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column prop="id" label="id" align="center"></el-table-column>
      <el-table-column prop="tel" label="接收用户" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="nicheng" label="昵称" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="money" label="金额" align="center"></el-table-column>
      <el-table-column prop="beizhu" label="备注" align="center"></el-table-column>
      <el-table-column prop="create_time" label="创建时间" show-overflow-tooltip align="center"></el-table-column>
      <!-- <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="zhuanzhang(scope.row)">转账</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="prev, pager, next, jumper"
        :total="countNum"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { getAll, getCount } from "@/api/zhuanzhang";
export default {
  data() {
    return {
      input5: "",
      myDate: [],
      countNum: 0,
      multipleSelection: []
    };
  },
  created: function() {
    this.get(1);
    const _self = this;
    getCount()
      .then(response => {
        _self.countNum = Number(response.data);
      })
      .catch(err => {});
  },
  methods: {
    shuaxin: function() {
      this.get(1);
    },
    get: function(page) {
      var code = this.$store.state.user.code;
      const _self = this;
      getAll(code, page)
        .then(response => {
          _self.myDate = response.data;
        })
        .catch(err => {});
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getUser(val);
    }
  }
};
</script>