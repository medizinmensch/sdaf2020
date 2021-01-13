<template>
  <div>
    <form @submit.prevent="login($event, email, password)">
      <input type="text" v-model="email" />
      <input type="text" v-model="password" />
      <input type="submit" value="Login" />
    </form>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "login",
  components: { },
  methods: {
    login(event, email, password) {
      console.log("email", email);
      console.log("password", password);
    },
  },
  data() {
    return {
      posts: [],
      email: "",
      password: "",
    };
  },
  apollo: {
    
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
