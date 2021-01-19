<template>
  <div class="entry">
    <p>{{ entry.votes }} - {{ entry.title }}</p>
    <!-- <p>{{ entry.title }}</p> -->

    <button class="upvotebtn" @click="'upvote-entry', entry">🔼</button>
    <button @click="'downvote-entry', entry">🔽</button>
    <button @click="'del-entry', entry">🗑</button>
  </div>
</template>

<script>
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
    upvoteEntry(entry) {
      console.log(entry);
      this.posts.find((element) => element.index === entry.index).votes++;
    },
    downvoteEntry(entry) {
      console.log(entry);
      this.posts.find((element) => element.index === entry.index).votes--;
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
