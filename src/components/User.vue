<template>
  <div class="user" @click="play">
    <div :class="instrument"></div>
    <p :class="{selected: state.selected === id}">{{name}}</p>
  </div>
</template>

<script>
import EventHub from '../EventHub';
import {session} from '../Session';

export default {
  name: 'User',
  data: function() {
    return {
      state: session.state,
    };
  },
  computed: {

  },
  methods: {
    play() {
      session.select(this.id);
      EventHub.$emit('sample', this.instrument);
    },
  },
  props: {
    name: String,
    instrument: String,
    id: Number,
  },
  components: {

  },
};
</script>

<style scoped>
    p {
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
          'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        font-size: 0.8em;
        margin-top: 0.2em;
        text-align: center;
    }
    p.selected {
      font-weight: bold;
    }
</style>
