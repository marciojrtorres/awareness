/* eslint-disable no-console */
import Sonify from './Sonify';

let keypressed = null;

document.addEventListener('keypress', function(e) {
  if (keypressed) keypressed(e.key);
});

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
  setup(root, loopCount) {
    this.root = root;
    this.west.nodes.push(root);
    this.east.nodes.push(root);
    this.north.nodes.push(root);
  },
  evaluate: false,
  check(done) {
    keypressed = (key) => {
      if (key === 'Enter') done();
    };
  },
  simulate(root, loopCount) {
    this.setup(root, loopCount);
    this.evaluate = false;
    this.loop(loopCount);
  },
  run(root, loopCount = 4) {
    this.setup(root, loopCount);
    this.evaluate = true;
    this.loop(loopCount);
  },
  loop(n = 10) {
    if (n === 0) return;
    let direction;
    const randomUser = Math.random() > 0.5 ? 1 : 0;
    const randomAction = Math.random() > 0.4 ? this.add : this.remove;
    if (randomAction === this.add) {
      if (this.east.nodes.length < 2) {
        direction = this.east;
      } else if (this.west.nodes.length < 2) {
        direction = this.west;
      } else {
        direction = Math.random() > 0.6666 ? this.north
          : Math.random() > 0.3333 ? this.west : this.east;
      }
    } else {
      direction = Math.random() > 0.6666 ? this.north
        : Math.random() > 0.3333 ? this.west : this.east;
      // console.debug('remove:', direction.name);
    }
    console.debug('loop', n, '| action:', randomAction.name,
        '| direction:', direction.name,
        '| user:', randomUser,
        '| distance:', direction.nodes.length);
    randomAction.call(this, direction, randomUser, n);
  },
  remove(dir, user, n) {
    if (dir.nodes.length <= 1) {
      this.loop(n); // retry
    } else {
      this.onDropArtifact({source: dir.nodes.pop()});
      Sonify.removal({user, dir});
      this.next(n);
    }
  },
  add(dir, user, n) {
    const current = dir.nodes[dir.nodes.length - 1];
    const add = {
      name: `New ${dir.name}`,
      x: current.x + dir.x,
      y: current.y + dir.y,
      user,
    };
    this.onCreateArtifact({
      source: current,
      add,
    });
    // update las current and hops counting
    dir.nodes.push(add);
    Sonify.addition({user, dir});
    this.next(n);
  },
  next(n) {
    setTimeout(() => {
      if (this.evaluate) {
        this.check(() => {
          this.loop(n - 1);
        });
      } else {
        this.loop(n - 1);
      }
    }, 2000);
  },
  onCreateArtifact: null,
  onDropArtifact: null,
};
