<template>
  <div id="app" v-if="loaded === true">
    <!-- <Users /> -->
    <Panel/>
    <Workspace :width="600" :height="800"/>
  </div>
  <p v-else>Loading...</p>
</template>

<script>
import Workspace from './components/Workspace.vue';
// import Users from './components/Users.vue';
import Panel from './components/Panel.vue';
import Sound from './Sound.js';

export default {
  name: 'app',
  data: function() {
    return {
      loaded: false,
    };
  },
  components: {
    Workspace, Panel,
  },
  created() {
    Sound.init(() => {
      this.loaded = true;
    });
  },
};
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  display: flex;
}
</style>
