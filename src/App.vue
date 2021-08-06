<template>
  <!--  <img alt="Vue logo" src="./assets/logo.png" />-->

  <router-view v-if="show"></router-view>
</template>

<script>
export default {
  name: "App",
  methods: {

    test() {

      console.log("test")
    },
    reload() {



      this.show = false

      this.$nextTick(() => {

        this.show = true

      });

      // this.show=true

    },


  },
  data() {
    return {
      show: true
    }
  },
  created() {

    this.$app.config.globalProperties.$AppContext = this;

    // this.info()

  },

}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

.row {
  display: flex;
  flex-direction: row;

}

.col {
  display: flex;
  flex-direction: column;
}

.row-center {
  justify-content: center;
}


.col-center {
  align-items: center;
}

.super-admin-form .el-form-item {

  width: 40%;
}


</style>
