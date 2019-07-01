<script>
export default {
  name: "CreateProject",
  inject: ["db"],
  data() {
    return {
      projectName: "",
      creator: null,
    };
  },

  methods: {
    async createProject(event) {
      event.preventDefault();
      this.creator = Number(this.creator);
      const project = await this.db.createProject({
        name: this.projectName,
        creator: this.creator,
      });
      if (project.name === this.projectName) {
        alert('Project created');
      }
    }
  }
}
</script>

<template>
  <form class="create-project">
    <span class="breadcrumb">Create project:</span>
    <div class="form-group">
      <label class="create-input">name</label>
      <input class="form-control form-control-sm" type="text" v-model="projectName" />
      <label class="create-input">creator</label>
      <input class="form-control form-control-sm" type="text" v-model="creator" />
    </div>
    <button class="btn btn-primary" @click="createProject">Create</button>
  </form>
</template>

<style>
.create-project {
  width: 100%;
  padding: 10px 20px;
}
.create-input {
  height: 25px;
  padding: 3px;
}
</style>

