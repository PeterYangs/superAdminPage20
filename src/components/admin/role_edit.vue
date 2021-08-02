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

          <el-form-item label="角色名称" prop='name' required>

            <el-input placeholder="角色名称" v-model="item.name"></el-input>

          </el-form-item>

          <el-divider></el-divider>


          <el-form-item label="规则选择" >
            <br/>

            <div>文章管理</div>

            <el-checkbox-group v-model="item.rules">


              <el-checkbox :label="1">备选项</el-checkbox>
              <el-checkbox :label="2">备选项</el-checkbox>
              <el-checkbox :label="3">备选项</el-checkbox>
              <el-checkbox :label="4">备选项</el-checkbox>
              <el-checkbox :label="5">备选项</el-checkbox>
              <el-checkbox :label="6">备选项</el-checkbox>
              <el-checkbox :label="7">备选项</el-checkbox>


            </el-checkbox-group>


            <div>xx管理</div>

            <el-checkbox-group v-model="item.rules">


              <el-checkbox :label="8">备选项</el-checkbox>
              <el-checkbox :label="9">备选项</el-checkbox>
              <el-checkbox :label="10">备选项</el-checkbox>



            </el-checkbox-group>



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
        name: "",
        rules: []
      }
    }
  },
  methods: {

    update() {


      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {

          this.msgBoxAjax("提示", "确认提交吗？", "/admin/rule/update", this.item).then((re) => {

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
        url: "/admin/rule/detail/" + id
      }).then((re) => {

        this.setItem(this.item, re.data);

      })

    },
    getRuleList(){


      this.httpGet({
        url:"/admin/role/GetRuleList"
      }).then((re)=>{

      })


    }

  },
  created() {

    let id = this.$route.query.id;



    if (id) {

      this.detail(id);
    }

    this.getRuleList();

  }
}
</script>

<style scoped>

</style>