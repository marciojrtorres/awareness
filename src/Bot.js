import EventHub from './EventHub';
import {users} from './Session';

export default {
  root: null,
  east: {
    nodes: [],
    x: 120,
    y: 0,
  },
  west: {
    nodes: [],
    x: -120,
    y: 0,
  },
  north: {
    nodes: [],
    x: 0,
    y: -100,
  },
  run: function(root) {
    this.root = root;
    this.west.nodes.push(root);
    this.east.nodes.push(root);
    this.north.nodes.push(root);
    this.loop(4);
  },
  loop(n = 10) {
    if (n === 0) return; // end loop
    const randomDirection = Math.random() > 0.6666 ? this.north
      : Math.random() > 0.3333 ? this.west : this.east;
    const randomUser = Math.random() > 0.5 ? 1 : 0;
    const randomAction = Math.random() > 0.5 ? this.add : this.remove;
    // const randomAction = this.remove;
    setTimeout(() => {
      randomAction.call(this, randomDirection, randomUser, n);
    }, 2000);
  },
  remove(direction, user, n) {
    if (direction.nodes.length <= 1) {
      this.loop(n); // retry
    } else {
      this.onDropArtifact({source: direction.nodes.pop()});
      this.loop(n - 1);
    }
  },
  add(direction, user, n) {
    const current = direction.nodes[direction.nodes.length - 1];
    const add = {
      name: `New`,
      x: current.x + direction.x,
      y: current.y + direction.y,
    };
    this.onCreateArtifact({
      source: current,
      add,
    });
    // update las current and hops counting
    direction.nodes.push(add);
    EventHub.$emit('sample', users[user].instrument);
    this.loop(n - 1);
  },
  onCreateArtifact: null,
  onDropArtifact: null,
};
