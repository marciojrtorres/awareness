/* eslint-disable no-console */
import EventHub from './EventHub';
import {session} from './Session';

const synth = window.speechSynthesis;
const rate = {
  options: [0.5, 0.7, 1.0, 1.3, 1.6, 1.9],
  selected: 3,
  get value() {
    return this.options[this.selected];
  },
  increase() {
    this.selected += (this.selected < this.options.length - 1 ? 1 : 0);
  },
  decrease() {
    this.selected -= (this.selected > 0 ? 1 : 0);
  },
};

const volume = [1.00, 0.60, 0.24, 0.10];
const notes = ['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3'];
// distance 1 + 1 / 2 = 1
// distance 2 + 1 / 2 = 1
// distance 3 + 1 / 2 = 2
// distance 4 + 1 / 2 = 2

const techniques = {
  nenhuma: {
    addition: () => {},
    removal: () => {},
    updating: () => {},
    error: () => {},
    accept: () => {},
    reject: () => {},
  },
  earcons1: {
    greeting(e) {
      let ms = 0;
      session.state.users.forEach((u) => {
        if (u.id > 0) {
          setTimeout(() => {
            this.test({user: u.id});
            const utter = new SpeechSynthesisUtterance(u.name);
            utter.rate = rate.value;
            synth.speak(utter);
          }, ms);
          ms += 2000;
        }
      });
    },
    addition(e) {
      EventHub.$emit('play', {
        instrument: session.instrument(e.user),
        note: 'C3',
        // volume: 1.0 - (0.2 * (e.distance - 2)),
        volume: volume[Number.parseInt((e.distance + 1) / 2)] || 0.1,
        pan: e.pan || 0,
        delay: 0,
      });
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
    accept(e) {
      EventHub.$emit('accept');
    },
    reject(e) {
      EventHub.$emit('reject');
    },
    test(e) {
      const instrument = session.instrument(e.user);
      EventHub.$emit('play', {
        instrument,
        note: 'C4',
        volume: 0.8,
        pan: 0,
        delay: 0,
      });
      EventHub.$emit('play', {
        instrument,
        note: 'D4',
        volume: 0.8,
        pan: 0,
        delay: 150,
      });
    },
  },
  earcons2: {
    greeting(e) {
      let ms = 0;
      session.state.users.forEach((u) => {
        if (u.id > 0) {
          setTimeout(() => {
            this.test({user: u.id});
            // this.speech(u.name);
          }, ms);
          ms += 2000;
        }
      });
    },
    addition(e) {
      const step = 1.0 / (e.distance + 1);
      EventHub.$emit('play', {
        instrument: session.instrument(e.user),
        note: notes[0],
        volume: step,
        pan: e.pan || 0,
        delay: 0,
      });
      console.log('step', step);
      for (let i = 1; i <= e.distance; i++) {
        console.log('step', (i + 1) * step);
        EventHub.$emit('play', {
          instrument: session.instrument(e.user),
          note: notes[i],
          volume: (i + 1) * step,
          pan: e.pan,
          delay: i * 150,
        });
      }
    },
    removal(e) {
      const step = 1.0 / (e.distance + 1);
      EventHub.$emit('play', {
        instrument: session.instrument(e.user),
        note: notes[notes.length - 1],
        volume: 1.0,
        pan: e.pan || 0,
        delay: 0,
      });
      for (let i = 1; i <= e.distance; i++) {
        console.log('step', 1.0 - step * i);
        EventHub.$emit('play', {
          instrument: session.instrument(e.user),
          note: notes[notes.length - 1 - i],
          volume: 1.0 - (step * i),
          pan: e.pan,
          delay: i * 150,
        });
      }
    },
    updating(e) {
      EventHub.$emit('play', {
        instrument: session.instrument(e.user),
        note: notes[2],
        volume: 0.5,
        pan: e.pan || 0,
        delay: 0,
      });
      for (let i = 1; i <= e.distance; i++) {
        EventHub.$emit('play', {
          instrument: session.instrument(e.user),
          note: notes[2],
          volume: 0.5,
          pan: e.pan,
          delay: i * 150,
        });
      }
    },
    error(e) {
      EventHub.$emit('error');
    },
    accept(e) {
      EventHub.$emit('accept');
    },
    reject(e) {
      EventHub.$emit('reject');
    },
    test(e) {
      const instrument = session.instrument(e.user);
      EventHub.$emit('play', {
        instrument,
        note: 'C4',
        volume: 0.8,
        pan: 0,
        delay: 0,
      });
      EventHub.$emit('play', {
        instrument,
        note: 'D4',
        volume: 0.8,
        pan: 0,
        delay: 150,
      });
    },
  },
  falasinte: {
    greeting(e) {
      let msg = 'Estão presentes ';
      session.state.users.forEach((u) => {
        if (u.id > 0) {
          msg += u.name + ' ';
        }
      });
      const utter = new SpeechSynthesisUtterance(msg);
      utter.rate = rate.value;
      synth.speak(utter);
    },
    play(e) {
      this[e.action](e);
    },
    addition(e) { // {user: int, dir: {nodes: [], pan: int}}
      const direction = ['esquerda', 'frente', 'direita'][e.pan + 1];
      const username = session.user(e.user).name;
      const msg = e.distance && e.distance > 0 ?
        `${username} incluiu uma tabela à ${direction}` :
        `${username} incluiu essa tabela`;
      const utter = new SpeechSynthesisUtterance(msg);
      utter.volume = volume[Number.parseInt((e.distance + 1) / 2)] || 0.1,
      utter.rate = rate.value;
      synth.speak(utter);
    },
    removal(e) {
      const direction = ['esquerda', 'frente', 'direita'][e.pan + 1];
      const username = session.user(e.user).name;
      const msg = `${username} excluiu `
        + (direction ? 'uma tabela ' : 'essa tabela ')
        + (direction ? `a ${direction}` : '');
      const utter = new SpeechSynthesisUtterance(msg);
      utter.volume = volume[Number.parseInt((e.distance + 1) / 2)] || 0.1,
      utter.rate = rate.value;
      synth.speak(utter);
    },
    updating(e) {
      const direction = ['esquerda', 'frente', 'direita'][e.pan + 1];
      const username = session.user(e.user).name;
      const msg = `${username} alterou ${e.distance > 0
        ? 'uma' : 'essa'} tabela` + (e.distance > 0 ? ` à ${direction}` : '');
      const utter = new SpeechSynthesisUtterance(msg);
      utter.volume = volume[Number.parseInt((e.distance + 1) / 2)] || 0.1,
      utter.rate = rate.value;
      synth.speak(utter);
    },
    error(e) {
      EventHub.$emit('error');
    },
    accept(e) {
      EventHub.$emit('accept');
    },
    reject(e) {
      EventHub.$emit('reject');
    },
    test(e) {
      const msg = 'Fala ativada!';
      const utter = new SpeechSynthesisUtterance(msg);
      utter.rate = rate.value;
      synth.speak(utter);
    },
  },
  falagrava: {
    greeting(e) {
      const waves = [];
      session.state.users.forEach((u) => {
        if (u.id > 0) {
          waves.push(`/recordings/${u.name.toLocaleLowerCase()}/greetings.wav`);
        }
      });
      if (waves.length === 0) return;
      let i = 0;
      const audio = new Audio(waves[i++]);
      audio.playbackRate = rate.value;
      audio.addEventListener('ended', () => {
        if (i < waves.length) {
          audio.src = waves[i++];
          audio.play();
        }
      });
      audio.play().catch((e) => {
        console.error(e);
      });
    },
    addition(e) {
      const direction = ['-left', '-front', '-right'][e.pan + 1];
      const user = session.user(e.user).name.toLocaleLowerCase();
      const path = `/recordings/${user}/`
        + `inclui-${e.distance > 0 ? 'uma' : 'essa'}-tabela`
        + `${e.distance > 0 ? direction : ''}.wav`;
      const audio = new Audio(path);
      audio.playbackRate = rate.value;
      audio.volume = 1.0 - (e.distance * 0.2);
      audio.play().catch((e) => {
        console.error(e, path);
      });
    },
    removal(e) {
      const direction = ['-left', '-front', '-right'][e.pan + 1];
      const user = session.user(e.user).name.toLocaleLowerCase();
      const path = `/recordings/${user}/`
        + `exclui-${e.distance > 0 ? 'uma' : 'essa'}-tabela`
        + `${e.distance > 0 ? direction : ''}.wav`;
      const audio = new Audio(path);
      audio.playbackRate = rate.value;
      audio.volume = 1.0 - (e.distance * 0.2);
      audio.play().catch((e) => {
        console.error(e, path);
      });
    },
    updating(e) {
      const direction = ['-left', '-front', '-right'][e.pan + 1];
      const user = session.user(e.user).name.toLocaleLowerCase();
      const path = `/recordings/${user}/`
        + `alterei-${e.distance > 0 ? 'uma' : 'essa'}-tabela`
        + `${e.distance > 0 ? direction : ''}.wav`;
      const audio = new Audio(path);
      audio.playbackRate = rate.value;
      audio.volume = 1.0 - (e.distance * 0.2);
      audio.play().catch((e) => {
        console.error(e, path);
      });
    },
    error(e) {
      EventHub.$emit('error');
    },
    accept(e) {
      EventHub.$emit('accept');
    },
    reject(e) {
      EventHub.$emit('reject');
    },
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
  accept() {

  },
  reject() {

  },
  play(e) {
    const tech = techniques[this.selected];
    if (e.action in tech) tech[e.action](e);
    else console.error(`Action ${e.action} not found in ${this.selected}`);
  },
  test(e) {/* {user: Number} */
    techniques.acorde.test(e);
  },
  speech(msg) {
    const utter = new SpeechSynthesisUtterance(msg);
    utter.rate = rate.value;
    synth.speak(utter);
  },
  increaseSpeechRate() {
    rate.increase();
    const utter = new SpeechSynthesisUtterance(`Velocidade aumentada`);
    utter.rate = rate.value;
    synth.speak(utter);
  },
  decreaseSpeechRate() {
    rate.decrease();
    const utter = new SpeechSynthesisUtterance(`Velocidade reduzida`);
    utter.rate = rate.value;
    synth.speak(utter);
  },
};
