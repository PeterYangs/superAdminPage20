<template>
  <el-container style="height: 100vh; border: 1px">

    <el-aside width="300px" style="background-color: #191A23;box-shadow: rgb(0 21 41 / 35%) 2px 0px 6px;">

      <div class="row col row-center col-center" style="margin-top: 15px">
        <h1 style="color: #fff" @click="$router.push('/main/home')" class="pointer">SuperAdmin</h1>
      </div>


      <el-divider style="margin: 10px 0;"></el-divider>
      <el-menu v-if="showMenu" :default-active="index" background-color="#191A23" text-color="#fff"
               active-text-color="#ffd04b">


        <el-menu-item-group v-for="(v,i) in menuTree" :index="i+''">

          <template #title><i class="el-icon-message"></i>{{ v.title }}</template>

          <el-menu-item :class="[$route.path===vv.path?'menu-on':'menu']" v-for="(vv,ii) in v.children"
                        :index="i+'-'+ii" @click="toPath(vv.path)">{{ vv.title }}
          </el-menu-item>


        </el-menu-item-group>

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

              <el-dropdown-item @click="logout()">注销</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

      </el-header>

      <el-main>
        <router-view v-if="show"></router-view>
      </el-main>
    </el-container>


  </el-container>
</template>

<script>

import {ElNotification} from 'element-plus'


export default {
  data() {

    return {
      // tableData: Array(20).fill(item),
      info: {
        username: ""
      },
      menu: [],
      show: true,
      ws: null,
      timeId: null,
      reConnect: false,
      // index: [],
      // showMenu: false
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
    },
    getMenu() {

      this.httpPost({
        url: "/admin/admin/getMyMenu",
        loading: true,
      }).then((re) => {

        this.menu = re.data;

      }).catch(() => {

      })

    },
    logout() {

      this.httpPost({
        url: "/login/logout"
      }).then(() => {

        this.$router.push("/login")

      })

    },
    log(item) {


      console.log(this.getObj(item, ''))

    },
    reload() {


      this.show = false

      this.$nextTick(() => {

        this.show = true

      });

    },
    getAllRule() {

      this.httpGet({
        url: "/admin/admin/getAllRule"
      }).then((re) => {


        this.$store.commit('updateRules', re.data)

      })

    },
    connect() {


      this.ws = new WebSocket(this.getEnv("ws") + '/admin/broadcast/broadcast')


      this.ws.onopen = this.open;


      this.ws.onmessage = this.message;


      this.ws.onerror = this.error;


      this.ws.onclose = this.close;


    },
    open() {

      console.log('open')


      this.ping();

    },
    message(e) {

      let message = e.data;

      message = JSON.parse(message)

      console.log(message)

      switch (message.types) {

        case "ping":

          break;

        case "group_test":

          ElNotification({
            title: "消息",
            message: message.message,
          })

          break;


        case "total":

          this.$store.commit('setTotal', message.data)

          break;


      }


    },
    error(e) {

      console.error("error:", e)
    },
    close() {

      console.log("close")

      clearInterval(this.timeId)


      if (this.reConnect) {

        //断线重连
        setTimeout(() => {

          this.connect();

        }, 1000)

      }


    },
    ping() {

      this.timeId = setInterval(() => {


        this.sendMessage(1, 'ping', "")


      }, 10000)

    },
    sendMessage(code, type, message, data = []) {


      this.ws.send(JSON.stringify({code: code, types: type, message: message, data: data}))
    }


  },
  mounted() {


    this.reConnect = true

    this.$app.config.globalProperties.$mainContext = this;

    this.getInfo()

    // this.getMenu().then(() => {
    //
    //   this.setDefaultCheck()
    // })

    this.getMenu()


    this.getAllRule()


    this.connect()


  },
  computed: {
    menuTree() {

      if (this.menu.length <= 0) {
        return [];
      }

      let result = [];
      if (!Array.isArray(this.menu)) {
        return result;
      }

      // 复制 menu 数据，避免修改原始数据
      let clonedMenu = JSON.parse(JSON.stringify(this.menu));

      let map = {};
      clonedMenu.forEach(item => {
        map[item.id] = item;
      });
      clonedMenu.forEach(item => {
        let parent = map[item.pid];
        if (parent) {
          (parent.children || (parent.children = [])).push(item);
        } else {
          result.push(item);
        }
      });

      let temp = [];
      for (const mapKey in result) {
        if (result[mapKey].children) {
          temp.push(result[mapKey]);
        }
      }

      return temp;
    },

    index() {


      if (this.menuTree.length <= 0) {


        return "";
      }


      let path = this.$route.path;


      let index = "";

      for (let i in this.menuTree) {

        for (let j in this.menuTree[i].children) {


          if (this.menuTree[i].children[j].path === path) {


            // index = parseInt(i);

            return i + "-" + j


          }

        }

      }


      // setTimeout(() => {
      //
      //   this.index = [index + ""];
      //
      //   this.showMenu = true
      //
      // }, 200)


      // this.showMenu = true

      return ""

      // return [index + ""];

    },
    showMenu() {

      return this.menu.length > 0;


    }

  },
  beforeRouteLeave(to, from) {


    console.log('leave')

    this.reConnect = false

    this.ws.close()


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

<style scoped>

.menu-on {

  color: rgb(255, 208, 75) !important;

}

.menu {

  color: #FFFFFF !important;

}


.pointer {
  cursor: pointer;
}

</style>