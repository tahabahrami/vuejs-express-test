<template>
<v-layout justify-center row>
<v-flex xs3 fluid mt-5>
  <v-toolbar class="cyan" dark>
    <v-toolbar-title class="text-xs-center">Register</v-toolbar-title>
    </v-toolbar>
    <v-flex class="elevation-10" pa-4>
      <v-alert
      class="elevation-3 mb-3"
      color="error"
      icon="warning"
      dismissible
      v-model="isError"
      transition="scale-transition"
    >{{error}}</v-alert>
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-text-field
      prepend-icon="email"
      color="teal"
      type="email"
      label="email"
      :rules="emailRules"
      v-model="email"
      ma-3
      required
      ></v-text-field>
      <v-text-field
      prepend-icon="vpn_key"
      :append-icon="e4 ? 'visibility' : 'visibility_off'"
      :append-icon-cb="() => (e4 = !e4)"
      :type="e4 ? 'password' : 'text'"
      color="teal"
      @focus="showProg"
      @blur="showProg"
      label="Enter your password"
      :rules="passRules"
      v-model="password"
      required
      :loading="custom"
      >
       <v-progress-linear v-show="custom" slot="progress" :value="progress" height="7" :color="color"></v-progress-linear>
      </v-text-field>
      </v-form>
    <v-flex class="text-xs-center">
    <v-btn class="mt-4" round large :disabled="!valid" color="primary" v-show="!isLogin" @click="register">
      <v-icon>verified_user</v-icon>login</v-btn>
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
      custom: false,
      error: null,
      isError: false,
      isLogin: false,
      e4: true,
      valid: true,
      passRules: [
        v => !!v || "password is required",
        v => (v && v.length >= 8) || "password must be more than 8 characters"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ]
    };
  },
  computed: {
    progress() {
      return Math.min(100, this.password.length * 13);
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
      if (this.$refs.form.validate()) {
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
    },
    showProg() {
      this.custom = !this.custom;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
