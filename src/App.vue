<script>
import Users from './components/Users.vue';
import UsersTasks from './components/UserTasks.vue';
import db from "./db";

export default {
  name: 'app',
  provide() {
    return {
      db: db
    }
  },
  components: { Users, UsersTasks },
  data() {
    return {
      selectedUser: undefined,
    };
  },

  methods: {
    selectUser(id) {
      this.selectedUser = Number(id);
    }
  }
}
</script>

<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <Users @selectUser="selectUser" />
    <br>
    <UsersTasks :userId="selectedUser" />
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
