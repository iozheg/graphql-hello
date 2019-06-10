<script>
export default {
  name: "UserDetails",
  inject: ["db"],
  props: {
    userId: { type: Number, default: undefined },
  },
  data() {
    return {
      userTasks: undefined
    };
  },
  watch: {
    async userId() {
      this.userTasks = [];
      this.userTasks = await this.db.getUserTasks(this.userId);
      console.log(this.userTasks);
    },
  },
}
</script>

<template>
   <div class="user-details">
    <table>
      <tr>
        <th>id</th>
        <th>name</th>
        <th>creator</th>
        <th>executor</th>
        <th>start</th>
        <th>end</th>
      </tr>
      <tbody>
        <tr class="task"
          v-for="task in userTasks"
          :key="task.id"
        >
          <td>{{task.id}}</td>
          <td>{{task.name}}</td>
          <td>{{task.creator.last_name}}</td>
          <td>{{task.executor.last_name}}</td>
          <td>{{(new Date(Number(task.start_date))).toDateString()}}</td>
          <td>{{(new Date(Number(task.end_date))).toDateString()}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
.user-details {
  width: 100%;
  height: 100%;
}
.user-details > table, th, td {
  border: 1px solid lightgray;
}
.task {
  height: 30px;
  border: 1px solid gray;
  padding: 8px 5px 0 5px;
  margin-bottom: 3px;
  text-align: left;
}
</style>

