<template>
  <div>
    <h1> Login Page </h1>
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col-4">
          <form v-on:submit.prevent="login">
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" v-model="data.email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" v-model="data.password" class="form-control" id="exampleInputPassword1">
            </div>
            <div class="form-group form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1">
              <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        email: null,
        password: null
      }
    }
  },

  methods: {
    login() {
      this.$axios.post(this.$api("api/auth/login"), this.data).then((response) => {
        this.$auth.setToken( response.data.access_token, Date.now() + response.data.expires_in )
        this.$axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.access_token;
        this.$router.push('/');
      });
    }
  },  
}
</script>