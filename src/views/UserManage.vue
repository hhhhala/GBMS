<template>
  <div class="manage">
    <div class="manage-header">
      <!-- 新增按钮 -->
      <el-button style="margin:10px 00px" type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
      <!-- 搜索框 -->
      <el-form :inline="true" :model="userForm">
        <el-form-item >
          <el-input v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 对话框 -->
    <el-dialog
      :title="iftitile === 0? '新增用户' : '更新用户'"
      :visible.sync="dialogFormVisible"
      width="50%"
      :before-close="handleClose">
      <!-- 表单 -->
      <el-form :model="form" label-width="80px" ref="form" :inline="true" :rules="rules">
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.birth" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 用户列表 -->
    <el-table :data="userData" style="width: 100%" height="70%">
      <el-table-column prop="name" label="名字"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="sex" label="性别">
        <!-- 自定义列 -->
        <template slot-scope="scope">
          <span>{{scope.row.sex == 0? '女' : '男'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="birth" label="出生日期"></el-table-column>
      <el-table-column prop="addr" label="地址"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination layout="prev, pager, next" :total="total" @current-change="changepage" style="float:right; margin:20px"></el-pagination>
    </div>
  </div>
</template>
  
<script>
import { getUser, addDate, delDate, osDate } from "@/api";
export default {
  data() {
    return {
      // 对话框状态
      dialogFormVisible: false,
      // form表单数据
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: ""
      },
      // form表单 输入规则
      // required:必填项  message:提示语  trigeer:blur-失去焦点时触发、change-更新数据时触发、hover-
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        birth: [{ required: true, message: "请选择时间", trigger: "change" }],
        addr: [{ required: true, message: "请输入地址", trigger: "blur" }]
      },
      userData: [], // 获取到的用户数据列表
      iftitile: 0, // 为0=新增用户  1=更新用户
      total: 0,    // 列表总条数
      pageData: {
        page: 1,
        limit: 10,
      },
      userForm:{
        name:''
      },
    };
  },
  methods: {
    // 弹窗确定按钮事件
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 保存数据至数据库
          if (this.iftitile === 0) {
            addDate(this.form).then(() => {
              this.getUser();
            });
          } else {
            osDate(this.form).then(() => {
              this.getUser();
            });
          }
          this.form = {};
          this.$refs.form.resetFields(); // 清空重置数据
          this.dialogFormVisible = false; // 关闭弹窗
        }
      });
    },
    // 弹窗右上角的叉
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.form = {};
          this.$refs.form.resetFields();
          done();
        })
        .catch(_ => {});
    },
    // 封装用户数据
    getUser() {
      // 获取列表的数据
      getUser({params: {...this.userForm, ...this.pageData}}).then(({ data: res }) => {
        this.userData = res.list;
        this.total = res.count || 0
      });
    },
    // 换页功能
    changepage(val) {
      this.pageData.page = val;
      this.getUser()
    },
    onSubmit() {
      this.getUser()
    },
    // 取消按钮
    cancel() {
      this.form = {};
      this.$refs.form.resetFields(); // 清空数据
      this.dialogFormVisible = false; // 关闭
    },
    // 新增按钮
    handleAdd() {
      this.iftitile = 0;
      this.dialogFormVisible = true;
    },
    // 编辑按钮
    handleEdit(row) {
      this.iftitile = 1;
      this.dialogFormVisible = true;
      this.form = JSON.parse(JSON.stringify(row));
    },
    // 删除按钮
    handleDelete(row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delDate({ id: row.id }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getUser();
          });
          console.log(row);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
          console.log(row);
        });
    }
  },
  mounted() {
    // 页面渲染结束后调用 获取数据列表
    this.getUser();
  }
};
</script>
  
<style scoped>
.manage {
  height: 90%;
}
.manage-header{
  display:flex;
  align-items: center;
  justify-content: space-between;

}
</style>
  