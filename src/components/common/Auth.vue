<template>

  <div v-if="show">
    <slot></slot>
  </div>

</template>

<script>
export default {
  name: "Auth",
  props: {

    rule: {
      type: String,
      default: ""
    }

  },
  computed: {

    show() {

      if (this.rule === "") {

        return true

      }

      if (this.$store.state.rules === true) {

        return true

      }

      if (this.$store.state.rules?.length === 0) {

        return false
      }

      for (const argumentsKey in this.$store.state.rules) {

        if (this.$store.state.rules[argumentsKey] === this.rule) {


          return true

        }

      }


      return false
    }

  }
}
</script>

<style scoped>

</style>