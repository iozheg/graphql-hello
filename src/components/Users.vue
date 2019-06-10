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
    };
  },
  async mounted() {
    this.userList = (await this.db.fetchAllPersons()).persons;
  },

  methods: {
    selectUser(id) {
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
  <div class="user-list">
    <div class="user"
      v-for="user in userList"
      :key="user.id"
      @click="selectUser(user.id)"
    >
      {{user.id}} - {{user.last_name}} {{user.first_name}} {{user.email}}
    </div>
    <div class="create-user">
      Create user: <br>
      <label class="create-input">first name <input type="text" v-model="newUserFName" /></label>
      <label class="create-input">last name <input type="text" v-model="newUserLName" /></label>
      <label class="create-input">email <input type="text" v-model="newUserEmail" /></label>
      <button @click="createUser">Create</button>
    </div>
  </div>
</template>

<style>
.user-list {
  width: 100%;
  height: 100%;
}
.user {
  cursor: pointer;
  height: 30px;
  border: 1px solid gray;
  padding: 8px 5px 0 5px;
  margin-bottom: 3px;
  text-align: left;
}
.create-user {
  margin: 10px 0;
}
.create-input {
  height: 25px;
  padding: 3px;
}
</style>

