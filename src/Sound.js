/* eslint-disable no-invalid-this */
import WebAudioFontPlayer from 'webaudiofont';
import EventHub from './EventHub.js';

const audioContext = new AudioContext();
const player = new WebAudioFontPlayer();

export const Notes = {
  C: [],
  Cs: [],
  D: [],
  Ds: [],
  E: [],
  F: [],
  Fs: [],
  G: [],
  Gs: [],
  A: [],
  As: [],
  B: [],
};

for (let row = 0; row <= 8; row++) {
  let c = 0;
  for (const key in Notes) {
    if (Notes.hasOwnProperty(key)) {
      Notes[key].push(row * 12 + c++);
    }
  }
}

export const Sound = (function() {
  const instruments = {
    piano: {
      file: '0000_Aspirin_sf2_file',
    },
    guitar: {
      file: '0240_Aspirin_sf2_file',
    },
  };
  const play = function(note, duration = 1, delay = 0) {
    player.adjustPreset(audioContext, window[this.name]);
    player.queueWaveTable(audioContext, audioContext.destination,
        window[this.name], audioContext.currentTime + delay, note, duration);
  };
  for (const key in instruments) {
    if (instruments.hasOwnProperty(key)) {
      const instrument = instruments[key];
      const path = `https://surikov.github.io/webaudiofontdata/sound/${instrument.file}.js`;
      const name = `_tone_${instrument.file}`;
      instrument.name = name;
      instrument.play = play;
      player.loader.startLoad(audioContext, path, name);
    }
  }
  return instruments;
}());

EventHub.$on('sample', (instrument) => {
  Sound[instrument].play(Notes.C[5], 0.5, 0.3);
  Sound[instrument].play(Notes.C[4], 0.5, 0.6);
  Sound[instrument].play(Notes.C[5], 0.5, 0.9);
});

// player.loader.waitLoad(function() {
//   player.adjustPreset(audioContext, window[sound.piano.name]);
//   player.queueWaveTable(audioContext, audioContext.destination,
//       window[sound.piano.name], 0, 12 * 4, 1);
// });
