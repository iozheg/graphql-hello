<script>
export default {
  name: "Users",
  inject: ["db"],
  data() {
    return {
      userList: [],
      selectedUser: undefined,
    };
  },
  async mounted() {
    this.userList = (await this.db.fetchAllPersons()).persons;
  },

  methods: {
    selectUser(id) {
      this.selectedUser = id;
      this.$emit("selectUser", id);
    },
  }
}
</script>

<template>
  <div class="users-component">
    <div class="user-list list-group">
      <span class="breadcrumb">Users:</span>
      <div class="user list-group-item"
        v-for="user in userList"
        :key="user.id"
        @click="selectUser(user.id)"
      >
        {{user.id}} - {{user.last_name}} {{user.first_name}} {{user.email}}
      </div>
      Selected user: {{selectedUser}}
    </div>
  </div>
</template>

<style>
.users-component {
  display: flex;
  width: 100%;
  padding: 10px 20px;
}
.user-list {
  width: 100%;
  height: 100%;
}
.user {
  cursor: pointer;
}
</style>

