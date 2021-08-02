<template>

  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>规则编辑</span>
        </div>
      </template>

      <div>

        <el-button type="success" @click="edit(0)">添加规则</el-button>
        <el-table :data="list.data" style="width: 100%">
          <el-table-column prop="id" label="Id">
          </el-table-column>

          <el-table-column prop="title" label="描述">
          </el-table-column>

          <el-table-column prop="rule" label="规则">
          </el-table-column>

          <el-table-column prop="group_name" label="分组">
          </el-table-column>

          <el-table-column label="操作">

            <template v-slot="item">

              <el-button type="primary" size="small" @click="edit(item.row.id)">编辑</el-button>
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
export default {
  name: "rule_list",
  data() {

    return {
      list: {}
    }
  },
  methods: {

    getList() {

      this.httpGet({
        url: "/admin/rule/list",
        loading: true,
        params: this.$route.query,
      }).then((re) => {

        this.list = re.data;

      })

    },
    edit(id) {

      this.$router.push({
        path: "/main/rule_edit",
        query: {id: id}
      })

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
  }
}
</script>

<style scoped>

</style>