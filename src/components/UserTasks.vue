<script>
export default {
  name: "UserDetails",
  inject: ["db"],
  props: {
    userId: { type: Number, default: undefined },
  },
  data() {
    return {
      userTasks: undefined,
    };
  },
  watch: {
    async userId() {
      this.userTasks = [];
      this.userTasks = await this.db.getUserTasks(this.userId);
    },
  },
}
</script>

<template>
  <div class="user-tasks">
    <div class="tasks">
      <span class="breadcrumb">Tasks: </span>
      <table class="table">
        <tr>
          <th>id</th>
          <th>name</th>
          <th>creator</th>
          <th>executor</th>
          <th>project</th>
          <th>start</th>
          <th>end</th>
        </tr>
        <tbody>
          <tr
            v-for="task in userTasks"
            :key="task.id"
          >
            <td>{{task.id}}</td>
            <td>{{task.name}}</td>
            <td>{{task.creator.last_name}}</td>
            <td>{{task.executor.last_name}}</td>
            <td>{{task.project.name}}</td>
            <td>{{(new Date(Number(task.start_date))).toDateString()}}</td>
            <td>{{(new Date(Number(task.end_date))).toDateString()}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
.user-tasks {
  display: flex;
  width: 100%;
  padding: 10px 20px;
}
.tasks {
  width: 100%;
  height: 100%;
}
</style>

