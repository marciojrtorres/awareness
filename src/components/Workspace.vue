<template>
  <div class="workspace">
    <svg width="100%" :height="height" @dragover="dragOver" @drop="drop">
        <Link v-for="link in lines" v-bind:key="link.index"
          :x1="link.x1" :y1="link.y1" :x2="link.x2" :y2="link.y2" />
        <Artifact v-for="artifact in artifacts" :artifact="artifact"
          v-bind:key="artifact.index"
          @addArtifact="addArtifact" @removeArtifact="removeArtifact" />
    </svg>
    <output>{{links}}</output>
  </div>
</template>

<script>
import Artifact from './Artifact.vue';
import Link from './Link';
import EventHub from '../EventHub';
import {users} from '../Session';

let _id = 0;

export default {
  name: 'Workspace',
  data: function() {
    return {
      artifacts: [{
        name: 'Root',
        x: 20,
        y: 20,
        id: _id++
      }],
      links: [],
    };
  },
  computed: {
    lines: function() {
      return this.links.map(link => {
        const [one, another] = [this.artifact(link[0]), this.artifact(link[1])];
        return {
          x1: one.x,
          y1: one.y,
          x2: another.x,
          y2: another.y,
        };
      });
    },
  },
  methods: {
    artifact(id) {
      return this.artifacts.find((a) => a.id === id);
    },
    dragOver(e) {
      e.preventDefault();
    },
    drop(e) {
      e.preventDefault();
      const id = e.dataTransfer.getData('id');
      const x = parseInt(e.dataTransfer.getData('x'));
      const y = parseInt(e.dataTransfer.getData('y'));
      const art = this.artifacts.find(a => a.id === id);
      if (art) [art.x, art.y] = [art.x + (e.x - x), art.y + (e.y - y)];
    },
    removeArtifact(e) {
      const index = this.artifacts.findIndex((a) => a === e.source.artifact);
      const art = this.artifacts.find((a) => a === e.source.artifact);
      if (index >= 0) {
        this.artifacts.splice(index, 1);
        let linkIndex = -1;
        while ((linkIndex = this.links.findIndex(link => 
            link[0] === art.id || link[1] === art.id)) >= 0) {
          this.links.splice(linkIndex, 1);
        }
      }
    },
    addArtifact(e) {
      const art = {
        name: `New Artifact`,
        x: e.source.artifact.x + 100,
        y: e.source.artifact.y + 100,
        id: _id++,
      };
      this.artifacts.push(art);
      this.links.push([e.source.artifact.id, art.id]);
      // alternating users
      const index = parseInt(Math.random() * 2);
      EventHub.$emit('sample', users[index].instrument);
    },
  },
  props: {
    width: Number,
    height: Number,
  },
  components: {
    Artifact, Link,
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
