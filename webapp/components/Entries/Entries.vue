<template>
  <div>
    <h1>{{ title }}</h1>

    <div v-bind:key="post.id" v-for="post in posts">
      <Entry v-bind:entry="post" v-on:del-entry="deleteEntry, post" />
    </div>

    <form @submit.prevent="addEntry(newEntryTitle)">
      <input type="text" v-model="newEntryTitle" />
      <input type="submit" value="Add" />
    </form>
  </div>
</template>

<script>
import Entry from "../Entry/Entry";
import gql_posts from "../../apollo/queries/posts";
import gql_write from "../../apollo/queries/write";

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
    deleteEntry(entryToDelete) {
      console.log(entryToDelete);
      // todo
    },
    async addEntry(newEntry) {
      const resp = await this.$apollo
        .mutate({
          mutation: gql_write,
          variables: { title: newEntry },
          update: (store, { data: { write } }) => {
            const data = store.readQuery({ query: gql_posts }); // get data from cache
            data.posts.push(write); // change the data
            store.writeQuery({ query: gql_posts, data }); // push it back to the cache
          },
        })
        .then((response) => {
          console.log("Response", response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
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
