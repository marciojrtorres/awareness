<template>
  <div class="sonification">
    <h2>Estratégia</h2>
    <p :class="{sel: tech === sel}" v-for="tech in techniques"
      :key="tech" :data-value="tech" @click="selectSonificationTechnique">
      {{tech}}
    </p>
  </div>
</template>

<script>
import Sonify from '../Sonify';

export default {
  name: 'Sonification',
  data: function() {
    return {
      sel: Sonify.selected,
      techniques: Sonify.techniques,
    };
  },
  methods: {
    selectSonificationTechnique(e) {
      this.sel = e.target.dataset['value'];
      Sonify.selected = this.sel;
      // Sonify.play({action: 'test'});
    },
  },
  filters: {
    capitalize: function(value) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
</script>

<style scoped>
    div.sonification {
      font-size: 10pt;
    }
    h2 {
      text-align: center;
      font-size: 10pt;
    }
    div.sonification p.sel {
      font-weight: bold;
      background-color: white;
    }
    div.sonification {
      display: flex;
      flex-direction: column;
      width: 60px;
    }
    div.sonification div {
      align-self: center;
    }
    div.sonification p {
      font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
        'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
      font-size: 0.8em;
      margin: 0.0em;
      margin-bottom: 0.3em;
      padding: 0.3em 0.0;
      text-align: center;
      background-color: silver;
      border: 1px solid grey;
    }
</style>
