<template>
  <div id="app">
    <Users />
    <Workspace :width="600" :height="500"/>
  </div>
</template>

<script>
import Workspace from './components/Workspace.vue';
import Users from './components/Users.vue';

export default {
  name: 'app',
  components: {
    Workspace, Users,
  },
};
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  display: flex;
}
</style>
