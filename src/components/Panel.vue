<template>
  <div class="panel">
    <Users />
    <Sonification />
  </div>
</template>

<script>
import Users from './Users.vue';
import Sonification from './Sonification.vue';

export default {
  name: 'Panel',
  components: {
    Users, Sonification,
  },
};
</script>

<style scoped>
    div.panel {
        margin: 4px;
        display: flex;
        flex-direction: column;
        width: 60px;
    }
</style>
