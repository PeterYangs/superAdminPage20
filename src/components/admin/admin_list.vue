<template>

  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>admin_list</span>
        </div>
      </template>

      <div>

        <el-button type="success" @click="edit(0)">添加管理员</el-button>


        <search v-model="params">

          <template v-slot="scope">

            <el-input v-model="scope.row.username" placeholder="管理员名称" clearable></el-input>


            <auth rule="/admin/admin/roleList">
              <el-select v-model="scope.row.role_id" placeholder="角色" clearable>
                <el-option label="超级管理员" value="0"></el-option>
                <el-option v-for="(v,i) in role_list" :key="'role_list'+i" :label="v.title" :value="v.id"></el-option>
              </el-select>
            </auth>

          </template>

        </search>

        <el-table :data="list.data" style="width: 100%">
          <el-table-column prop="id" label="Id">
          </el-table-column>

          <el-table-column prop="username" label="用户名">
          </el-table-column>

          <el-table-column prop="role_detail.role.title" label="角色">

            <template v-slot="item">

              <span v-if="getObj(item.row,'role_detail.role_id')===0">超级管理员</span>
              <span v-else>{{ getObj(item.row, 'role_detail.role.title') }}</span>

            </template>

          </el-table-column>


          <el-table-column prop="created_at" label="创建时间">
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

import Search from "../common/Search.vue";
import Auth from "../common/Auth.vue";

export default {
  name: "admin_list",
  data() {

    return {
      list: {},
      params: {
        username: "",
        role_id: ""
      },
      role_list: [],

    }
  },
  methods: {

    getList() {

      this.httpPost({
        url: "/admin/admin/list",
        loading: true,
        params: this.$route.query,
      }).then((re) => {

        this.list = re.data;

      })

    },
    edit(id) {

      this.$router.push({
        path: "/main/admin_edit",
        query: {id: id}
      })

    },
    destroy(id) {

      this.msgBoxAjax("提示", "确定删除吗？", "/admin/admin/destroy/" + id).then((re) => {

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
    getRoleList() {

      this.httpPost({
        url: "/admin/admin/roleList",

      }).then((re) => {

        this.role_list = re.data;

      })

    },

  },
  created() {


    this.getList()


    this.auth("/admin/admin/roleList").then(() => {

      this.getRoleList()

    })


  },
  components: {
    Search,
    Auth
  }
}
</script>

<style scoped>

</style>