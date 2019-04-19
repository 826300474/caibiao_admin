<template>
  <div>
    <el-dialog title="转账" :visible.sync="dialogFormVisible" @close="resetForm">
      <el-form :model="form" ref="myForm" :rules="formRules">
        <el-form-item label="接收用户：" :label-width="formLabelWidth" prop="tel">
          <el-input v-model="form.tel" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="转账金额：" :label-width="formLabelWidth" prop="money">
          <el-input v-model="form.money" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="转账类型：" :label-width="formLabelWidth" prop="type">
          <el-input v-model="form.type" autocomplete="off"></el-input>
        </el-form-item>-->
        <!-- <el-form-item label="转账分：" :label-width="formLabelWidth" prop="score">
          <el-input v-model="form.score" autocomplete="off"></el-input>
        </el-form-item>-->
        <el-form-item label="银行密码" :label-width="formLabelWidth" prop="pass">
          <el-input v-model="form.pass" autocomplete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="备注：" :label-width="formLabelWidth" prop="beizhu">
          <el-input v-model="form.beizhu" autocomplete="off"></el-input>
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
import { zhuanZhang } from "@/api/user";
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        tel: "",
        money: "",
        beizhu: "",
        pass: "",
        nicheng:"",
        name:"",
        code: this.$store.state.user.code
      },
      formLabelWidth: "150px",
      formRules: {
        tel: [{ required: true, trigger: "blur", message: "请输入接收ID" }],
        money: [{ required: true, trigger: "blur", message: "请输入金币余额" }],
        type: [{ required: true, trigger: "blur", message: "请输入转账类型" }],
        // score: [{ required: true, trigger: "blur", message: '请输入转账分', }],
        pass: [{ required: true, trigger: "blur", message: "请输入银行密码" }]
      }
    };
  },
  created: function() {
    this.bus.$on("showZhuanzhang", val => {
      this.dialogFormVisible = true;
      this.form.tel = val.tel;
      this.form.nicheng = val.nicheng;
      this.form.name = val.name;
    });
  },
  methods: {
    submitForm() {
      this.$refs.myForm.validate(valid => {
        if (valid) {
          const _self = this;
          zhuanZhang(this.form)
            .then(response => {
              _self.dialogFormVisible = false;
              _self.$message({
                message: response.message,
                type: "success"
              });
            })
            .catch(err => {});
        } else {
          return false;
        }
      });
    },
    resetForm() {
        this.$refs['myForm'].resetFields();
        this.form.tel = '';
        this.form.money = '';
        this.form.beizhu = '';
        this.form.pass = '';
    }
  }
};
</script>