<template>

  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>规则编辑</span>
        </div>
      </template>


      <div>
        <el-table :data="list" style="width: 100%">
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

            </template>

          </el-table-column>

        </el-table>
      </div>


    </el-card>
  </div>

</template>

<script>
export default {
  name: "rule_list",
  data() {

    return {
      list: []
    }
  },
  methods:{

    getList(){

      this.httpGet({
        url:"/admin/rule/list",
        loading:true,
      }).then((re)=>{

        this.list=re.data;

      })

    },
    edit(id){

      this.$router.push({
        path:"/main/rule_edit",
        query:{id:id}
      })

    }

  },
  created(){

    this.getList()
  }
}
</script>

<style scoped>

</style>