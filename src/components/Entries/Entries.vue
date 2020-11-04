<template>
  <div>
    <h1>{{ title }}</h1>
    <div v-bind:key="entry.index" v-for="entry in entries">
      <Entry
        v-bind:entry="entry"
        v-on:del-entry="$emit('del-entry', entry)"
        @downvote-entry="$emit('downvote-entry', entry)"
        @upvote-entry="$emit('upvote-entry', entry)"
      />
    </div>
    <div><p></p></div>
    <form @submit.prevent="addEntry($event, newEntryTitle)">
      <input type="text" v-model="newEntryTitle" />
      <input type="submit" value="Add" />
    </form>
  </div>
</template>

<script>
import Entry from './Entry'

export default {
  name: 'Entries',
  components: {
    Entry
  },
  data () {
    return {
      title: 'Hackernews',
      newEntryTitle: ''
    }
  },
  methods: {
    addEntry (event, title) {
      this.newEntryTitle = ''
      this.$emit('add-entry', title)
    }
  },
  props: {
    title: String,
    votes: Number,
    id: Number,
  }
}
</script>

<style scoped>
</style>
