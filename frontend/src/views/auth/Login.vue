<template>
  <div>
    <h1> Login Page </h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },

  created() {
    this.test();
  },

  methods: {
    test() {
      this.$axios.get(this.$api("api/auth/test")).then((response) => {
        console.log(response.data)
      });
    }
  },  
}
</script>