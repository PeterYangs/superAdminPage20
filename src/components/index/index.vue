<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>主页</span>
        </div>
      </template>
      <div>


        <highcharts :options="options"></highcharts>


      </div>
    </el-card>
  </div>
</template>

<script>
// import Highcharts from 'highcharts'
export default {
  name: "index",
  data() {

    return {
      item:{
        title:"",
        rule:"",
        group_name:""
      },
     options:{
       title: {
         text: '对数折线图'
       },
       xAxis: {
         type: 'logarithmic',
         tickInterval: 1
       },
       yAxis: {
         type: 'logarithmic',
         minorTickInterval: 0.1
       },
       tooltip: {
         headerFormat: '<b>{series.name}</b><br />',
         pointFormat: 'x = {point.x}, y = {point.y}'
       },
       series: [{
         data: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512],
         pointStart: 1
       }]
     }

    }
  }
}
</script>

<style scoped>

</style>