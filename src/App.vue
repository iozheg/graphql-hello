<script>
import Overview from "./components/Overview.vue";
import Editor from "./components/Editor.vue";
import db from "./db";

export default {
  name: 'app',
  provide() {
    return {
      db: db
    }
  },
  components: { Overview, Editor },
  data() {
    return {
      view: 'overview',
      views: {
        overview: Overview,
        editor: Editor,
      },
      selectedUser: undefined,
    };
  },

  methods: {
    selectUser(id) {
      this.selectedUser = Number(id);
    },
    selectView(view) {
      this.view = this.views[view];
    }
  }
}
</script>

<template>
  <div id="app">
    <ul class="nav">
      <li class="nav-item">
        <a class="nav-link active" href="#" @click="selectView('overview')">Overview</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" @click="selectView('editor')">Editor</a>
      </li>
    </ul>
    <component :is="view" />
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
