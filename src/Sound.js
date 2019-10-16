/* eslint-disable require-jsdoc */
import CreateJS from './CreateJS.js';
import EventHub from './EventHub.js';

// eslint-disable-next-line max-len
const error = new Audio('data:audio/mp3;base64,SUQzAwAAAAAAJlRQRTEAAAAcAAAAU291bmRKYXkuY29tIFNvdW5kIEVmZmVjdHMA//uSwAAAAAABLBQAAAL9Q+IPK0ACAAAAAAAAo8DLR2Axkf/A26eQONlnwMtCADLZD8D/qQAjn4GTFgacWG4/xGgYhCw4DJAP/BzgBQMBnBQDVQBoV/+BnBQB1gEQIDLBgDpAcF//gBEAFFAn8MSBYoOsk///xzhWoWzCgMQRAOFgobDpQCh////gWRh7oBQsCR8UUGx8CQseBBMOXKH///7N1niNGWD1A8wsoLKAWCCcgbGARDBOQNjAFhgt3////////+FsAtIHsToHqMXCOIKJ3FGAQBQZCIbEgbDYSDiaEgNPD0MpCCOSi7MXBHXkpsYwBgYvhKQBWYqBA5VUKg8YdA4YrAIND7zI4qkaNmjMgwTVpQUENmtNGNNYjMulMnBpddTjMyrNinAS8GzzcJAEVMol/WVYhDmVLgJGX5MOPBhYxQ4Oghj8rF7/94gJGLGAqDBRMDIGErJSDBS8INmKHDoTHX/+SV4KCNQd8tolZOK3JuDgYcABANM5AFl//+OJagDAFYFkFkEBjBi4BehP8HCwcyAyQFAB0FFQMMAgDf/7ksBmgCYVe2253SQEl69uNzmmgGX/llvH0m0qEBgcDbIpYDgb5u4XHUvLhsLjbIU/WRpIKEqw0bQP/H///1/z5Z8tGtdRcsmhWxEs+XTTgQzL1hwBo4YVAQ8GgyAK7iCcdAgAMhgnCj8jswQODjw+v9yP/pjhSKgAEBAQFg0FgMGEwmg0GWSUbIZh9sJmLx27TtGfg8RBcxISwg/O9owQIDEgGMpgQWEdNLjltzQjwGjOiS+sPAzToTRpTVpjDqRkPTfkAnZmBSsKG5k1hh6piIZlCuX6yNMeMsQEgjKAIEMKBCocEERY0NIv1l+kKDFg0N54DAyyadZQHDixhwAhBrTy/WX+JA0FHhV2YwMBgi/ACEGSYgHpelwxUKFBeX6y/8lhC/iSAGFrXuAIGWnT7FgxWJUDSaEiQKFIhrDlsv/L/y/8mmPGwcBBEADyKkRMVgQBvOWCIgHsBQnjokKC0Rh4ehmjkJFv/X/r/1/0hbdAOyecaW08tAppIFSJCL0Trk4OJKHrHMCAHA4iDx1VMqBxAFV0gejOmMLDmKCENmP/+5LAAYAXOX2DubekAv6zLic08EhRyOR2OxttxyMR1BOn8cgcDxW7NIjghQYUFggLt5MzbcmCBYGx0KWXwAiJPCuqDwT4lQhpKIlbTras0bYsxdzglzS8VnxaIQU9C5kuP21cY3eHPEeVOQ6S/ItiP3WsZ/vHtEeZjpCKhyTZ1CmN///s8kRkljucCJAUSdeqlXMTthrjP18ZxEh7j01EvvdFy4PlMzulbAc1dL//////q/xrd90pW98RGFqfsTawMr5jjMLVViwlbKgARRyTyihjyj8unPegY0d+ATJebEhClgQPUF/0M2yIE0kPw6i0CHB2f8MMwyoFzLqqv/zhF6McTQFILsXEWP//ncfqPR5oJNDjEUid///T6GqpCFYpzjU7chikXf///hMzgr2tqmUavXnBkX3L////pVC0MUytVarTjej1I4KhPv1GnNf////9lcmSA32cnBna4TgxwnJgguLPR2yf//////9waFewMT1nfsENlclY2N8d0q3jMyMatc2BmdM712AAIEIIcBAIBQIFAPHhxmRnihxA6gP+//uSwAsAF+GZiVmnhpMJszC3NPDQAkgkXTrCCn+mghomY2n4NMuhbxef8fgpaQHgEfKP/8KwCXRQ/D1GSDLFf//5Y3yoMuMYiEq1QHh//+yHW7iIe5oFRuKNOdF///+ijZ8K9n2vxV2u1A4q3/H+f+r2fbGzx37PHgMipZ8srOr2//////qc62drQ9VtqHqt6h8SG1qyIywoDi5x////////Hq/jzP480OPNDjxIbCznWn05O3n4pHTM3OCPWwAAwWBAYDQYA6HjAYDK1oFDjQJB+2Xjy8MQF8wsPFiX+7zLBY0gd+APwkYhYx/+OsyGsCEGKDN//QsFQJocA5XEd4bP//c2xUC5k7LIsRjHRC///c9Q2c6FAaSNOl6oHGv//tExAiHWr46dRC6swLhTf/1r/7sbOdCgiPGBwVKVWJmg6WJTU/////51q+d+xuagZNPGCMplMu3F4xtqhaXL///////xFG/2/Y46siaeMERXx7uaqVyna7N65YYznDhOQAwCAgEAkIgiESwoRAIaaVAELEYEfQvES9Gtl0AgAAAeQP/7ksAQgBmJmXm5t4SDEDMu6zlAEgOqynasYsEoBq8IOeg9QV1s6LALAkwBKF6Bo4zrA6wY5sD8BZD2ECDZzr50ZC+q0Lai/k1JkpCxf//s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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+5LApgAAAAEsAAAAAAAAJYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uSwP+AAAABLAAAAAAAACWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/7ksD/gAAAASwAAAAAAAAlgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+5LA/4AAAAEsAAAAAAAAJYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uSwP+AAAABLAAAAAAAACWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/7ksD/gAAAASwAAAAAAAAlgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+5LA/4AAAAEsAAAAAAAAJYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAA//uSwP+AAAABLAAAAAAAACWAAAAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAAA==');

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
      /*this.play({instrument, note: 'E3', delay: 200});
      this.play({instrument, note: 'E3', delay: 400});
      this.play({instrument, note: 'C3', delay: 600});
      this.play({instrument, note: 'E3', delay: 850});
      this.play({instrument, note: 'G3', delay: 1050});
      this.play({instrument, note: 'G2', delay: 1300});*/
    });
    EventHub.$on('play', (params) => {
      this.play(params);
    });
    EventHub.$on('error', () => {
      this.error();
    });
  },
  sample() {

  },
  error() {
    error.play();
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
}
