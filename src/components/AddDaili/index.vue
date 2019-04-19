<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" @close="resetForm">
      <el-form :model="form" :rules="formRules" ref="myForm">
        <!-- <el-form-item label="所属" :label-width="formLabelWidth" prop="daili">
          <el-input v-model="form.daili" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>-->
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="tel">
          <el-input v-model="form.tel" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="tel">
          <el-input v-model="form.name" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth" prop="nicheng">
          <el-input v-model="form.nicheng" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" prop="beizhu">
          <el-input v-model="form.beizhu" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="登录密码" :label-width="formLabelWidth" prop="loginpass">
          <el-input v-model="form.loginpass" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="银行密码" :label-width="formLabelWidth" prop="bankpass">
          <el-input v-model="form.bankpass" autocomplete="off" clearable></el-input>
        </el-form-item>
        <!-- <el-form-item label="联系电话" :label-width="formLabelWidth" prop="tel">
          <el-input v-model="form.tel" autocomplete="off" clearable></el-input>
        </el-form-item>-->
        <el-form-item label="下单退佣" :label-width="formLabelWidth" prop="touzhubili">
          <el-input v-model="form.touzhubili" autocomplete="off" clearable>
            <template slot="append">%(≤5%)</template>
          </el-input>
        </el-form-item>
        <el-form-item label="跟投退佣" :label-width="formLabelWidth" prop="gendanbili">
          <el-input v-model="form.gendanbili" autocomplete="off" clearable>
            <template slot="append">%(≤5%)</template>
          </el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-radio-group v-model="form.state">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="提现权限" :label-width="formLabelWidth">
          <el-radio-group v-model="form.tixian">
            <el-radio :label="1">允许</el-radio>
            <el-radio :label="0">禁止</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm">重 置</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addUser, xiuGai } from "@/api/daili";
export default {
  data() {
    const validatetouzhubili = (rule, value, callback) => {
      if (value) {
        if (value < 0 || value > 5) {
          callback(new Error("下单退佣必须大于0且小于等于5"));
        } else {
          callback();
        }
      } else {
        callback(new Error("请输入下单退佣"));
      }
    };
    const validategendanbili = (rule, value, callback) => {
      if (value) {
        if (value < 0 || value > 5) {
          callback(new Error("跟投退佣必须大于0且小于等于5"));
        } else {
          callback();
        }
      } else {
        callback(new Error("请输入跟投退佣"));
      }
    };
    return {
      dialogFormVisible: false,
      form: {
        daili: "",
        name: "",
        tel: "",
        nicheng: "",
        beizhu: "",
        loginpass: "",
        bankpass: "",
        touzhubili: "5",
        gendanbili: "5",
        state: 1,
        tixian: 1
      },
      formLabelWidth: "100px",
      formRules: {
        tel: [{ required: true, trigger: "blur", message: "请输入手机号" }],
        nicheng: [{ required: true, trigger: "blur", message: "请输入昵称" }],
        beizhu: [{ required: true, trigger: "blur", message: "请输入备注" }],
        loginpass: [
          { required: true, trigger: "blur", message: "请输入登录密码" }
        ],
        bankpass: [
          { required: true, trigger: "blur", message: "请输入银行密码" }
        ],
        touzhubili: [
          { required: true, trigger: "blur", validator: validatetouzhubili }
        ],
        gendanbili: [
          { required: true, trigger: "blur", validator: validategendanbili }
        ]
      },
      xiugai: false,
      title: ""
    };
  },
  created: function() {
    this.bus.$on("showAddDaili", val => {
      this.dialogFormVisible = true;
      if (val) {
        this.xiugai = true;
        var data = this.form;
        for (var i in data) {
          this.form[i] = val[i];
        }
        this.title = "修改代理信息";
      } else {
        this.xiugai = false;
        this.form.daili = this.$store.state.user.code;
        this.title = "添加代理";
      }
    });
  },
  methods: {
    submitForm() {
      this.$refs.myForm.validate(valid => {
        if (valid) {
          const _self = this;
          if (_self.xiugai) {
            xiuGai(this.form)
              .then(response => {
                _self.dialogFormVisible = false;
                _self.$message({
                  message: response.message,
                  type: "success"
                });
              })
              .catch(err => {});
          } else {
            addUser(this.form)
              .then(response => {
                _self.dialogFormVisible = false;
                _self.$message({
                  message: response.message,
                  type: "success"
                });
              })
              .catch(err => {});
          }
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$refs['myForm'].resetFields();
      this.form.daili = "";
      this.form.name = "";
      this.form.tel = "";
      this.form.nicheng = "";
      this.form.beizhu = "";
      this.form.loginpass = "";
      this.form.bankpass = "";
      this.form.touzhubili = "5";
      this.form.gendanbili = "5";
      this.form.state = 1;
      this.form.tixian = 1;
    }
  }
};
</script>