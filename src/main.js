import Vue from 'vue';
import App from './App.vue';
import Sound from './Sound.js';

Vue.config.productionTip = false;
new Vue({
  render: (h) => h(App),
}).$mount('#app');
