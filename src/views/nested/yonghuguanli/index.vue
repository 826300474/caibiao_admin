<template>
  <div>
    <addUser/>
    <transfer/>
    <div style="padding:10px;" class="clearfix">
      <div class="left">
        <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div class="right">
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          size="medium"
          @click="addUser"
        >新增</el-button>
        <el-button
          type="success"
          icon="el-icon-refresh"
          size="medium"
          @click="shuaxin"
        >刷新</el-button>
      </div>
    </div>
    <el-table
      border
      stripe
      ref="multipleTable"
      @cell-click="gogo"
      :data="myDate"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="daili" label="代理昵称" align="center"></el-table-column>
      <el-table-column prop="id" label="用户ID" align="center"></el-table-column>
      <el-table-column prop="tel" label="用户名" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="nicheng" label="昵称" align="center"></el-table-column>
      <el-table-column prop="name" label="真实姓名" align="center"></el-table-column>
      <el-table-column prop="money" label="余额" align="center"></el-table-column>
      <el-table-column prop="freeze" label="冻结金额" align="center"></el-table-column>
      <!-- <el-table-column prop="zongfen" label="总分" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="gamefen" label="游戏分" align="center"></el-table-column>
      <el-table-column prop="bankfen" label="银行分" align="center"></el-table-column>
      <el-table-column prop="xiaxian" label="下线" show-overflow-tooltip align="center"></el-table-column> -->
      <el-table-column prop="ip" label="登录地址" align="center"></el-table-column>
      <el-table-column prop="orgin" label="来源" show-overflow-tooltip align="center"></el-table-column>
      <!-- <el-table-column prop="state" label="状态" align="center"></el-table-column> -->
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="zhuanzhang(scope.row)">转账</el-button>
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
import AddUser from "@/components/AddUser";
import Transfer from "@/components/Transfer";
import { getAll, getCount } from "@/api/user";
export default {
  components: {
    AddUser,
    Transfer
  },
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
    shuaxin:function(){
      this.get(1);
    },
    gogo: function(row, column, cell, event) {
      // alert(row.tel);
    },
    zhuanzhang:function(con){
      var data = con;
      this.bus.$emit("showZhuanzhang", data);
    },
    addUser: function() {
      this.bus.$emit("showAddUser", true);
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