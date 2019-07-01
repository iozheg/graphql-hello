<script>
import Users from './Users.vue';
import UsersTasks from './UserTasks.vue';

export default {
  name: 'Overview',
  components: { Users, UsersTasks },
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
    <UsersTasks :userId="selectedUser" />
  </div>
</template>

<style>
#overview {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
