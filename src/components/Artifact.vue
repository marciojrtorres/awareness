<template>
  <g class="artifact" draggable="true" @dragstart="drag" @dblclick="rename">
    <Button :x="artifact.x + 110" :y="artifact.y + 10"
      text=">" @click="addArtifact" />
    <Button :x="artifact.x + 110" :y="artifact.y + 30"
      text="x" @click="removeArtifact" />
    <Button :x="artifact.x + 110" :y="artifact.y + 70"
      text="+" @click="addProperty" />
    <rect :x="artifact.x" :y="artifact.y"
      :filter="artifact.focused ? 'url(#focus)' : ''"
      width="100" height="80" :class="['body', `user_${artifact.user}`]" />
    <rect :x="artifact.x" :y="artifact.y"
      width="100" height="20" class="header" />
    <text :x="artifact.x + 5" :y="artifact.y + 15">{{artifact.name}}</text>
    <image :x="artifact.x" :y="artifact.y + 85" height="15" width="15"
      :href="'/images/' + (artifact.left ? '1' : 0)
      + (artifact.top ? '1' : 0)
      + (artifact.right ? '1' : 0) + '.png'"  />
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
    rename() {
      const artifact = this.artifact;
      this.$emit('rename', {source: artifact});
    },
    addArtifact() {
      const artifact = this.artifact;
      this.$emit('add', {source: artifact});
    },
    removeArtifact() {
      const artifact = this.artifact;
      this.$emit('remove', {source: artifact});
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
<style lang="sass" scoped>
  g.artifact
    rect.body
      fill: rgb(200,200,255)
      stroke: rgb(150,150,255)
    rect.body.user_0
      fill: rgb(216, 168, 208)
    rect.body.user_1
      fill: rgb(122, 202, 122)
    rect.header
      fill: rgb(150,150,255)
    circle.button
      fill: lightblue
    text.button
      fill: darkslategray
</style>
