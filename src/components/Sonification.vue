<template>
  <div class="sonification">
    <p>Sonification</p>
  </div>
</template>

<script>
export default {
  name: 'Sonification',
  data: function() {
    return {

    };
  },
};
</script>

<style scoped>
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
