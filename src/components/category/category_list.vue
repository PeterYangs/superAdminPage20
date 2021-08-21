<template>

  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>category_list</span>
        </div>
      </template>

      <div>

        <el-button type="success" @click="edit(null)">添加</el-button>
        <el-table :data="list" style="width: 100%">

          <el-table-column prop="id" label="Id">
          </el-table-column>

          <el-table-column label="描述">

            <template v-slot="item">

              <span v-for="v in parseInt(item.row.lv)-1" :key="v+'p'">&nbsp;&nbsp;&nbsp;&nbsp;</span>

              <span v-if="item.row.lv>1">├</span>

              <span>{{ item.row.title }}</span>

            </template>

          </el-table-column>


          <el-table-column label="层级" prop="lv">

          </el-table-column>


          <el-table-column label="操作">

            <template v-slot="item">

              <el-button type="success" size="small" @click="child(item.row.id,item.row.lv)">添加子分类</el-button>
              <el-button type="primary" size="small" @click="edit(item.$index)">编辑</el-button>
              <el-button type="danger" size="small" @click="destroy(item.row.id)">删除</el-button>

            </template>

          </el-table-column>

        </el-table>


      </div>


    </el-card>


    <el-dialog title="提示" v-model="show" width="30%">

      <div>

        <el-form :model="item" ref="formName" label-width="80px">

          <el-form-item label="分类名称" required prop='title'>

            <el-input placeholder="分类名称" v-model="item.title"></el-input>

          </el-form-item>


          <el-form-item label="分类图片">

            <upload @success="changeImg">
              <el-button type="success">上传</el-button>
            </upload>


            <div v-if="item.img" style="margin-top: 10px">
              <el-image :src="getImagePath(item.img)" style="max-width: 200px"></el-image>
            </div>


          </el-form-item>


          <el-form-item label="排序" required prop='sort'>

            <el-input placeholder="排序" v-model="item.sort"></el-input>

          </el-form-item>


          <el-form-item>

            <el-button type="primary" size="small" @click="submit()">提交</el-button>

          </el-form-item>


        </el-form>

      </div>

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
      item: {
        title: "",
        pid: 0,
        img: "",
        sort: 100,
        lv: 0,
        id: 0
      },
      template: {
        title: "",
        pid: 0,
        img: "",
        sort: 100,
        lv: 0,
        id: 0
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

      // console.log(this.list[id])

      this.show = true

      if (id === null) {

        this.item = this.cloneObj(this.template)

      } else {


        this.item = this.cloneObj(this.list[id])

      }


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


    },
    changeImg(re) {

      // console.log(re)

      this.item.img = re;


    },
    submit() {

      this.$refs['formName'].validate((valid) => {

        if (valid) {


          this.msgBoxAjax("提示", "确定提交吗？", "/admin/category/update", this.item).then(() => {


            this.getList();

            this.show = false

          })


        }

      })

    },
    child(pid, lv) {

      this.show = true


      this.item = this.cloneObj(this.template)

      this.item.pid = pid

      this.item.lv = lv

    }

  },
  created() {

    this.getList()
  },
  components: {
    Upload
  }
}
</script>

<style scoped>

</style>