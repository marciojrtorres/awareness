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
// import EventHub from '../EventHub';
// import {users} from '../Session';
import Button from './Button';
import Bot from '../Bot';

let _id = 0;
const ROOT = {
  name: 'ROOT',
  x: 800,
  y: 600,
  id: _id++,
};

export default {
  name: 'Workspace',
  data: function() {
    return {
      artifacts: [ROOT],
      links: [],
    };
  },
  computed: {
    lines: function() {
      return this.links.map((link) => {
        const [one, another] = [this.artifact(link[0]), this.artifact(link[1])];
        return {
          x1: one.x, y1: one.y,
          x2: another.x, y2: another.y,
        };
      });
    },
  },
  methods: {
    run() {
      Bot.run(ROOT, 20);
    },
    simulate() {
      Bot.simulate(ROOT, 20);
    },
    artifact(id) {
      return this.artifacts.find((a) => a.id == id);
    },
    dragOver(e) {
      e.preventDefault();
    },
    drop(e) {
      e.preventDefault();
      const id = e.dataTransfer.getData('id');
      const x = parseInt(e.dataTransfer.getData('x'));
      const y = parseInt(e.dataTransfer.getData('y'));
      const art = this.artifact(id);
      if (art) [art.x, art.y] = [art.x + (e.x - x), art.y + (e.y - y)];
    },
    removeArtifact(e) {
      const art = e.source;
      const index = this.artifacts.findIndex((a) => a.id == art.id);
      if (index >= 0) {
        this.artifacts.splice(index, 1);
        let linkIndex = -1;
        while ((linkIndex = this.links.findIndex((link) =>
          link[0] === art.id || link[1] === art.id)) >= 0) {
          this.links.splice(linkIndex, 1);
        }
      }
    },
    addArtifact(e) {
      const art = e.add || {
        name: `New Artifact`,
        x: e.source.x + 100,
        y: e.source.y + 100,
      };
      art.id = _id++;
      this.artifacts.push(art);
      this.links.push([e.source.id, art.id]);
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
    Bot.onCreateArtifact = (e) => {
      this.addArtifact({
        source: e.source,
        add: e.add,
        user: e.user,
      });
    };
    Bot.onDropArtifact = (e) => {
      this.removeArtifact({
        source: e.source,
      });
    };
  },
};

// const lnk = {
//   from: {
//     art: 1,
//     edge: 1,
//   },
//   to: {
//     art: 4,
//     edge: 1
//   }
// };
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
