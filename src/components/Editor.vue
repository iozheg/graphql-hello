<script>
import CreateUser from './CreateUser.vue';
import CreateTask from './CreateTask.vue';

export default {
  name: 'Editor',
  components: { CreateUser, CreateTask },
}
</script>

<template>
  <div id="overview">
    <create-user />
    <br>
    <create-task />
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
