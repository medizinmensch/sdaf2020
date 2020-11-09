<template>
  <div class="entry">
    <p>{{ entry.votes }} - {{ entry.title }}</p>

    <button class="upvotebtn" @click="$emit('upvote-entry', entry)">🔼</button>
    <button @click="$emit('downvote-entry', entry)">🔽</button>
    <button @click="$emit('del-entry', entry)">🗑</button>
  </div>
</template>

<script>
export default {
  name: 'Entry',
  props: {
    entry: {
      title: String,
      votes: Number,
      id: Number
    }
  },
  methods: {}
}
</script>

<style scoped>
.entry {
  background: #f4f4f4;
  padding: 10px;
  border-bottom: #ccc dotted;
}
</style>
