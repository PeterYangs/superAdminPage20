<template>
<!--  <img alt="Vue logo" src="./assets/logo.png" />-->

  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  methods:{

    test(){

      console.log("test")
    },

  },
  created() {

    this.$app.config.globalProperties.$AppContext=this;

  }
}
</script>

<style>
  * {
    padding: 0;
    margin: 0;
  }

  .row{
    display: flex;
    flex-direction: row;

  }

  .col{
    display: flex;
    flex-direction: column;
  }

  .row-center{
    justify-content: center;
  }


  .col-center{
    align-items: center;
  }

</style>
