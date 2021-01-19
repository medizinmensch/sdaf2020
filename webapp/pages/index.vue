<template>
  <div id="app">
    <Entries
      
      @add-entry="addEntry($event)"
      @del-entry="deleteEntry"
      @downvote-entry="downvoteEntry"
      @upvote-entry="upvoteEntry"
    />
  </div>
</template>

<script>
import Entries from "../components/Entries/Entries";
import gql from "graphql-tag";

export default {
  name: "App",
  components: { Entries },
  methods: {
    async getPosts(event, email, password) {
      console.log("this.posts", this.posts);
      console.log("token", this.$store.state.user.token);
      try {
        const result = await this.$apollo.query({ query: gql_posts });
        console.log(result);
        // this.posts = result.data.posts;
        console.log(result.data.posts);
        return result.data.posts;
      } catch (err) {
        console.log(err);
      }
    },
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
