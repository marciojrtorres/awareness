<template>
  <div class="workspace">
    <svg width="100%" :height="height" @dragover="dragOver" @drop="drop">
        <Button :x="15" :y="15" text="S" @click="simulate" />
        <Button :x="15" :y="35" text="R" @click="run" />
        <Link v-for="link in lines" v-bind:key="link.index"
          :x1="link.x1" :y1="link.y1" :x2="link.x2" :y2="link.y2" />
        <Artifact v-for="artifact in artifacts" :artifact="artifact"
          v-bind:key="artifact.index"
          @add="addArtifact" @remove="removeArtifact" />
    </svg>
    <pre><output>{{links}}</output></pre>
  </div>
</template>

<script>
import Artifact from './Artifact.vue';
import Link from './Link';
import Button from './Button';
import TestRunner from '../TestRunner';
import Model from '../Model';

export default {
  name: 'Workspace',
  data: function() {
    return {
      artifacts: Model.artifacts,
      links: Model.links,
    };
  },
  computed: {
    lines: function() {
      return this.links.map((link) => {
        const [one, another] = [Model.find(link[0]), Model.find(link[1])];
        return {
          x1: one.x, y1: one.y,
          x2: another.x, y2: another.y,
        };
      });
    },
  },
  methods: {
    run() {
      TestRunner.run({count: 2});
    },
    simulate() {
      TestRunner.run({count: 2, evaluate: false});
    },
    dragOver(e) {
      e.preventDefault();
    },
    drop(e) {
      e.preventDefault();
      const id = e.dataTransfer.getData('id');
      const x = parseInt(e.dataTransfer.getData('x'));
      const y = parseInt(e.dataTransfer.getData('y'));
      const art = Model.find(id);
      if (art) [art.x, art.y] = [art.x + (e.x - x), art.y + (e.y - y)];
    },
    removeArtifact(e) {
      Model.remove(e.source.id);
    },
    addArtifact(e) {
      const art = e.add || {
        name: `New Artifact`,
        x: e.source.x + 100,
        y: e.source.y + 100,
      };
      const fromId = e.source.id;
      Model.add(art, fromId);
      // alternating users
      // const index = e.user || parseInt(Math.random() * 2);
      // EventHub.$emit('sample', users[index].instrument);
    },
  },
  props: {
    width: Number,
    height: Number,
  },
  components: {
    Artifact, Link, Button,
  },
  created() {
    Model.add({name: 'ROOT', x: 100, y: 100});
    TestRunner.setup(this);
  },
};
</script>

<style scoped>
  div.workspace {
    width: 100%;
    height: 100%;
  }
  svg {
      background-color: #EEE;
  }
</style>
