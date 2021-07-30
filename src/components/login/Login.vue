<template>
  <el-row style="height: 100vh;width: 100vw;background-image: url('/public/img.png');background-repeat: no-repeat;background-size: 100% 100%;" justify="center" align="middle">


    <div style="width: 20vw;" class="col row-center col-center">

      <h1 style="margin-bottom: 30px">Super Admin 2.0</h1>

      <el-form :model="item" label-position="top" class="form">


        <el-form-item class="input">

          <el-input prefix-icon="el-icon-user-solid"></el-input>

        </el-form-item>


        <el-form-item class="input">

          <el-input prefix-icon="el-icon-lock"></el-input>

        </el-form-item>


        <el-form-item class="input">

          <div class="row">


            <div style="flex: 3;margin-right: 10px">
              <el-input prefix-icon="el-icon-picture-outline"></el-input>
            </div>

            <div style="flex: 1;width: 100%">
              <el-image :src="getHost()+'/captcha/captcha'"></el-image>
            </div>

          </div>


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
      item: {}
    }
  },
  methods: {
    login() {

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