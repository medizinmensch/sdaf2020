<template>
  <div id="app">
    <Entries
      :posts="posts"
      @add-entry="addEntry($event)"
      @del-entry="deleteEntry"
      @downvote-entry="downvoteEntry"
      @upvote-entry="upvoteEntry"
    />
  </div>
</template>

<script>
import Entries from '../components/Entries/Entries'
import gql from 'graphql-tag'
// import posts from '../apollo/queries/posts'

export default {
  name: 'App',
  components: { Entries },
  methods: {
    deleteEntry (entryToDelete) {
      console.log(entryToDelete)
      this.posts = this.posts.filter((entry) => entry.index !== entryToDelete.index)
    },
    addEntry (newEntry) {
      const maxIdb = Math.max(...this.posts.map(entry => entry.index)) + 1
      this.posts.push({ index: maxIdb, votes: 0, title: newEntry })
    },
    upvoteEntry (entry) {
      console.log(entry)
      this.posts.find(element => element.index === entry.index).votes++
    },
    downvoteEntry (entry) {
      console.log(entry)
      this.posts.find(element => element.index === entry.index).votes--
    }
    // sort () {
    //   this.posts.sort((a, b) => a.votes > b.votes ? -1 : 1)
    // }
  },
  data () {
    return {
      posts: []
    }
  },
  apollo: {
    posts: gql`{ posts { title, id } }`
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
