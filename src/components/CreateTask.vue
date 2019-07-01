<script>
export default {
  name: "CreateTask",
  inject: ["db"],
  data() {
    return {
      newTask: {
        name: "",
        creator: null,
        executor: null,
        project: null,
        start_date: "",
        end_date: ""
      }
    };
  },

  methods: {
    async createTask(event) {
      event.preventDefault();
      this.newTask.creator = Number(this.newTask.creator);
      this.newTask.executor = Number(this.newTask.executor);
      this.newTask.project = Number(this.newTask.project);
      const task = await this.db.createTask(this.newTask);
      if (task.name === this.newTask.name) {
        alert('Task created');
      }
    }
  }
}
</script>

<template>
  <form class="create-task">
    <span class="breadcrumb">Create task: </span><br>
    <div class="form-group">
      <label class="create-input">name</label>
      <input class="form-control form-control-sm" type="text" v-model="newTask.name" />
      <label class="create-input">creator</label>
      <input class="form-control form-control-sm" type="text" v-model="newTask.creator" />
      <label class="create-input">executor</label>
      <input class="form-control form-control-sm" type="text" v-model="newTask.executor" />
      <label class="create-input">project</label>
      <input class="form-control form-control-sm" type="text" v-model="newTask.project" />
      <label class="create-input">start</label>
      <input class="form-control form-control-sm" type="date" v-model="newTask.start_date" />
      <label class="create-input">end</label>
      <input class="form-control form-control-sm" type="date" v-model="newTask.end_date" />
    </div>
    <button class="btn btn-primary" @click="createTask">Create</button>
  </form>
</template>

<style>
.create-task {
  width: 100%;
  padding: 10px 20px;
}
.create-input {
  height: 25px;
  padding: 3px;
}
</style>

