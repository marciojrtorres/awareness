/* eslint-disable no-console */
// import Sonify from './Sonify';

let keypressed = null;

document.addEventListener('keypress', function(e) {
  if (keypressed) keypressed(e.key);
});

export default {
  setup(workspace) {
    this.workspace = workspace;
  },
  evaluate: false,
  check(done) {
    keypressed = (key) => {
      if (key === 'Enter') done();
    };
  },
  simulate(loopCount = 5) {
    this.evaluate = false;
    this.loop(loopCount);
  },
  run(loopCount = 5) {
    this.evaluate = true;
    this.loop(loopCount);
  },
  loop(n = 10) {
    if (n === 0) return;
    const randomUser = Math.random() > 0.5 ? 1 : 0;
    const randomAction = Math.random() > 0.4 ? this.add : this.remove;
    randomAction.call(this, randomUser, n);
  },
  remove(user, n) {
    /*
    if (dir.nodes.length <= 1) {
      this.loop(n); // retry
    } else {
      this.onDropArtifact({source: dir.nodes.pop()});
      Sonify.removal({user, dir});
      this.next(n);
    }
    */
    this.next(n);
  },
  add(user, n) {
    // const add = {
    //   name: `Test Case ${n}`,
    //   x: current.x + dir.x,
    //   y: current.y + dir.y,
    //   user,
    // };
    // Sonify.addition({user, dir});
    const source = this.workspace.artifacts[0];
    this.workspace.addArtifact({source});
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
};
