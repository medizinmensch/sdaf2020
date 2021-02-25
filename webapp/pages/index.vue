<template>
  <div id="app">
    <Entries />
  </div>
</template>

<script>
import Entries from "../components/Entries/Entries";
import gql_profile from "../apollo/queries/profile";
import gql from "graphql-tag";

export default {
  name: "App",
  components: { Entries },
  methods: {
    async fetchProfile() {
      try {
        const resp = await this.$apollo.query({
          query: gql_profile,
        });
        this.$store.commit("setUser", {
          email: resp.data.profile.email,
          name: resp.data.profile.name,
        });
      }
      catch{
        console.log("Token apparently not set");
      }
    },
  },
  mounted() {
    this.fetchProfile();
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
