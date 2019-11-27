/* eslint-disable no-console */

import EventHub from './EventHub';
import {session} from './Session';
import {log} from 'util';

const synth = window.speechSynthesis;
const rate = 1.5;
const volume = [1.00, 0.60, 0.24, 0.10];
// distance 1 + 1 / 2 = 1
// distance 2 + 1 / 2 = 1
// distance 3 + 1 / 2 = 2
// distance 4 + 1 / 2 = 2

const techniques = {
  none: {
    addition: () => {},
    removal: () => {},
    updating: () => {},
    error: () => { /* error swallowing */}
  },
  abstract: {
    addition(e) {
      EventHub.$emit('play', {
        instrument: session.instrument(e.user),
        note: 'C3',
        // volume: 1.0 - (0.2 * (e.distance - 2)),
        volume: volume[Number.parseInt((e.distance + 1) / 2)] || 0.1,
        pan: e.pan || 0,
        delay: 0,
      });
      if (!e.distance || e.distance < 1) {
        EventHub.$emit('play', {
            instrument: session.instrument(e.user),
            note: 'E3',
            volume: 1.0 - (0.2 * (e.distance - 2)),
            pan: e.pan,
            delay: 100,
        });
      }
      EventHub.$emit('play', {
        instrument: session.instrument(e.user),
        note: 'G3',
        volume: volume[Number.parseInt((e.distance + 1) / 2)] || 0.1,
        pan: e.pan || 0,
        delay: 200,
      });
    },
    removal(e) {
      EventHub.$emit('play', {
        instrument: session.currentUser.instrument,
        note: 'C3',
        volume: volume[Number.parseInt((e.distance + 1) / 2)] || 0.1,
        pan: e.pan,
        delay: 200,
      });
      // EventHub.$emit('play', {
      //   instrument: session.currentUser.instrument,
      //   note: 'E3',
      //   volume: 1.0 - (0.2 * (e.distance - 2)),
      //   pan: e.pan,
      //   delay: 100,
      // });
      EventHub.$emit('play', {
        instrument: session.currentUser.instrument,
        note: 'G3',
        volume: volume[Number.parseInt((e.distance + 1) / 2)] || 0.1,
        pan: e.pan,
        delay: 0,
      });
    },
    updating(e) {
      EventHub.$emit('play', {
        instrument: session.instrument(e.user),
        note: 'C3',
        volume: volume[Number.parseInt((e.distance + 1) / 2)] || 0.1,
        pan: e.pan,
        delay: 0,
      });
    },
    error(e) {
      EventHub.$emit('error');
    },
    test(e) {
      EventHub.$emit('play', {
        instrument: session.currentUser.instrument,
        note: 'C4',
        volume: 0.7,
        pan: 0,
        delay: 0,
      });
      EventHub.$emit('play', {
        instrument: session.instrument(e.user),
        note: 'G3',
        volume: 1.0 - (0.2 * (e.distance - 2)),
        pan: e.pan,
        delay: 0,
      });
    },
  },
  speech: {
    play(e) {
      this[e.action](e);
    },
    addition(e) { // {user: int, dir: {nodes: [], pan: int}}
      const direction = ['esquerda', 'frente', 'direita'][e.pan + 1];
      const username = session.user(e.user).name;
      const msg = e.distance && e.distance > 0 ?
        `${username} incluiu tabela à ${direction}` :
        `${username} incluiu esta tabela`;
      const utter = new SpeechSynthesisUtterance(msg);
      utter.volume = volume[Number.parseInt((e.distance + 1) / 2)] || 0.1,
      utter.rate = rate;
      synth.speak(utter);
    },
    removal(e) {
      const direction = ['esquerda', 'frente', 'direita'][e.pan + 1];
      const username = session.user(e.user).name;
      const msg = `${username} excluiu tabela à ${direction}`;
      const utter = new SpeechSynthesisUtterance(msg);
      utter.volume = volume[Number.parseInt((e.distance + 1) / 2)] || 0.1,
      utter.rate = rate;
      synth.speak(utter);
    },
    updating(e) {
      const direction = ['esquerda', 'frente', 'direita'][e.pan + 1];
      const username = session.user(e.user).name;
      const msg = `${username} alterou ${e.distance > 0 ? 'uma' : 'esta'} tabela`
        + (e.distance > 0 ? ` à ${direction}` : '');
      const utter = new SpeechSynthesisUtterance(msg);
      utter.volume = volume[Number.parseInt((e.distance + 1) / 2)] || 0.1,
      utter.rate = rate;
      synth.speak(utter);
    },
    error(e) {
      const msg = e.description;
      const utter = new SpeechSynthesisUtterance(msg);
      utter.rate = rate;
      synth.speak(utter);
    },
    test(e) {
      const msg = 'Fala ativada!';
      const utter = new SpeechSynthesisUtterance(msg);
      utter.rate = rate;
      synth.speak(utter);
    },
  },
  recorded: {
    test(e) {
      const user = session.currentUser.name.toLocaleLowerCase();
      const path = `/recordings/${user}/greeting.mp3`;
      const audio = new Audio(path);
      audio.play().catch((e) => {
        console.error(e);
      });
    },
  },
};

export default {
  get techniques() {
    return Object.keys(techniques);
  },
  selected: 'none',
  play(e) {
    const tech = techniques[this.selected];
    if (e.action in tech) tech[e.action](e);
    else console.error(`Action ${e.action} not found in ${this.selected}`);
  },
  speech(msg) {
    const utter = new SpeechSynthesisUtterance(msg);
    utter.rate = rate;
    synth.speak(utter);
  },
};
