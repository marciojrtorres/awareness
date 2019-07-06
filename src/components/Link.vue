<template>
  <line :x1="x1 + 50" :y1="y1 + 50" :x2="x2 + 50" :y2="y2 + 50" />
</template>

<script>
export default {
  name: 'Link',
  props: {
    x1: {
      type: Number,
      default: 0,
    },
    y1: {
      type: Number,
      default: 0,
    },
    x2: {
      type: Number,
      default: 0,
    },
    y2: {
      type: Number,
      default: 0,
    }
  }
};
</script>

<style scoped>
    line {
        stroke:rgb(150,150,255);
        stroke-width:2;
    }
</style>
