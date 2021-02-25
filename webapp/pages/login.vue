<template>
  <div>
    <div v-if="isLoggedIn">
      <button :click="logout">Log Out</button>
    </div>
    <div v-else>
      <p>You are currently not logged in. Go ahead</p>
      <form @submit.prevent="login(email, password)">
        <input type="text" v-model="email" />
        <input type="text" v-model="password" />
        <input type="submit" value="Login" />
      </form>
      <p v-if="failed">Incorrect username or password</p>
    </div>
  </div>
</template>

<script>
import gql_login from "../apollo/queries/login";
import jwt_decode from "jwt-decode";

export default {
  name: "login",
  components: {},
  methods: {
    async logout() {
      this.$store.commit("clearUser");
      this.$apolloHelpers.onLogout();
    },
    async login(email, password) {
      try {
        const result = await this.$apollo.mutate({
          mutation: gql_login,
          variables: {
            email: this.email,
            password: this.password,
          },
        });
        this.$apolloHelpers.onLogin(result.data.login);
        this.$store.commit("setUser", { email, token: result.data.login });
        this.failed = false
      } catch (error) {
        this.failed = true;
        console.log(error);
      } finally {
      }
    },
  },
  computed: {
    state_email() {
      return this.$store.getters.getEmail;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },

  data() {
    return {
      email: "",
      password: "",
      failed: null,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flexbox;
  flex-direction: column;
}
</style>
