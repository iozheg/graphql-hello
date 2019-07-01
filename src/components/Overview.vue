<script>
import Users from './Users.vue';
import Projects from './Projects.vue'
import UsersTasks from './UserTasks.vue';

export default {
  name: 'Overview',
  components: { Users, Projects, UsersTasks },
  data() {
    return {
      selectedUser: undefined,
    };
  },

  methods: {
    selectUser(id) {
      this.selectedUser = Number(id);
    },
  }
}
</script>

<template>
  <div id="overview">
    <Users @selectUser="selectUser" />
    <br>
    <projects :userId="selectedUser" />
    <br>
    <UsersTasks :userId="selectedUser" />
  </div>
</template>

<style>
#overview {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
