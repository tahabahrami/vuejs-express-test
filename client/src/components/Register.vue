<template>
<v-layout justify-center row>
<v-flex xs3 fluid mt-5>
  <v-toolbar class="cyan" dark>
    <v-toolbar-title>Register</v-toolbar-title>
    </v-toolbar>
    <v-flex class="elevation-10" pa-5>
      <v-alert
      class="elevation-3 mb-3"
      color="error"
      icon="warning"
      dismissible
      v-model="isError"
      transition="scale-transition"
    >{{error}}</v-alert>
      <v-text-field
      prepend-icon="email"
      color="teal"
      type="email"
      label="email"
      :rules="[rules.required,rules.ali]"
      v-model="email"
      ma-3
      ></v-text-field>
      <v-text-field
      prepend-icon="vpn_key"
      hint="At least 8 characters"
      :append-icon="e4 ? 'visibility' : 'visibility_off'"
      :append-icon-cb="() => (e4 = !e4)"
      :type="e4 ? 'password' : 'text'"
      min="8"
      max="32"
      color="teal"
      label="Enter your password"
      :rules="[rules.required]"
      v-model="password"
      >
      </v-text-field>
    <v-flex xs4 offset-xs4>
    <v-btn class="cyan mt-4 text-xs-center" dark @click="register">Register</v-btn>
    </v-flex>
    <v-flex>
    <v-alert
      color="success"
      icon="check_circle"
      dismissible
      v-html="error"
      v-show="isLogin"
      class="elevation-10 mt-3"
      transition="scale-transition">
    </v-alert>
    </v-flex>
</v-flex>
</v-flex>
</v-layout>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
export default {
  data() {
    return {
      email: "",
      password: "",
      custom: true,
      error: null,
      isError: false,
      isLogin: false,
      e4: true,
      rules: {
        required: value => !!value || "Required.",
        ali: value => value.length < 10 || "kame"
      }
    };
  },
  computed: {
    progress() {
      return Math.min(100, this.password.length * 10);
    },
    color() {
      return ["error", "warning", "success"][Math.floor(this.progress / 40)];
    }
  },
  methods: {
    loginAlert() {
      return this.isLogin;
    },
    async register() {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        });
        this.isError = false;
        this.isLogin = true;
        this.error = "you loged in successfully";
        console.log(response.data);
      } catch (error) {
        this.isError = true;
        this.error = error.response.data.error;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
