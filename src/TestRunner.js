/* eslint-disable require-jsdoc, no-console */

let keypressed = null;

document.addEventListener('keypress', function(e) {
  if (keypressed) keypressed(e.key);
});

const names = [
  'Aluno', 'Professor', 'Turma', 'Disciplina', 'Curso', 'Campus', 'Sala', 'Ano',
];

function randomName() {
  const i = Number.parseInt(Math.random() * names.length);
  return names[i];
}

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
    const randomUser = Math.random() > 0.5 ? 2 : 1;
    const randomAction = Math.random() > 0.5 ? this.add :
      Math.random() > 0.5 ? this.remove : this.alter;
    randomAction.call(this, randomUser, n);
  },
  alter(user, n) {
    console.log('altering');
    const index = parseInt(Math.random() * this.workspace.artifacts.length);
    const source = this.workspace.artifacts[index];
    this.workspace.alterArtifact({source, user});
    this.next(n);
  },
  remove(user, n) {
    // do not remove 'til the last element
    if (this.workspace.artifacts.length > 1) {
      console.log('removing');
      const index = parseInt(Math.random() * this.workspace.artifacts.length);
      const source = this.workspace.artifacts[index];
      this.workspace.removeArtifact({source, user});
      this.next(n);
    } else {
      console.log('removing postponed');
      this.loop(n); // repeat
    }
  },
  add(user, n) {
    console.log('adding');
    const source = this.workspace.artifacts[0];
    this.workspace.addArtifact({source, user, name: randomName()});
    this.next(n);
  },
  next(n) {
    question(() => {
      setTimeout(() => {
        if (this.options.evaluate) {
          this.check(() => {
            this.loop(n - 1);
          });
        } else {
          this.loop(n - 1);
        }
      }, this.options.interval);
    });
  },
};

const answers = [];

function question(ok) {
  setTimeout(() => {
    const answer = prompt('(E,D,F)|(C,A)|(3)|(A|E|A)');
    answers.push(answer);
    ok();
  }, 1000);
}
