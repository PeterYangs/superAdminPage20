<template>

  <div>
    <div class="upload">


      <input type="file" @change="change($event)"/>
      <slot>
        <el-button type="primary" size="small">上传</el-button>
      </slot>


    </div>

    <el-dialog title="进度" v-model="show" width="30%" :before-close="handleClose">
      <div class="row row-center">
        <el-progress type="circle" :percentage="percentage"></el-progress>
      </div>

    </el-dialog>

  </div>
</template>

<script>
import {ElMessage} from 'element-plus'

export default {
  name: "BigFile",
  data() {
    return {
      ws: null,
      show: false,
      percentage: 0,
      nums: 0
    }
  },
  methods: {

    change(e) {


      let file = e.target.files[0]

      console.log(file)

      let size = file.size;

      if (size > this.maxSize) {


        ElMessage.error('超出最大文件大小')

        return
      }


      this.ws = new WebSocket(this.getEnv("ws") + "/admin/upload/big_file")


      this.ws.onmessage = this.message;

      this.ws.onopen = () => {


        this.show = true;

        let nums = Math.ceil(size / this.unitByte)

        this.nums = nums


        this.ws.send(JSON.stringify({name: file.name, size: file.size, type: file.type, nums: nums}))

        let index = 0;
        for (let i = 0; i < nums; i++) {


          this.ws.send(this.blobSlice(file, i * this.unitByte, i * this.unitByte + this.unitByte))

          index++


        }


      }


    },

    message(e) {

      let data = JSON.parse(e.data)


      if (data.code === 1) {


        this.$emit("success", data.data)


        this.show = false

        this.percentage = 0

        this.ws.close()

      } else if (data.code === 2) {


        this.percentage = (data.data / this.nums * 100).toFixed(2)

      } else {


        this.$notify({
          title: '错误',
          message: data.msg,
          position: 'bottom-right',
          type: 'error'
        });

        this.show = false

        this.percentage = 0

        this.ws.close()

      }


    },

    /**
     * 文件切割
     * @param {Object} file
     * @param {Object} startByte
     * @param {Object} endByte
     */
    blobSlice(file, startByte, endByte) {
      if (file.slice) {
        return file.slice(startByte, endByte);


      } else if (file.webitSlice) {

        return file.webkitSlice(startByte, endByte);

      } else if (file.mozSlice) {

        return file.mozSlice(startByte, endByte);

      } else {


        return null;
      }


    },
    handleClose(done) {


    }


  },
  props: {

    //允许的最大文件（默认：100M）
    maxSize: {

      type: Number,
      default: 104857600

    },
    unitByte: {

      type: Number,
      default: 102400

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