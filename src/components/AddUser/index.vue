<template>
  <div>
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible" @close="resetForm">
      <el-form :model="form" :rules="formRules" ref="myForm">
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="tel">
          <el-input type="tel" v-model="form.tel" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="登陆密码" :label-width="formLabelWidth" prop="pass">
          <el-input v-model="form.pass" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth" prop="nicheng">
          <el-input v-model="form.nicheng" autocomplete="off" clearable></el-input>
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
import { addUser } from "@/api/user";
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        tel: "",
        pass: "",
        name: "",
        nicheng: "",
        daili:this.$store.state.user.code
      },
      formLabelWidth: "100px",
      formRules: {
        tel: [{ required: true, trigger: "blur", message: "请输入用户名" }],
        pass: [{ required: true, trigger: "blur", message: "请输入密码" }],
        name: [{ required: true, trigger: "blur", message: "请输入真实姓名" }]
      }
    };
  },
  created: function() {
    this.bus.$on("showAddUser", val => {
      this.dialogFormVisible = true;
    });
  },
  methods: {
    submitForm() {
      const _self = this;
      this.$refs.myForm.validate(valid => {
        if (valid) {
          addUser(this.form)
            .then(response => {
              _self.dialogFormVisible = false;
              _self.$message({
                message: "添加用户成功",
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
      // this.$refs.myForm.resetFields();
    }
  }
};
</script>