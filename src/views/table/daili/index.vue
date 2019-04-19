<template>
  <div>
    <addDaili/>
    <div style="padding:10px;" class="clearfix">
      <div class="left">
        <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div class="right">
        <el-button type="primary" icon="el-icon-circle-plus-outline" size="medium" @click="addUser">新增</el-button>
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
      @selection-change="handleSelectionChange"
    >
      <el-table-column prop="tel" label="账号" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="nicheng" label="昵称" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="money" label="金额" align="center"></el-table-column>
      <el-table-column prop="touzhubili" label="投注退佣比例" align="center"></el-table-column>
      <el-table-column prop="touzhu" label="投注退佣" align="center"></el-table-column>
      <el-table-column prop="gendanbili" label="跟单退佣比例" align="center"></el-table-column>
      <el-table-column prop="gendan" label="跟单退佣" align="center"></el-table-column>
      <el-table-column prop="zhancheng" label="占成" align="center"></el-table-column>
      <!-- <el-table-column prop="xianxia" label="代理下线" align="center"></el-table-column> -->
      <el-table-column prop="huiyuan" label="会员" align="center"></el-table-column>
      <!-- <el-table-column prop="ip" label="登录" align="center"></el-table-column> -->
      <el-table-column prop="state" label="状态" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="xiuGai(scope.row)" type="text" size="small">设置</el-button>
        </template>
      </el-table-column>
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
import AddDaili from "@/components/AddDaili";
import { getAll, getCount } from "@/api/daili";
export default {
  components: {
    AddDaili
  },
  data() {
    return {
      input5:"",
      myDate: [],
      countNum: 0,
      multipleSelection: [],
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
    shuaxin:function(){
      this.get(1);
    },
    xiuGai: function(data) {
      var con = data;
      this.bus.$emit("showAddDaili", con);
    },
    addUser: function() {
      this.bus.$emit("showAddDaili");
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
      this.get(val);
    }
  }
};
</script>