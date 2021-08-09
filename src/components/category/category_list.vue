<template>

  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>category_list</span>
        </div>
      </template>

      <div>

        <el-button type="success" @click="edit(0)">添加</el-button>
        <el-table :data="list" style="width: 100%">
          <el-table-column prop="id" label="Id">
          </el-table-column>


          <el-table-column label="操作">

            <template v-slot="item">

              <el-button type="primary" size="small" @click="edit(item.row.id)">编辑</el-button>
              <el-button type="danger" size="small" @click="destroy(item.row.id)">删除</el-button>

            </template>

          </el-table-column>

        </el-table>


      </div>


    </el-card>


    <el-dialog title="提示" v-model="show" width="30%">

      <div>

        <el-form :model="item">

          <el-form-item label="分类名称" required prop='title'>

            <el-input placeholder="分类名称" v-model="item.title"></el-input>

          </el-form-item>


          <el-form-item label="分类图片">

            <upload>
              <el-button type="success">上传</el-button>
            </upload>

          </el-form-item>


        </el-form>

      </div>

<!--      <template #footer>-->
<!--        <span class="dialog-footer">-->
<!--        <el-button @click="dialogVisible = false">取 消</el-button>-->
<!--        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
<!--        </span>-->
<!--      </template>-->
    </el-dialog>


  </div>

</template>

<script>

import Upload from "../common/Upload.vue";

export default {
  name: "category_list",
  data() {

    return {
      list: [],
      show: false,
      item:{
        title:"",
        pid:0,
        img:""
      }
    }
  },
  methods: {

    getList() {

      this.httpGet({
        url: "/admin/category/list",
        loading: true,
      }).then((re) => {

        this.list = re.data;

      })

    },
    edit(id) {

     this.show=true

    },
    destroy(id) {

      this.msgBoxAjax("提示", "确定删除吗？", "/admin/rule/destroy/" + id).then((re) => {

        if (re.code === 1) {

          this.getList();
        }

      })

    },
    next(page) {


      this.routerSearch(this, {
        p: page
      });


    }

  },
  created() {

    this.getList()
  },
  components:{
    Upload
  }
}
</script>

<style scoped>

</style>