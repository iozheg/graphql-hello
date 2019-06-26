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
      newTask: {
        name: "",
        creator: null,
        executor: null,
        start_date: "",
        end_date: ""
      }
    };
  },
  watch: {
    async userId() {
      this.userTasks = [];
      this.userTasks = await this.db.getUserTasks(this.userId);
    },
  },

  methods: {
    async createTask() {
      this.newTask.creator = Number(this.newTask.creator);
      this.newTask.executor = Number(this.newTask.executor);
      const task = await this.db.createTask(this.newTask);
      if (task.name === this.newTask.name) {
        this.userTasks = await this.db.getUserTasks(this.userId);
      }
    }
  }
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
            <td>{{(new Date(Number(task.start_date))).toDateString()}}</td>
            <td>{{(new Date(Number(task.end_date))).toDateString()}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <form class="create-task">
       <span class="breadcrumb">Create task: </span>
      <div class="form-group">
        <label class="create-input">name</label>
        <input class="form-control form-control-sm" type="text" v-model="newTask.name" />
        <label class="create-input">creator</label>
        <input class="form-control form-control-sm" type="text" v-model="newTask.creator" />
        <label class="create-input">executor</label>
        <input class="form-control form-control-sm" type="text" v-model="newTask.executor" />
        <label class="create-input">start</label>
        <input class="form-control form-control-sm" type="text" v-model="newTask.start_date" />
        <label class="create-input">end</label>
        <input class="form-control form-control-sm" type="text" v-model="newTask.end_date" />
      </div>
      <button class="btn btn-primary" @click="createTask">Create</button>
      {{ newTask }}
    </form>
  </div>
</template>

<style>
.user-tasks {
  display: flex;
}
.tasks {
  width: 50%;
  height: 100%;
}
.create-task {
  width: 50%;
  margin: 0 20px;
}
.create-input {
  height: 25px;
  padding: 3px;
}
</style>

