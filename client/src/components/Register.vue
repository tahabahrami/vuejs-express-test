<template>
  <div>
    <h1>Register</h1>
    <input
    type="email"
    name="email"
    v-model="email"
    placeholder="email"
    class="input"/>
    <input
    type="password"
    name="password"
    v-model="password"
    placeholder="password"/>
    <br>
    <button @click="register">Register</button>
    <br>
  <div class="error" v-html="error"></div>
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null
    };
  },
  methods: {
    async register() {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        });
      } catch (error) {
        this.error = error.response.data.error;
      }
      console.log(response.data);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input {
  display: inline-flex;
  margin: 15px;
}
.error {
  color: tomato;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 20px;
}
</style>
