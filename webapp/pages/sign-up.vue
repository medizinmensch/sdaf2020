<template>
  <div class="signup">
    <h1>Please sign up</h1>
    <form @submit.prevent="signup($event, name, email, password)">
      <input type="text" v-model="name" />
      <input type="text" v-model="email" />
      <input type="text" v-model="password" />
      <input type="submit" value="Sign up" />
    </form>
    <h2>{{ response }}</h2>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "signup",
  components: {},
  methods: {
    async signup(event, name, email, password) {
      console.log("name", name);
      console.log("email", email);
      console.log("password", password);

      // Call to the graphql mutation
      const result = await this.$apollo.mutate({
        mutation: gql`
          mutation($name: String!, $email: String!, $password: String!) {
            signup(name: $name, email: $email, password: $password)
          }
        `,
        variables: {
          name: name,
          email: email,
          password: password,
        },
      });
      this.response = result.data.signup;
    },
  },
  data() {
    return {
      email: "",
      password: "",
      name: "",
      response: "",
    };
  },
  apollo: {},
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
