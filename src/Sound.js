/* eslint-disable require-jsdoc */
import CreateJS from './CreateJS.js';
import EventHub from './EventHub.js';
import {ERROR_SOUND_2_BASE64_DATA,
  ACCEPTED_SOUND_BASE64_DATA,
  REJECTED_SOUND_BASE64_DATA} from './Sounds.js';

// const error = new Audio(ERROR_SOUND_BASE64_DATA);
const error = new Audio(ERROR_SOUND_2_BASE64_DATA);
const accept = new Audio(ACCEPTED_SOUND_BASE64_DATA);
const reject = new Audio(REJECTED_SOUND_BASE64_DATA);

export default {
  play({instrument, note, volume = 1, pan = 0, delay = 0}) {
    const options = new CreateJS.PlayPropsConfig().set({volume, delay, pan});
    // console.debug(options);
    CreateJS.Sound.play(`${instrument}|${note}`, options);
  },
  ready: false,
  init(onReady) {
    registerSounds(() => {
      this.ready = true;
      this.play({instrument: 'piano', note: 'C2', delay: 100});
      this.play({instrument: 'piano', note: 'C3', delay: 500});
      this.play({instrument: 'piano', note: 'C4', delay: 1000});
      if (onReady) onReady();
    });
    CreateJS.Sound.activePlugin.context.resume();
    EventHub.$on('sample', (instrument) => {
      this.play({instrument, note: 'E3', delay: 0});
    });
    EventHub.$on('play', (params) => {
      this.play(params);
    });
    EventHub.$on('error', () => {
      this.error();
    });
    EventHub.$on('accept', () => {
      this.accept();
    });
    EventHub.$on('reject', () => {
      this.reject();
    });
  },
  sample() {
    CreateJS.Sound.play(`flute|C4`, {duration: 1000});
  },
  error() {
    error.play();
  },
  accept() {
    accept.play();
  },
  reject() {
    reject.play();
  },
};

function registerSounds(callback) {
  let count = 0;

  CreateJS.Sound.on('fileload', (e) => {
    if (++count === 122) callback();
  });

  CreateJS.Sound.registerSound('./tones/guitar/A1.mp3', 'guitar|A1');
  CreateJS.Sound.registerSound('./tones/guitar/A2.mp3', 'guitar|A2');
  CreateJS.Sound.registerSound('./tones/guitar/A3.mp3', 'guitar|A3');
  CreateJS.Sound.registerSound('./tones/guitar/As1.mp3', 'guitar|As1');
  CreateJS.Sound.registerSound('./tones/guitar/As2.mp3', 'guitar|As2');
  CreateJS.Sound.registerSound('./tones/guitar/As3.mp3', 'guitar|As3');
  CreateJS.Sound.registerSound('./tones/guitar/B1.mp3', 'guitar|B1');
  CreateJS.Sound.registerSound('./tones/guitar/B2.mp3', 'guitar|B2');
  CreateJS.Sound.registerSound('./tones/guitar/B3.mp3', 'guitar|B3');
  CreateJS.Sound.registerSound('./tones/guitar/C2.mp3', 'guitar|C2');
  CreateJS.Sound.registerSound('./tones/guitar/C3.mp3', 'guitar|C3');
  CreateJS.Sound.registerSound('./tones/guitar/C4.mp3', 'guitar|C4');
  CreateJS.Sound.registerSound('./tones/guitar/Cs2.mp3', 'guitar|Cs2');
  CreateJS.Sound.registerSound('./tones/guitar/Cs3.mp3', 'guitar|Cs3');
  CreateJS.Sound.registerSound('./tones/guitar/Cs4.mp3', 'guitar|Cs4');
  CreateJS.Sound.registerSound('./tones/guitar/D1.mp3', 'guitar|D1');
  CreateJS.Sound.registerSound('./tones/guitar/D2.mp3', 'guitar|D2');
  CreateJS.Sound.registerSound('./tones/guitar/D3.mp3', 'guitar|D3');
  CreateJS.Sound.registerSound('./tones/guitar/D4.mp3', 'guitar|D4');
  CreateJS.Sound.registerSound('./tones/guitar/Ds1.mp3', 'guitar|Ds1');
  CreateJS.Sound.registerSound('./tones/guitar/Ds2.mp3', 'guitar|Ds2');
  CreateJS.Sound.registerSound('./tones/guitar/Ds3.mp3', 'guitar|Ds3');
  CreateJS.Sound.registerSound('./tones/guitar/E1.mp3', 'guitar|E1');
  CreateJS.Sound.registerSound('./tones/guitar/E2.mp3', 'guitar|E2');
  CreateJS.Sound.registerSound('./tones/guitar/E3.mp3', 'guitar|E3');
  CreateJS.Sound.registerSound('./tones/guitar/F1.mp3', 'guitar|F1');
  CreateJS.Sound.registerSound('./tones/guitar/F2.mp3', 'guitar|F2');
  CreateJS.Sound.registerSound('./tones/guitar/F3.mp3', 'guitar|F3');
  CreateJS.Sound.registerSound('./tones/guitar/Fs1.mp3', 'guitar|Fs1');
  CreateJS.Sound.registerSound('./tones/guitar/Fs2.mp3', 'guitar|Fs2');
  CreateJS.Sound.registerSound('./tones/guitar/Fs3.mp3', 'guitar|Fs3');
  CreateJS.Sound.registerSound('./tones/guitar/G1.mp3', 'guitar|G1');
  CreateJS.Sound.registerSound('./tones/guitar/G2.mp3', 'guitar|G2');
  CreateJS.Sound.registerSound('./tones/guitar/G3.mp3', 'guitar|G3');
  CreateJS.Sound.registerSound('./tones/guitar/Gs1.mp3', 'guitar|Gs1');
  CreateJS.Sound.registerSound('./tones/guitar/Gs2.mp3', 'guitar|Gs2');
  CreateJS.Sound.registerSound('./tones/guitar/Gs3.mp3', 'guitar|Gs3');

  CreateJS.Sound.registerSound('./tones/piano/A0.mp3', 'piano|A0');
  CreateJS.Sound.registerSound('./tones/piano/A1.mp3', 'piano|A1');
  CreateJS.Sound.registerSound('./tones/piano/A2.mp3', 'piano|A2');
  CreateJS.Sound.registerSound('./tones/piano/A3.mp3', 'piano|A3');
  CreateJS.Sound.registerSound('./tones/piano/A4.mp3', 'piano|A4');
  CreateJS.Sound.registerSound('./tones/piano/A5.mp3', 'piano|A5');
  CreateJS.Sound.registerSound('./tones/piano/A6.mp3', 'piano|A6');
  CreateJS.Sound.registerSound('./tones/piano/As0.mp3', 'piano|As0');
  CreateJS.Sound.registerSound('./tones/piano/As1.mp3', 'piano|As1');
  CreateJS.Sound.registerSound('./tones/piano/As2.mp3', 'piano|As2');
  CreateJS.Sound.registerSound('./tones/piano/As3.mp3', 'piano|As3');
  CreateJS.Sound.registerSound('./tones/piano/As4.mp3', 'piano|As4');
  CreateJS.Sound.registerSound('./tones/piano/As5.mp3', 'piano|As5');
  CreateJS.Sound.registerSound('./tones/piano/As6.mp3', 'piano|As6');
  CreateJS.Sound.registerSound('./tones/piano/B0.mp3', 'piano|B0');
  CreateJS.Sound.registerSound('./tones/piano/B1.mp3', 'piano|B1');
  CreateJS.Sound.registerSound('./tones/piano/B2.mp3', 'piano|B2');
  CreateJS.Sound.registerSound('./tones/piano/B3.mp3', 'piano|B3');
  CreateJS.Sound.registerSound('./tones/piano/B4.mp3', 'piano|B4');
  CreateJS.Sound.registerSound('./tones/piano/B5.mp3', 'piano|B5');
  CreateJS.Sound.registerSound('./tones/piano/B6.mp3', 'piano|B6');
  CreateJS.Sound.registerSound('./tones/piano/C0.mp3', 'piano|C0');
  CreateJS.Sound.registerSound('./tones/piano/C1.mp3', 'piano|C1');
  CreateJS.Sound.registerSound('./tones/piano/C2.mp3', 'piano|C2');
  CreateJS.Sound.registerSound('./tones/piano/C3.mp3', 'piano|C3');
  CreateJS.Sound.registerSound('./tones/piano/C4.mp3', 'piano|C4');
  CreateJS.Sound.registerSound('./tones/piano/C5.mp3', 'piano|C5');
  CreateJS.Sound.registerSound('./tones/piano/C6.mp3', 'piano|C6');
  CreateJS.Sound.registerSound('./tones/piano/C7.mp3', 'piano|C7');
  CreateJS.Sound.registerSound('./tones/piano/Cs0.mp3', 'piano|Cs0');
  CreateJS.Sound.registerSound('./tones/piano/Cs1.mp3', 'piano|Cs1');
  CreateJS.Sound.registerSound('./tones/piano/Cs2.mp3', 'piano|Cs2');
  CreateJS.Sound.registerSound('./tones/piano/Cs3.mp3', 'piano|Cs3');
  CreateJS.Sound.registerSound('./tones/piano/Cs4.mp3', 'piano|Cs4');
  CreateJS.Sound.registerSound('./tones/piano/Cs5.mp3', 'piano|Cs5');
  CreateJS.Sound.registerSound('./tones/piano/Cs6.mp3', 'piano|Cs6');
  CreateJS.Sound.registerSound('./tones/piano/D0.mp3', 'piano|D0');
  CreateJS.Sound.registerSound('./tones/piano/D1.mp3', 'piano|D1');
  CreateJS.Sound.registerSound('./tones/piano/D2.mp3', 'piano|D2');
  CreateJS.Sound.registerSound('./tones/piano/D3.mp3', 'piano|D3');
  CreateJS.Sound.registerSound('./tones/piano/D4.mp3', 'piano|D4');
  CreateJS.Sound.registerSound('./tones/piano/D5.mp3', 'piano|D5');
  CreateJS.Sound.registerSound('./tones/piano/D6.mp3', 'piano|D6');
  CreateJS.Sound.registerSound('./tones/piano/Ds0.mp3', 'piano|Ds0');
  CreateJS.Sound.registerSound('./tones/piano/Ds1.mp3', 'piano|Ds1');
  CreateJS.Sound.registerSound('./tones/piano/Ds2.mp3', 'piano|Ds2');
  CreateJS.Sound.registerSound('./tones/piano/Ds3.mp3', 'piano|Ds3');
  CreateJS.Sound.registerSound('./tones/piano/Ds4.mp3', 'piano|Ds4');
  CreateJS.Sound.registerSound('./tones/piano/Ds5.mp3', 'piano|Ds5');
  CreateJS.Sound.registerSound('./tones/piano/Ds6.mp3', 'piano|Ds6');
  CreateJS.Sound.registerSound('./tones/piano/E0.mp3', 'piano|E0');
  CreateJS.Sound.registerSound('./tones/piano/E1.mp3', 'piano|E1');
  CreateJS.Sound.registerSound('./tones/piano/E2.mp3', 'piano|E2');
  CreateJS.Sound.registerSound('./tones/piano/E3.mp3', 'piano|E3');
  CreateJS.Sound.registerSound('./tones/piano/E4.mp3', 'piano|E4');
  CreateJS.Sound.registerSound('./tones/piano/E5.mp3', 'piano|E5');
  CreateJS.Sound.registerSound('./tones/piano/E6.mp3', 'piano|E6');
  CreateJS.Sound.registerSound('./tones/piano/F0.mp3', 'piano|F0');
  CreateJS.Sound.registerSound('./tones/piano/F1.mp3', 'piano|F1');
  CreateJS.Sound.registerSound('./tones/piano/F2.mp3', 'piano|F2');
  CreateJS.Sound.registerSound('./tones/piano/F3.mp3', 'piano|F3');
  CreateJS.Sound.registerSound('./tones/piano/F4.mp3', 'piano|F4');
  CreateJS.Sound.registerSound('./tones/piano/F5.mp3', 'piano|F5');
  CreateJS.Sound.registerSound('./tones/piano/F6.mp3', 'piano|F6');
  CreateJS.Sound.registerSound('./tones/piano/Fs0.mp3', 'piano|Fs0');
  CreateJS.Sound.registerSound('./tones/piano/Fs1.mp3', 'piano|Fs1');
  CreateJS.Sound.registerSound('./tones/piano/Fs2.mp3', 'piano|Fs2');
  CreateJS.Sound.registerSound('./tones/piano/Fs3.mp3', 'piano|Fs3');
  CreateJS.Sound.registerSound('./tones/piano/Fs4.mp3', 'piano|Fs4');
  CreateJS.Sound.registerSound('./tones/piano/Fs5.mp3', 'piano|Fs5');
  CreateJS.Sound.registerSound('./tones/piano/Fs6.mp3', 'piano|Fs6');
  CreateJS.Sound.registerSound('./tones/piano/G0.mp3', 'piano|G0');
  CreateJS.Sound.registerSound('./tones/piano/G1.mp3', 'piano|G1');
  CreateJS.Sound.registerSound('./tones/piano/G2.mp3', 'piano|G2');
  CreateJS.Sound.registerSound('./tones/piano/G3.mp3', 'piano|G3');
  CreateJS.Sound.registerSound('./tones/piano/G4.mp3', 'piano|G4');
  CreateJS.Sound.registerSound('./tones/piano/G5.mp3', 'piano|G5');
  CreateJS.Sound.registerSound('./tones/piano/G6.mp3', 'piano|G6');
  CreateJS.Sound.registerSound('./tones/piano/Gs0.mp3', 'piano|Gs0');
  CreateJS.Sound.registerSound('./tones/piano/Gs1.mp3', 'piano|Gs1');
  CreateJS.Sound.registerSound('./tones/piano/Gs2.mp3', 'piano|Gs2');
  CreateJS.Sound.registerSound('./tones/piano/Gs3.mp3', 'piano|Gs3');
  CreateJS.Sound.registerSound('./tones/piano/Gs4.mp3', 'piano|Gs4');
  CreateJS.Sound.registerSound('./tones/piano/Gs5.mp3', 'piano|Gs5');
  CreateJS.Sound.registerSound('./tones/piano/Gs6.mp3', 'piano|Gs6');


  CreateJS.Sound.registerSound('./tones/harp/A2.mp3', 'harp|A2');
  CreateJS.Sound.registerSound('./tones/harp/A4.mp3', 'harp|A4');
  CreateJS.Sound.registerSound('./tones/harp/A6.mp3', 'harp|A6');
  CreateJS.Sound.registerSound('./tones/harp/B1.mp3', 'harp|B1');
  CreateJS.Sound.registerSound('./tones/harp/B3.mp3', 'harp|B3');
  CreateJS.Sound.registerSound('./tones/harp/B5.mp3', 'harp|B5');
  CreateJS.Sound.registerSound('./tones/harp/B6.mp3', 'harp|B6');
  CreateJS.Sound.registerSound('./tones/harp/C3.mp3', 'harp|C3');
  CreateJS.Sound.registerSound('./tones/harp/C5.mp3', 'harp|C5');
  CreateJS.Sound.registerSound('./tones/harp/D2.mp3', 'harp|D2');
  CreateJS.Sound.registerSound('./tones/harp/D4.mp3', 'harp|D4');
  CreateJS.Sound.registerSound('./tones/harp/D6.mp3', 'harp|D6');
  CreateJS.Sound.registerSound('./tones/harp/D7.mp3', 'harp|D7');
  CreateJS.Sound.registerSound('./tones/harp/E1.mp3', 'harp|E1');
  CreateJS.Sound.registerSound('./tones/harp/E3.mp3', 'harp|E3');
  CreateJS.Sound.registerSound('./tones/harp/E5.mp3', 'harp|E5');
  CreateJS.Sound.registerSound('./tones/harp/F2.mp3', 'harp|F2');
  CreateJS.Sound.registerSound('./tones/harp/F4.mp3', 'harp|F4');
  CreateJS.Sound.registerSound('./tones/harp/F6.mp3', 'harp|F6');
  CreateJS.Sound.registerSound('./tones/harp/F7.mp3', 'harp|F7');
  CreateJS.Sound.registerSound('./tones/harp/G1.mp3', 'harp|G1');
  CreateJS.Sound.registerSound('./tones/harp/G3.mp3', 'harp|G3');
  CreateJS.Sound.registerSound('./tones/harp/G5.mp3', 'harp|G5');

  CreateJS.Sound.registerSound('./tones/flute/C4.mp3', 'flute|C4');
}
