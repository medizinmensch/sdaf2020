<template>
  <div>
    <h1>{{ title }}</h1>
    <div v-bind:key="post.id" v-for="post in posts">
      <Entry
        v-bind:entry="post"
        v-on:del-entry="'del-entry', post"
        @downvote-entry="'downvote-entry', post"
        @upvote-entry="'upvote-entry', post"
      />
    </div>
    <form @submit.prevent="addEntry($event, newEntryTitle)">
      <input type="text" v-model="newEntryTitle" />
      <input type="submit" value="Add" />
    </form>
  </div>
</template>

<script>
import Entry from "../Entry/Entry";
import gql_posts from "../../apollo/queries/posts";
import gql_upvote from "../../apollo/queries/upvote";

export default {
  name: "Entries",
  components: {
    Entry,
  },
  data() {
    return {
      title: "Hackernews",
      newEntryTitle: "",
    };
  },
  methods: {
    addEntry(event, title) {
      this.newEntryTitle = "";
      this.$emit("add-entry", title);
    },
    deleteEntry(entryToDelete) {
      console.log(entryToDelete);
      this.posts = this.posts.filter(
        (entry) => entry.index !== entryToDelete.index
      );
    },
    addEntry(newEntry) {
      const maxIdb = Math.max(...this.posts.map((entry) => entry.index)) + 1;
      this.posts.push({ index: maxIdb, votes: 0, title: newEntry });
    },

  },
  // props: ['entries'],
  apollo: {
    posts: {
      query: gql_posts,
      // prefetch: ({ route }) => ({ id: route.params.id }),
      // variables() {
      // return { id: this.$route.params.id };
    },
  },
};
</script>

<style scoped>
</style>
