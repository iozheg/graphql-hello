<script>
export default {
  name: "CreateUser",
  inject: ["db"],
  data() {
    return {
      newUserFName: "",
      newUserLName: "",
      newUserEmail: "",
    };
  },

  methods: {
    async createUser(event) {
      event.preventDefault();
      const newUser = await this.db.createUser({
        first_name: this.newUserFName,
        last_name: this.newUserLName,
        email: this.newUserEmail,
      });
      if (newUser.first_name === this.newUserFName) {
        alert('User created');
      }
    }
  }
}
</script>

<template>
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
</template>

<style>
.create-user {
  width: 100%;
  padding: 10px 20px;
}
.create-input {
  height: 25px;
  padding: 3px;
}
</style>

