<template>
  <div class="workspace">
    <svg width="100%" :height="height" @dragover="dragOver" @drop="drop">
      <defs>
        <filter id="focus" height="130%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
          <feOffset dx="0" dy="0" result="offsetblur"/>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <Button :x="15" :y="15" text="S" @click="step" />
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
import {session} from '../Session';

const movements = {
  'KeyA': 'left',
  'KeyW': 'top',
  'KeyD': 'right',
  'KeyS': 'where',
};

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
    keyup(e) {
      Model.moveFocus(movements[e.code]);
    },
    run() {
      TestRunner.run({count: 3, evaluate: false});
    },
    step() {
      TestRunner.run({count: 10, evaluate: true});
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
      const userId = session.state.selected || e.user;
      Model.remove(e.source.id, userId);
    },
    addArtifact(e) {
      const art = e.add || {
        name: `New Artifact`,
        x: e.source.x + 100,
        y: e.source.y + 100,
      };
      const fromId = e.source.id;
      const userId = session.state.selected || e.user;
      Model.add(art, fromId, userId);
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
    window.addEventListener('keyup', this.keyup);
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
