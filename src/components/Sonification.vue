<template>
  <div class="sonification">
    <h2>Tech</h2>
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
    h2 {
      font-size: 13pt;
      background-color: grey;
      text-align: center;
    }
    div.sonification p.sel {
      font-weight: bold;
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
        margin-top: 0.2em;
        text-align: center;
    }
</style>
