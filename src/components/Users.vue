<script>
export default {
  name: "Users",
  inject: ["db"],
  data() {
    return {
      userList: [],
      newUserFName: "",
      newUserLName: "",
      newUserEmail: "",
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
    async createUser() {
      const newUser = await this.db.createUser({
        first_name: this.newUserFName,
        last_name: this.newUserLName,
        email: this.newUserEmail,
      });
      if (newUser.first_name === this.newUserFName) {
        this.userList = (await this.db.fetchAllPersons()).persons;
      }
    }
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
    <form class="create-user">
      <span class="breadcrumb">Create user:</span>
      <div class="form-group">
        <label class="create-input">first name</label>
        <input class="form-control form-control-sm" type="text" v-model="newUserFName" />
        <label class="create-input">last name</label>
        <input class="form-control form-control-sm" type="text" v-model="newUserLName" />
        <label class="create-input">email</label>
        <input class="form-control form-control-sm" type="text" v-model="newUserEmail" />
      </div>
      <button class="btn btn-primary" @click="createUser">Create</button>
    </form>
  </div>
</template>

<style>
.users-component {
  display: flex;
  width: 100%;
}
.user-list {
  width: 50%;
  height: 100%;
}
.user {
  cursor: pointer;
}
.create-user {
  width: 50%;
  margin: 0 20px;
}
.create-input {
  height: 25px;
  padding: 3px;
}
</style>

