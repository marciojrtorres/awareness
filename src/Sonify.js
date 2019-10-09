import EventHub from './EventHub';
import {session} from './Session';

const synth = window.speechSynthesis;
const rate = 1.5;

const techniques = {
  none: {
    addition: () => {},
    removal: () => {},
    updating: () => {},
  },
  abstract: {
    addition(e) {
      EventHub.$emit('play', {
        // instrument: Session.users[e.user].instrument,
        instrument: session.currentUser.instrument,
        note: 'C3',
        // volume: 1.0 - (0.2 * (e.dir.nodes.length - 2)),
        volume: 1.0 - (0.2 * (e.distance - 2)),
        // pan: e.dir.pan,
        pan: e.pan,
        delay: 0,
      });
      EventHub.$emit('play', {
        instrument: session.currentUser.instrument,
        note: 'E3',
        volume: 1.0 - (0.2 * (e.distance - 2)),
        pan: e.pan,
        delay: 100,
      });
      EventHub.$emit('play', {
        instrument: session.currentUser.instrument,
        note: 'G3',
        volume: 1.0 - (0.2 * (e.distance - 2)),
        pan: e.pan,
        delay: 200,
      });
    },
    removal(e) {
      EventHub.$emit('play', {
        instrument: session.currentUser.instrument,
        note: 'C3',
        volume: 1.0 - (0.2 * (e.distance - 2)),
        pan: e.pan,
        delay: 200,
      });
      EventHub.$emit('play', {
        instrument: session.currentUser.instrument,
        note: 'E3',
        volume: 1.0 - (0.2 * (e.distance - 2)),
        pan: e.pan,
        delay: 100,
      });
      EventHub.$emit('play', {
        instrument: session.currentUser.instrument,
        note: 'G3',
        volume: 1.0 - (0.2 * (e.distance - 2)),
        pan: e.pan,
        delay: 0,
      });
    },
    updating(e) {

    },
  },
  speech: {
    addition(e) { // {user: int, dir: {nodes: [], pan: int}}
      const direcao = ['esquerda', 'frente', 'direita'][e.pan + 1];
      const msg = `artefato adicionado à ${direcao}`;
      const utter = new SpeechSynthesisUtterance(msg);
      utter.volume = 1.0 - (0.2 * (e.distance - 2));
      utter.rate = rate;
      synth.speak(utter);
    },
    removal(e) {
      const direcao = ['esquerda', 'frente', 'direita'][e.pan + 1];
      const msg = `artefato removido à ${direcao}`;
      const utter = new SpeechSynthesisUtterance(msg);
      utter.volume = 1.0 - (0.2 * (e.distance - 2));
      utter.rate = rate;
    },
    updating(e) {
      alert('speaking! ' + JSON.stringify(e));
    },
  },
};

export default {
  get techniques() {
    return Object.keys(techniques);
  },
  selected: 'none',
  addition(e) {
    if (e.user && e.user > 0) techniques[this.selected].addition(e);
  },
  removal(e) {
    if (e.user && e.user > 0) techniques[this.selected].removal(e);
  },
  updating(e) {
    if (e.user && e.user > 0) techniques[this.selected].updating(e);
  },
  error(e) {
    EventHub.$emit('error');
  },
};
