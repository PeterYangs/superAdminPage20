<template>
  <div style="margin: 10px 0;">
    <el-space wrap size="large">


      <slot v-bind:row="modelValue"></slot>


      <el-button type="primary" @click="search()">搜索</el-button>
    </el-space>
  </div>
</template>

<script>
export default {
  name: "Search",
  methods: {
    search() {

      this.routerSearch(this, {params: encodeURIComponent(JSON.stringify(this.modelValue))});

    }
  },
  props: {

    modelValue: {
      type: Object,
      default: function () {

        return {}

      }
    }

  },
  emits: ['update:modelValue'],
  watch: {

    modelValue(vv) {

      this.$emit('update:modelValue', vv)

    }

  },
  created() {

    if (typeof (this.$route.query.params) !== "undefined") {

      // this.modelValue = JSON.parse(this.$route.query.params)

      this.$emit('update:modelValue', JSON.parse(this.$route.query.params))
    }
  }

}
</script>

<style scoped>

</style>