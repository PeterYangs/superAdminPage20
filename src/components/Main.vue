<template>
  <el-container style="height: 100vh; border: 1px">
    <el-aside width="300px" style="background-color: #191A23;box-shadow: rgb(0 21 41 / 35%) 2px 0px 6px;">

      <div class="row col row-center col-center" style="margin-top: 15px">
        <h1 style="color: #fff">SuperAdmin</h1>
      </div>

      <el-divider style="margin: 10px 0;"></el-divider>
      <el-menu :default-openeds="['1', '3']" background-color="#191A23" text-color="#fff" active-text-color="#ffd04b">
        <el-submenu index="1">
          <template #title><i class="el-icon-message"></i>管理员</template>

          <el-menu-item index="1-1" @click="toPath('/main/rule_list')">规则列表</el-menu-item>
          <el-menu-item index="1-2" @click="toPath('/main/role_list')">角色列表</el-menu-item>
          <el-menu-item index="1-3" @click="toPath('/main/admin_list')">管理员列表</el-menu-item>


        </el-submenu>

      </el-menu>
    </el-aside>

    <el-container>
      <el-header
          style="text-align: right; font-size: 12px;background-color: #fff;box-shadow: rgb(0 21 41 / 8%) 0px 1px 4px;">
        <span style="margin-right: 10px">{{ info.username }}</span>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <template #dropdown>
            <el-dropdown-menu>
              <!--              <el-dropdown-item>查看</el-dropdown-item>-->
              <!--              <el-dropdown-item>新增</el-dropdown-item>-->
              <el-dropdown-item>注销</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      tableData: Array(20).fill(item),
      info: {
        username: ""
      }
    }
  },
  methods: {

    toPath(url) {

      this.$router.push(url)
    },
    getInfo() {

      this.httpGet({
        url: "/admin/admin/info"
      }).then((re) => {

        this.info = re.data;

      })
    }

  },
  created() {

    this.getInfo()

  }

};
</script>
<style>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>