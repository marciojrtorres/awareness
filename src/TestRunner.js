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
  check(done) {
    keypressed = (key) => {
      if (key === 'Enter') done();
    };
  },
  run({count = 5, evaluate = true, interval = 2000} = {}) {
    this.options = {count, evaluate, interval};
    this.loop(count);
  },
  loop(n = 10) {
    if (n === 0) return;
    const randomUser = Math.random() > 0.5 ? 1 : 0;
    const randomAction = Math.random() > 0.4 ? this.add : this.remove;
    randomAction.call(this, randomUser, n);
  },
  remove(user, n) {
    console.log('removing');
    const index = parseInt(Math.random() * this.workspace.artifacts.length);
    const source = this.workspace.artifacts[index];
    this.workspace.removeArtifact({source});
    this.next(n);
  },
  add(user, n) {
    console.log('adding');
    const source = this.workspace.artifacts[0];
    this.workspace.addArtifact({source});
    this.next(n);
  },
  next(n) {
    setTimeout(() => {
      if (this.options.evaluate) {
        this.check(() => {
          this.loop(n - 1);
        });
      } else {
        this.loop(n - 1);
      }
    }, this.options.interval);
  },
};
