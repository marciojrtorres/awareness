<template>
  <div class="user" @click="play">
    <div :class="instrument"></div>
    <p>{{name}}</p>
  </div>
</template>

<script>
import EventHub from '../EventHub';

export default {
  name: 'User',
  data: function() {
    return {
    };
  },
  computed: {

  },
  methods: {
    play() {
      EventHub.$emit('sample', this.instrument);
    },
  },
  props: {
    name: String,
    instrument: String,
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
</style>
