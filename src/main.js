import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;
new Vue({
  render: (h) => h(App),
}).$mount('#app');

// function loadHandler(e) {
//   console.log(e);
//   const instance = CreateJS.Sound.play(e.id);
//   instance.volume = 1;
// }

// CreateJS.Sound.on('fileload', loadHandler);
// CreateJS.Sound.registerSound('./tones/C4.mp3', 'guitar|c4');
// CreateJS.Sound.registerSound('./tones/C4(1).mp3', 'piano|c4');
