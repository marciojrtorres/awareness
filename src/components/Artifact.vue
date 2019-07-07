<template>
  <g class="artifact" draggable="true" @dragstart="drag">
    <Button :x="artifact.x + 110" :y="artifact.y + 10"
      text=">" @click="addArtifact" />
    <Button :x="artifact.x + 110" :y="artifact.y + 30"
      text="x" @click="removeArtifact" />
    <Button :x="artifact.x + 110" :y="artifact.y + 50"
      text="+" @click="addProperty" />
    <rect :x="artifact.x" :y="artifact.y"
      width="100" height="80" class="body" />
    <rect :x="artifact.x" :y="artifact.y"
      width="100" height="20" class="header" />
    <text :x="artifact.x + 5" :y="artifact.y + 15">{{artifact.name}}</text>
    <Property v-for="prop in properties"
      :x="prop.x" :y="prop.y" v-bind:key="prop.index" />
  </g>
</template>

<script>
import Property from './Property';
import Button from './Button';

export default {
  name: 'Artifact',
  methods: {
    addArtifact() {
      this.$emit('add', {source: this});
    },
    removeArtifact() {
      this.$emit('remove', {source: this});
    },
    addProperty() {
      const n = this.properties.length + 1;
      this.properties.push({
        x: this.artifact.x,
        y: this.artifact.y + (n * 20),
      });
    },
    drag(e) {
      e.dataTransfer.setData('id', this.artifact.id);
      e.dataTransfer.setData('x', e.x);
      e.dataTransfer.setData('y', e.y);
    },
  },
  data: function() {
    return {
      properties: [],
    };
  },
  props: ['artifact'],
  components: {
    Property,
    Button,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  g.artifact rect.body {
    fill: rgb(200,200,255);
    stroke: rgb(150,150,255);
  }
  g.artifact rect.header {
    fill: rgb(150,150,255);
  }
  g.artifact circle.button {
    fill: lightblue;
  }
  g.artifact text.button {
    fill: darkslategray;
  }
</style>
