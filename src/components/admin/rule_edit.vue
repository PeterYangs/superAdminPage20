<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>规则编辑</span>
        </div>
      </template>
      <div>

        <el-form style="width: 40%" label-width="80px" :model="item" ref="formName">

          <el-form-item label="描述" required prop="title">

            <el-input placeholder="描述" v-model="item.title"></el-input>

          </el-form-item>


          <el-form-item label="路由规则" required prop="rule">

            <el-input placeholder="路由规则" v-model="item.rule"></el-input>

          </el-form-item>


          <el-form-item label="分组名称">

            <el-input placeholder="分组名称" v-model="item.group_name"></el-input>

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
  name: "index",
  data() {

    return {
      item: {
        title: "",
        rule: "",
        group_name: "",
        id: ""
      }
    }
  },
  methods: {

    update() {



      this.$refs['formName'].validate((valid) => {
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

    }

  },
  created() {

    let id = this.$route.query.id;

    if (id&&id!=0) {

      this.detail(id);
    }

  }
}
</script>

<style scoped>

</style>