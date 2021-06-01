<template>
  <img alt="Vue logo" src="./assets/logo.png" />

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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
