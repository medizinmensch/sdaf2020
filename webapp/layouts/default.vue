<template>
  <div>
    <nav>
      <nuxt-link class="nuxt-link" to="/">Home</nuxt-link>
      <nuxt-link class="nuxt-link" to="/login">Login</nuxt-link>
      <nuxt-link class="nuxt-link" to="/sign-up">Sign-Up</nuxt-link>
    </nav>
    <p v-if="email">
      Logged in as <b>{{ email }}</b>
    </p>
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: "layout",
  computed: {
    email() {
      console.log("store.state", this.$store.state);
      return this.$store.state.user.email;
    },
  },
};
</script>


<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

nav {
  display: flex;
  justify-content: center;
  border: 1px solid black;
}

.nuxt-link {
  font-family: "Source Sans Pro";
  border: 1 px solid grey;
  margin: 1rem;
}
</style>
