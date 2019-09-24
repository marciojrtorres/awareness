import EventHub from './EventHub';
import Session from './Session';

export default {
  techniques: {
    none: {
      addition: () => {},
      removal: () => {},
      updating: () => {},
    },
    abstract: {
      addition: function(e) { // {user: int, dir: {nodes: [], pan: int}}
        EventHub.$emit('play', {
          instrument: Session.users[e.user].instrument,
          note: 'C3',
          volume: 1.0 - (0.2 * (e.dir.nodes.length - 2)),
          pan: e.dir.pan,
          delay: 0,
        });
        EventHub.$emit('play', {
          instrument: Session.users[e.user].instrument,
          note: 'E3',
          volume: 1.0 - (0.2 * (e.dir.nodes.length - 2)),
          pan: e.dir.pan,
          delay: 100,
        });
        EventHub.$emit('play', {
          instrument: Session.users[e.user].instrument,
          note: 'G3',
          volume: 1.0 - (0.2 * (e.dir.nodes.length - 2)),
          pan: e.dir.pan,
          delay: 200,
        });
      },
      removal: function(e) {
        EventHub.$emit('play', {
          instrument: Session.users[e.user].instrument,
          note: 'C3',
          volume: 1.0 - (0.2 * (e.dir.nodes.length - 2)),
          pan: e.dir.pan,
          delay: 200,
        });
        EventHub.$emit('play', {
          instrument: Session.users[e.user].instrument,
          note: 'E3',
          volume: 1.0 - (0.2 * (e.dir.nodes.length - 2)),
          pan: e.dir.pan,
          delay: 100,
        });
        EventHub.$emit('play', {
          instrument: Session.users[e.user].instrument,
          note: 'G3',
          volume: 1.0 - (0.2 * (e.dir.nodes.length - 2)),
          pan: e.dir.pan,
          delay: 0,
        });
      },
      updating: function(e) {

      },
    },
    speech: {
      addition: function(e) { // {user: int, dir: {nodes: [], pan: int}}
        alert('speaking! ' + JSON.stringify(e));
      },
      removal: function(e) {
        alert('speaking! ' + JSON.stringify(e));
      },
      updating: function(e) {
        alert('speaking! ' + JSON.stringify(e));
      },
    },
  },
  addition: function(e) { // {user: int, dir: {nodes: [], pan: int}}
    this.techniques[Session.sonification.selectedTechnique].addition(e);
  },
  removal: function(e) {
    this.techniques[Session.sonification.selectedTechnique].removal(e);
  },
  updating: function(e) {
    this.techniques[Session.sonification.selectedTechnique].updating(e);
  },
};
