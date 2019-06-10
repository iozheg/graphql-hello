<script>
export default {
  name: "Users",
  inject: ["db"],
  data() {
    return {
      userList: []
    };
  },
  async mounted() {
    this.userList = (await this.db.fetchAllPersons()).persons;
  },

  methods: {
    selectUser(id) {
      this.$emit("selectUser", id);
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
</style>

