<template>
  <el-container style="height: 100vh; border: 1px">
    <el-aside width="300px" style="background-color: #191A23;box-shadow: rgb(0 21 41 / 35%) 2px 0px 6px;">

      <div class="row col row-center col-center" style="margin-top: 15px">
        <h1 style="color: #fff" @click="$router.push('/main/home')" class="pointer">SuperAdmin</h1>
      </div>

      <el-divider style="margin: 10px 0;"></el-divider>
      <el-menu v-if="showMenu" :default-openeds="index" background-color="#191A23" text-color="#fff" active-text-color="#ffd04b">


        <el-submenu  v-for="(v,i) in menuTree"     :index="i" >

          <template #title><i class="el-icon-message"></i>{{v.title}}</template>

          <el-menu-item  :class="[$route.path===vv.path?'menu-on':'menu']"  v-for="(vv,ii) in v.children" :index="i+'-'+ii" @click="toPath(vv.path)">{{vv.title}}</el-menu-item>


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
              <el-dropdown-item @click="logout()">注销</el-dropdown-item>
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

    return {
      // tableData: Array(20).fill(item),
      info: {
        username: ""
      },
      menu: [],
      index:[],
      showMenu:false
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


      return new Promise((success,fail)=>{

        this.httpPost({
          url: "/admin/admin/getMyMenu",
          loading: true,
        }).then((re) => {

          this.menu = re.data;

          this.$nextTick(()=>{


            success()

          })

        }).catch(()=>{

          fail()
        })


      })





    },
    //默认展开的菜单
    setDefaultCheck(){

      let path=this.$route.path;


      let index=0;

      for (let i in this.menuTree){

        for (let j in this.menuTree[i].children){


          if (this.menuTree[i].children[j].path===path){




            index= parseInt(i);

          }

        }

      }


      setTimeout(()=>{

        this.index=[index];

        this.showMenu=true

      },100)



    },
    logout(){

      this.httpPost({
        url:"/login/logout"
      }).then(()=>{

        this.$router.push("/login")

      })

    },
    log(item){


      console.log(this.getObj(item,''))

    }

  },
  created() {

    this.getInfo()

    this.getMenu().then(()=>{

      this.setDefaultCheck()
    })



  },
  computed: {
    menuTree() {
      let result = []
      if (!Array.isArray(this.menu)) {
        return result
      }
      this.menu.forEach(item => {
        delete item.children;
      });
      let map = {};
      this.menu.forEach(item => {
        map[item.id] = item;
      });
      this.menu.forEach(item => {
        let parent = map[item.pid];
        if (parent) {
          (parent.children || (parent.children = [])).push(item);
        } else {
          result.push(item);
        }
      });


      let temp=[];

      for (const mapKey in result) {

        if (result[mapKey].children){

          temp.push(result[mapKey])
        }

      }

      return temp;
    }
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

.menu-on{

  color: rgb(255, 208, 75) !important;

}

.menu{

  color: #FFFFFF !important;

}


.pointer {
  cursor: pointer;
}

</style>