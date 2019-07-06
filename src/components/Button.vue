<template>
  <g class="button" @click="$emit('click')">
    <circle :cx="x" :cy="y" r="8" class="button"/>
    <text :x="x - 5" :y="y + 5" class="button">{{text}}</text>
  </g>
</template>

<script>
export default {
  name: 'Button',
  methods: {

  },
  data: function() {
    return {};
  },
  props: {
    text: {
      type: String,
      default: '',
    },
    x: {
      type: Number,
      default: 0,
    },
    y: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style scoped>
  g.button circle {
    fill: lightblue;
  }
  g.button text {
    fill: darkslategray;
    font-family: 'Courier New', Courier, monospace;
    font-weight: bold;
    font-size: 15px;
  }
</style>
