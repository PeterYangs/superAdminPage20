<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>admin_edit</span>
        </div>
      </template>
      <div>

        <el-form label-width="80px" :model="item" ref="ruleForm" class="super-admin-form">

          <el-form-item label="用户名" required prop='username'>

            <el-input v-if="item.id!==0" placeholder="用户名" v-model="item.username" :disabled="true"></el-input>
            <el-input v-else placeholder="用户名" v-model="item.username"></el-input>

          </el-form-item>


          <el-form-item label="邮箱" prop="email" required>

            <el-input placeholder="邮箱" v-model="item.email"></el-input>

          </el-form-item>


          <el-form-item label="角色" prop="role_id" required>

            <el-select v-model="item.role_id" placeholder="请选择">
              <el-option :label="'超级管理员'" :value="0"></el-option>
              <el-option v-for="item in role_list" :key="item.id" :label="item.title" :value="item.id">
              </el-option>

            </el-select>

          </el-form-item>


          <el-form-item label="密码" prop="password">

            <el-input placeholder="密码" v-model="item.password" type="password"></el-input>

          </el-form-item>


          <el-form-item label="确认密码" prop="repassword">

            <el-input placeholder="确认密码" v-model="item.repassword" type="password"></el-input>

          </el-form-item>


          <el-form-item>
            <el-button type="primary" size="mini" @click="update">提交</el-button>
          </el-form-item>

        </el-form>


      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "admin_edit",
  data() {

    return {
      item: {
        username: "",
        password: "",
        repassword: "",
        email: "",
        role_id: 0,
        id: 0

      },
      role_list: [],
    }
  },
  methods: {

    update() {


      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {

          this.msgBoxAjax("提示", "确认提交吗？", "/admin/admin/registered", this.item).then((re) => {

            if (re.code === 1) {

              this.$router.go(-1);
            }

          })

        } else {

          console.log('error submit!!');
          return false;
        }
      });


    },
    detail(id) {


      this.httpPost({
        url: "/admin/admin/detail/" + id
      }).then((re) => {

        this.setItem(this.item, re.data);

      })

    },
    getRoleList() {

      this.httpGet({
        url: "/admin/admin/getRoleList"
      }).then((re) => {

        this.role_list = re.data;
      })

    }

  },
  created() {

    let id = this.$route.query.id;

    if (id && id != 0) {

      this.detail(id);
    }

    this.getRoleList()

  }
}
</script>

<style scoped>

</style>