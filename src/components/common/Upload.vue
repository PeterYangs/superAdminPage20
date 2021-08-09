<template>
  <div class="upload">
    <input v-if="more===true" type="file" @change="change" multiple="multiple" />

    <input v-else type="file" @change="change" />
    <slot>
      <el-button type="primary" size="small">主要按钮</el-button>
    </slot>
  </div>
</template>

<script>
export default {
  name: "Upload",
  methods: {

    change(e) {

      // console.log(e.target.files)


      let file = e.target.files;

      let form = new FormData();

      //一个文件就是一个表单对象
      for (let i in file) {

        form.append('file[]', file[i]);
      }


      this.httpPost({
        url: "/admin/upload/upload",
        data: form
      })


    }
  },
  props: {

    //是否支持多图上传
    more: {
      type: Boolean,
      default: false
    }

  }
}
</script>

<style scoped>

.upload > input[type="file"] {


  opacity: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;


}

.upload {
  position: relative;
  width: fit-content;

}

</style>