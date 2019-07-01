<script>
export default {
  name: "Projects",
  inject: ["db"],
  props: {
    userId: { type: Number, default: undefined },
  },
  data() {
    return {
      projectList: [],
    };
  },
  watch: {
    async userId() {
      this.projectList = [];
      this.projectList = await this.db.getUserProjects(this.userId);
    },
  },
  async mounted() {
    this.projectList = await this.db.getUserProjects(this.userId);
  },
};
</script>

<template>
  <div class="projects-component">
    <span class="breadcrumb">Projects:</span>
    <table class="table">
      <tr>
        <th>id</th>
        <th>name</th>
        <th>creator</th>
      </tr>
      <tbody>
        <tr
          v-for="project in projectList"
          :key="project.id"
        >
          <td>{{project.id}}</td>
          <td>{{project.name}}</td>
          <td>{{project.creator.last_name}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
.projects-component {
  width: 100%;
  padding: 10px 20px;
}
</style>

