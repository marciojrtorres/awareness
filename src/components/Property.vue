<template>
  <g class="property">
    <rect :x="x" :y="y" width="100" height="20" class="prop" />
    <text :x="x + 5" :y="y + 15">{{name}}: {{value}}</text>
  </g>
</template>

<script>
export default {
  name: 'Property',
  props: {
    id: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: 'unamed',
    },
    value: {
      type: Object,
      default: undefined,
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  g.artifact rect.prop {
    fill: rgb(190,150,255);
  }
</style>
