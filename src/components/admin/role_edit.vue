<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>role_edit</span>
        </div>
      </template>
      <div>

        <el-form label-width="80px" :model="item" ref="ruleForm" class="super-admin-form">

          <el-form-item label="角色名称" prop='title' required>

            <el-input placeholder="角色名称" v-model="item.title"></el-input>

          </el-form-item>

          <el-divider></el-divider>


          <el-form-item label="规则选择" prop="rules" required>
            <br/>

            <template v-for="(v,i) in list">
              <div>{{ i }}</div>

              <el-checkbox-group v-model="item.rules">


                <el-checkbox v-for="vv in v" :label="vv.id">{{ vv.title }}</el-checkbox>


              </el-checkbox-group>
            </template>


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
  name: "role_edit",
  data() {

    return {
      item: {
        title: "",
        rules: [],
        id: 0
      },
      list: []
    }
  },
  methods: {

    update() {


      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {

          this.msgBoxAjax("提示", "确认提交吗？", "/admin/role/update", this.item).then((re) => {

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


      this.httpGet({
        url: "/admin/role/detail/" + id
      }).then((re) => {

        this.setItem(this.item, re.data);

      })

    },
    getRuleList() {


      this.httpGet({
        url: "/admin/role/GetRuleList"
      }).then((re) => {

        this.list = re.data;

      })


    }

  },
  created() {

    let id = this.$route.query.id;


    if (id && id != 0) {

      this.detail(id);
    }

    this.getRuleList();

  }
}
</script>

<style scoped>

</style>