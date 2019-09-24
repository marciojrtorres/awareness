import EventHub from './EventHub';
import {users} from './Session';

export default {
  techniques: [],
  addition: function(e) { // {user: int, dir: {nodes: [], pan: int}}
    EventHub.$emit('play', {
      instrument: users[e.user].instrument,
      note: 'C3',
      volume: 1.0 - (0.2 * (e.dir.nodes.length - 2)),
      pan: e.dir.pan,
      delay: 0,
    });
    EventHub.$emit('play', {
      instrument: users[e.user].instrument,
      note: 'E3',
      volume: 1.0 - (0.2 * (e.dir.nodes.length - 2)),
      pan: e.dir.pan,
      delay: 100,
    });
    EventHub.$emit('play', {
      instrument: users[e.user].instrument,
      note: 'G3',
      volume: 1.0 - (0.2 * (e.dir.nodes.length - 2)),
      pan: e.dir.pan,
      delay: 200,
    });
  },
  removal: function(e) {
    EventHub.$emit('play', {
      instrument: users[e.user].instrument,
      note: 'C3',
      volume: 1.0 - (0.2 * (e.dir.nodes.length - 2)),
      pan: e.dir.pan,
      delay: 200,
    });
    EventHub.$emit('play', {
      instrument: users[e.user].instrument,
      note: 'E3',
      volume: 1.0 - (0.2 * (e.dir.nodes.length - 2)),
      pan: e.dir.pan,
      delay: 100,
    });
    EventHub.$emit('play', {
      instrument: users[e.user].instrument,
      note: 'G3',
      volume: 1.0 - (0.2 * (e.dir.nodes.length - 2)),
      pan: e.dir.pan,
      delay: 0,
    });
  },
  updating: function(e) {

  },
};
