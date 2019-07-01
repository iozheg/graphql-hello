<script>
import CreateUser from './CreateUser.vue';
import CreateProject from './CreateProject.vue';
import CreateTask from './CreateTask.vue';

export default {
  name: 'Editor',
  components: { CreateUser, CreateProject, CreateTask },
}
</script>

<template>
  <div id="editor">
    <create-user />
    <br>
    <create-project />
    <br>
    <create-task />
  </div>
</template>
