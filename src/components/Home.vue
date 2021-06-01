<template>
  <div>Home</div>

  <el-button type="primary" @click="$router.push('/hello')">go</el-button>
</template>

<script>
export default {
  name: "Home",
  created() {


    this.$AppContext.test();


  }
}
</script>

<style scoped>

</style>