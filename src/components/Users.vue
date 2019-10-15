<template>
  <div class="users">
    <User v-for="u in session.users" :id="u.id" :name="u.name" :instrument="u.instrument"
          v-bind:key="u.index" />
  </div>
</template>

<script>
import User from './User.vue';
import {session} from '../Session.js';

export default {
  name: 'Users',
  data: function() {
    return {
      session: session.state,
    };
  },
  computed: {

  },
  methods: {

  },
  props: {

  },
  components: {
    User,
  },
};
</script>

<style scoped>
    div.users {
        display: flex;
        flex-direction: column;
        width: 60px;
    }
    div.users div {
        align-self: center;
    }
    div.users p {
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
          'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        font-size: 0.8em;
        margin-top: 0.2em;
        text-align: center;
    }
</style>
