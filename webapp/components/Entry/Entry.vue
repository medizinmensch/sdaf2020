<template>
  <div class="entry">
    <p>{{ entry.votes }} - {{ entry.title }}</p>

    <button @click="upvoteEntry">🔼</button>
    <button @click="downvoteEntry">🔽</button>
    <button @click="'del-entry', entry">🗑</button>
  </div>
</template>

<script>
import gql_upvote from "../../apollo/queries/upvote";

export default {
  name: "Entry",
  props: {
    entry: {
      title: String,
      votes: Number,
      id: Number,
    },
  },
  methods: {
    async upvoteEntry() {
      console.log("Hitting upvoteEntry");
      console.log("entryToUpvote", this.entry);
      const resp = await this.$apollo.mutate({
        mutation: gql_upvote,
        variables: { id: this.entry.id },
      });
    },
    async downvoteEntry() {
      console.log("Downvote not yet implemented");
    },
  },
};
</script>

<style scoped>
.entry {
  background: #f4f4f4;
  padding: 10px;
  border-bottom: #ccc dotted;
}
</style>
