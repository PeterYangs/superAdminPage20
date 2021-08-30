<template>
  <el-row
      style="height: 100vh;width: 100vw;background-image: url('/img.png');background-repeat: no-repeat;background-size: 100% 100%;"
      justify="center" align="middle">


    <div style="width: 20vw;" class="col row-center col-center">

      <h1 style="margin-bottom: 30px">SuperAdmin 2.0</h1>

      <el-form :model="item" label-position="top" class="form">


        <el-form-item class="input">

          <el-input prefix-icon="el-icon-user-solid" v-model="item.username"></el-input>

        </el-form-item>


        <el-form-item class="input">

          <el-input prefix-icon="el-icon-lock" v-model="item.password" type="password"></el-input>

        </el-form-item>


        <el-form-item class="input">

          <div class="row">


            <div style="flex: 3;margin-right: 10px">
              <el-input prefix-icon="el-icon-picture-outline" v-model="item.captcha"></el-input>
            </div>

            <div style="flex: 1;width: 100%">
              <el-image :src="img" @click="changeImg()"></el-image>
            </div>

          </div>


        </el-form-item>

        <el-form-item>

          <el-button type="primary" style="width: 100%" @click="login()">提交</el-button>

        </el-form-item>


      </el-form>

    </div>


  </el-row>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      item: {
        username: "",
        password: "",
        captcha: ""
      },
      img: this.getHost() + '/captcha/captcha?r=' + Math.random()
    }
  },
  methods: {
    login() {

      this.httpPost({
        url: "/login/login",
        data: this.item
      }).then((re) => {


        this.$router.push("/main/home")

      }).catch(() => {

        this.img = this.getHost() + '/captcha/captcha?r=' + Math.random();
      })

    },
    changeImg() {

      this.img = this.getHost() + '/captcha/captcha?r=' + Math.random();

    }
  }
}
</script>

<style scoped>

.form .input {

  width: 450px;
  margin-bottom: 20px;
}

</style>