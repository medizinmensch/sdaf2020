<template>
  <div id="app">
    <Entries
      :entries="entries"
      @add-entry="addEntry($event)"
      @del-entry="deleteEntry"
      @downvote-entry="downvoteEntry"
      @upvote-entry="upvoteEntry"
    />
  </div>
</template>

<script>
import Entries from "./components/Entries";

export default {
  name: "App",
  components: { Entries },
  methods: {
    deleteEntry(entryToDelete) {
      console.log(entryToDelete);
      this.entries = this.entries.filter((entry) => entry.index !== entryToDelete.index);
    },
    addEntry(newEntry) {
      let maxIdb = Math.max(...this.entries.map(entry => entry.index)) + 1;
      this.entries.push({ index: maxIdb, votes: 0, title: newEntry });
    },
    upvoteEntry(entry){
      console.log(entry)
      this.entries.find(element => element.index == entry.index).votes ++;
    },
    downvoteEntry(entry){
      console.log(entry)
      this.entries.find(element => element.index == entry.index).votes --;
      this.sort();
    },
    sort(){
      this.entries.sort((a,b) => a.votes > b.votes ? -1 : 1)
    }
  },
  data() {
    return {
      entries: [
        {
          index: 0,
          votes: 0,
          title: "IBM splits into two companies",
        },
        {
          index: 1,
          votes: 0,
          title: "JavaScript ES9 announced",
        },
      ],
    };
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
