/* eslint-disable no-console */
import EventHub from './EventHub';
import {users} from './Session';

export default {
  root: null,
  east: {
    name: 'east',
    nodes: [],
    x: 120,
    y: 0,
    pan: 1,
  },
  west: {
    name: 'west',
    nodes: [],
    x: -120,
    y: 0,
    pan: -1,
  },
  north: {
    name: 'north',
    nodes: [],
    x: 0,
    y: -100,
    pan: 0,
  },
  run: function(root, loopCount = 4) {
    this.root = root;
    this.west.nodes.push(root);
    this.east.nodes.push(root);
    this.north.nodes.push(root);
    this.loop(loopCount);
  },
  loop(n = 10) {
    if (n === 0) return; // end loop
    console.debug('loop', n);
    let direction;
    const randomUser = Math.random() > 0.5 ? 1 : 0;
    const randomAction = Math.random() > 0.5 ? this.add : this.remove;
    if (randomAction === this.add) {
      if (this.east.nodes.length < 2) {
        direction = this.east;
      } else if (this.west.nodes.length < 2) {
        direction = this.west;
      } else {
        direction = Math.random() > 0.6666 ? this.north
          : Math.random() > 0.3333 ? this.west : this.east;
      }
      console.debug('add', direction.name);
    } else {
      direction = Math.random() > 0.6666 ? this.north
      : Math.random() > 0.3333 ? this.west : this.east;
      console.debug('remove', direction.name);
    }
    // const randomAction = this.remove;
    setTimeout(() => {
      randomAction.call(this, direction, randomUser, n);
    }, 2000);
  },
  remove(dir, user, n) {
    if (dir.nodes.length <= 1) {
      this.loop(n); // retry
    } else {
      this.onDropArtifact({source: dir.nodes.pop()});
      EventHub.$emit('play', {
        instrument: users[user].instrument,
        note: 'C2',
        volume: 1,
        pan: dir.pan,
      });
      this.loop(n - 1);
    }
  },
  add(dir, user, n) {
    const current = dir.nodes[dir.nodes.length - 1];
    const add = {
      name: `New ${dir.name}`,
      x: current.x + dir.x,
      y: current.y + dir.y,
    };
    this.onCreateArtifact({
      source: current,
      add,
    });
    // update las current and hops counting
    dir.nodes.push(add);
    EventHub.$emit('play', {
      instrument: users[user].instrument,
      note: 'Cs3',
      volume: 1,
      pan: dir.pan,
    });
    this.loop(n - 1);
  },
  onCreateArtifact: null,
  onDropArtifact: null,
};
