<template>

  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>queue_delay_list</span>
        </div>
      </template>

      <div>


<!--        <div style="margin-bottom: 30px" @change="queueChange">-->
<!--          <el-radio-group v-model="search.queue">-->
<!--            <el-radio-button label="high"></el-radio-button>-->
<!--            <el-radio-button label="default"></el-radio-button>-->
<!--            <el-radio-button label="low"></el-radio-button>-->

<!--          </el-radio-group>-->
<!--        </div>-->

        <el-table :data="list.data" style="width: 100%">
          <el-table-column prop="id" label="Id">
          </el-table-column>

          <el-table-column prop="data.TaskName" label="任务名称">
          </el-table-column>

          <el-table-column prop="time" label="执行时间">
          </el-table-column>


          <el-table-column label="操作">

            <template v-slot="item">

              <el-button type="primary" size="small" @click="edit(item.row)">查看参数</el-button>

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

    <el-dialog title="提示" v-model="showInfo" width="30%">

      <div>
        <pre>{{info}}</pre>
      </div>

      <template #footer>
        <span class="dialog-footer">
        <el-button @click="showInfo = false">取 消</el-button>
        <el-button type="primary" @click="showInfo = false">确 定</el-button>
      </span>
      </template>
    </el-dialog>


  </div>

</template>

<script>
export default {
  name: "queue_delay_list",
  data() {

    return {
      list: {},
      search: {
        queue: "default"
      },
      info:{},
      showInfo:false
    }
  },
  methods: {

    getList() {

      this.httpPost({
        url: "/admin/queue/delay_list",
        loading: true,
        params: this.$route.query,
      }).then((re) => {

        this.list = re.data;

      })

    },
    edit(id) {


      this.info=id;

      this.showInfo=true;


    },
    next(page) {


      this.routerSearch(this, {
        p: page
      });


    },
    queueChange(){



      this.routerSearch(this, this.search);



    }

  },
  created() {
    // console.log(this.$route.query)

    this.setItem(this.search,this.$route.query)

    this.getList()
  }
}
</script>

<style scoped>

</style>