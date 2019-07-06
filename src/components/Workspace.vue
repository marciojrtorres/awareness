<template>
  <div class="workspace">
    <svg width="100%" :height="height" @dragover="dragOver" @drop="drop">
        <Link v-for="link in links" v-bind:key="link.index"
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
        id: _id++,
        links: [],
      }],
    };
  },
  computed: {
    links: function() {
      const links = [];
      for (const art of this.artifacts) {
        for (const link of art.links) {
          const other = this.artifact(link.artifact);
          links.push({
            x1: art.x,
            y1: art.y,
            x2: other.x,
            y2: other.y,
          });
        }
      }
      return links;
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
      this.artifacts[id].x = this.artifacts[id].x + (e.x - x);
      this.artifacts[id].y = this.artifacts[id].y + (e.y - y);
    },
    removeArtifact(e) {
      const index = this.artifacts.findIndex((a) => a === e.source.artifact);
      const art = this.artifacts.find((a) => a === e.source.artifact);
      if (index >= 0) {
        this.artifacts.splice(index, 1);
        this.artifacts.forEach((a) => {
          const lnk = a.links.findIndex((l) => l.artifact === art.id);
          if (lnk >= 0) a.links.splice(lnk, 1);
        });
      }
    },
    addArtifact(e) {
      const art = {
        name: `New Artifact`,
        x: e.source.artifact.x + 100,
        y: e.source.artifact.y + 100,
        id: _id++,
        links: [
          {
            direction: 'left',
            artifact: e.source.artifact.id,
          },
        ],
      };
      e.source.artifact.links.push({
        direction: 'right',
        artifact: art.id,
      });
      this.artifacts.push(art);
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
