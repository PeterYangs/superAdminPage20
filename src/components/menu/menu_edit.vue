<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>menu_edit</span>
        </div>
      </template>
      <div>

        <el-form label-width="80px" :model="item" ref="ruleForm" class="super-admin-form">

          <el-form-item label="父级菜单" required prop='pid'>

            <el-select v-model="item.pid" placeholder="请选择">

              <el-option :value="0" label="栏目菜单"></el-option>

              <el-option v-for="item in pids" :key="item.id" :label="item.title" :value="item.id">
              </el-option>

            </el-select>

          </el-form-item>


          <el-form-item label="菜单名称" required prop="title">

            <el-input placeholder="菜单名称" v-model="item.title"></el-input>

          </el-form-item>




            <el-form-item label="路径" required prop="path" v-if="item.pid!==0">

              <el-input placeholder="路径" v-model="item.path"></el-input>

            </el-form-item>

          <el-form-item label="路径"  prop="path" v-if="item.pid===0">

            <el-input placeholder="路径" v-model="item.path"></el-input>

          </el-form-item>




          <el-form-item label="排序" required prop="sort">

            <el-input placeholder="排序" v-model="item.sort"></el-input>

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
  name: "menu_edit",
  data() {

    return {
      item: {
        pid: "",
        title: "",
        path: "",
        sort: 100,
        id: 0
      },
      pids: []
    }
  },
  methods: {

    update() {


      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {

          this.msgBoxAjax("提示", "确认提交吗？", "/admin/menu/update", this.item).then((re) => {

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
        url: "/admin/menu/detail/" + id
      }).then((re) => {

        this.setItem(this.item, re.data);

      })

    },
    getPids() {

      this.httpGet({
        url: "/admin/menu/getFatherMenu"
      }).then((re) => {

        this.pids = re.data;

      })


    }

  },
  created() {

    let id = this.$route.query.id;

    if (id && id != 0) {

      this.detail(id);
    }

    this.getPids()

  }
}
</script>

<style scoped>

</style>