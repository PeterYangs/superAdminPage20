<template>

  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>文件管理</span>
        </div>
      </template>

      <div>


        <big-file @success="success" :max-size="1073741824"></big-file>

        <el-table :data="list.data" style="width: 100%">
          <el-table-column prop="id" label="Id">
          </el-table-column>


          <el-table-column prop="name" label="文件名称">
          </el-table-column>

          <el-table-column prop="path" label="文件地址">
          </el-table-column>

          <el-table-column label="文件大小">

            <template v-slot="item">
              {{ (item.row.size / (1024 * 1024)).toFixed(3) + "M" }}
            </template>

          </el-table-column>

          <el-table-column prop="admin.username" label="上传者">
          </el-table-column>


          <el-table-column label="操作">

            <template v-slot="item">

              <el-button type="primary" size="small" @click="edit(item.row)">下载</el-button>
              <el-button type="danger" size="small" @click="destroy(item.row.id)">删除</el-button>

            </template>

          </el-table-column>

        </el-table>

        <div style="margin-top: 20px">
          <el-pagination
              @current-change="next"
              :page-size="list.size"
              background
              :current-page="list.page"
              layout="total,prev, pager, next,jumper"
              :total="list.total">
          </el-pagination>
        </div>

      </div>


    </el-card>
  </div>

</template>

<script>

import BigFile from "../common/BigFile.vue";

export default {
  name: "file_list",
  data() {

    return {
      list: {}
    }
  },
  methods: {

    getList() {

      this.httpPost({
        url: "/admin/file/list",
        loading: true,
        params: this.$route.query,
      }).then((re) => {

        this.list = re.data;

      })

    },
    edit(item) {


      window.open(this.getEnv("imgHost")+"/"+item.path)

    },
    destroy(id) {

      this.msgBoxAjax("提示", "确定删除吗？", "/admin/file/destroy/" + id).then((re) => {

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
    success(path) {


      this.httpPost({
        url: "/admin/file/update",
        data: path,
        loading: true,
      }).then((re) => {


        this.getList()


      })

    }


  },
  created() {

    this.getList()
  },
  components: {
    BigFile
  }
}
</script>

<style scoped>

</style>