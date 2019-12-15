/* eslint-disable no-console */
/* eslint-disable require-jsdoc */

import Sonify from './Sonify';
import {db} from './Fire';
// const interactions = [];

let _id = 0;

export default {
  artifacts: [],
  links: [],
  lastSignaling: null,
  session: null,
  sequence: 0,
  newSession(e) {
    this.artifacts.splice(0);
    this.links.splice(0);
    this.lastSignaling = null;
    this.session = null;
    this.sequence = 0;
    const name = prompt('Nome da sessão:');
    if (!name) return;
    db.add('sessions', {name}).then((doc) => {
      this.session = doc;
      this.add({name: 'Nova', x: 100, y: 10}, undefined, e.userId);
      console.log(doc.id);
    });
  },
  openSession(id) {

    // const sessionRef = db.store.collection('sessions').doc(id)
    // sessionRef.get().then(session => {
    //   if (session.exists) {
    //     this.session = sessionRef;
    //     this.session.collection('interactions').orderBy('timestamp', 'asc')
    //       .get().then(query => {
    //       query.forEach(item => {
    //         interactions.push(item.data());
    //         console.dir(interactions);
    //       });
    //     });
    //     this.session.collection('interactions').onSnapshot(snap => {
    //       console.log(snap);
    //     });
    //     // if (!this.job) {
    //     //   this.job = setInterval(() => {
    //     //     console.log('check');
    //     //     const act = interactions.shift();
    //     //     if (act) {
    //     //       this[act.interaction].call(this, act.artifact,
    //                act.fromId, act.user);
    //     //       console.log('execute:', act);
    //     //     }
    //     //   }, 1000);
    //     // }
    //   } else {
    //     console.error(`Session ${id} does not exist!`);
    //   }
    // });

    // this.session.collection('interactions').get().then(query => {
    //   query.forEach(doc => {
    //     console.log(doc.interaction);
    //   });
    // });

  },
  action(action) {
    if ('presence' === action) {
      Sonify.play({action: 'greeting'});
      return;
    }

    if ('help' === action) {
      const msg = ``
      + `As teclas menos e mais reduzem e aumentam a velocidade da narração.`
      + `A tecla U sinaliza os usuários estão presentes no espaço de trabalho`
      + `A barra de espaço descreve o objeto focado atualmente.`
      + `A tecla V narra quais são os vizinhos do objeto focado.`
      + `A tecla C narra quais são as conexões do objeto focado.`
      + `As teclas A, W e D movimentam o foco para o objeto conectado `
      + `à esquerda, frente e direita.`
      + `A tecla S repete a sinalização de mudança no espaço de trabalho `
      + `relativo ao foco atual e permite segui-la até a origem.`;
      Sonify.speech(msg);
      return;
    }

    if ('sonification_none' === action) {
      Sonify.selected = action.split('_')[1];
    }

    if ('increase_speech_rate' === action) {
      Sonify.increaseSpeechRate();
      return;
    }
    if ('decrease_speech_rate' === action) {
      Sonify.decreaseSpeechRate();
      return;
    }

    const art = this.artifacts.find((a) => a.focused);
    if (!art) {
      console.log('no focus');
      Sonify.play({action: 'error',
        description: 'Não há objeto selecionado'});
      return;
    }

    if ('rename' === action) {
      const msg = 'Digite o novo nome e tecle enter para confirmar '
                + 'ou esc para cancelar';
      Sonify.speech(msg);
      const newName = prompt('Novo nome:');
      if (newName) {
        const oldName = art.name;
        art.name = newName;
        Sonify.speech(`Tabela renomeada de ${oldName} para ${newName}`);
      }
    }

    if ('describe' === action) {
      const focus = this.artifacts.find((a) => a.focused);
      if (focus) Sonify.speech(`Tabela ${focus.name}`);
    }

    if ('connections' === action) {
      const focus = this.artifacts.find((a) => a.focused);
      if (! focus) return;
      const connections = [];
      if (focus.left) connections.push('esquerda');
      if (focus.top) connections.push('frente');
      if (focus.right) connections.push('direita');

      if (connections.length === 0) {
        Sonify.speech('Não há conexões');
      } else if (connections.length === 3) {
        Sonify.speech('Conexões nas três direções');
      } else {
        let utterance = connections.length === 1 ? 'Conexão à '
          : 'Conexões à ';
        utterance += connections[0];
        if (connections[1]) utterance += ` e ${connections[1]}`;
        Sonify.speech(utterance);
      }
    }

    if ('follow' === action) {
      if (this.lastSignaling) {
        const signalingMethod = `${this.lastSignaling.signal}Signaling`;
        this[signalingMethod](...this.lastSignaling.args);
      }
    }

    if ('neighbors' === action) {
      const focus = this.artifacts.find((a) => a.focused);
      if (! focus) return;
      const connections = [];
      if (focus.left) connections.push(`${focus.left.name} à esquerda`);
      if (focus.top) connections.push(`${focus.top.name} à frente`);
      if (focus.right) connections.push(`${focus.right.name} à direita`);
      connections.forEach((c) => {
        Sonify.speech(c);
      });
    }
  },
  helpWith(topic) {

  },
  moveFocus(dir) {
    const art = this.artifacts.find((a) => a.focused);
    if (!art) return;
    if (!(dir in {left: '<-', top: '↑', right: '->'})) return;
    if (art[dir]) {
      art.focused = false;
      art[dir].focused = true;
      Sonify.play({action: 'accept'});
    } else {
      Sonify.play({action: 'reject'});
    }
  },
  find(id) {
    id = Number(id);
    if (isNaN(id)) return;
    return this.artifacts.find((a) => a.id === id);
  },
  where(origin, target) {
    this.artifacts.forEach((a) => delete a.visited);
    return dfs(origin, target);
  },
  prepare(newArtifact) {
    newArtifact.id = _id++;
    newArtifact.focused = this.artifacts.length === 0;
    newArtifact.left = undefined;
    newArtifact.right = undefined;
    newArtifact.top = undefined;
  },
  link(newArtifact, fromId) {
    const from = this.find(fromId);
    if (!from.right) {
      from.right = newArtifact;
      newArtifact.left = from;
      // options.pan = 1;
    } else if (!from.left) {
      from.left = newArtifact;
      newArtifact.right = from;
      // options.pan = -1;
    } else if (!from.top) {
      from.top = newArtifact;
      newArtifact.left = from;
      // options.pan = 0;
    } else {
      throw new Error('There is no direction where to put this new artifact');
    }
    this.links.push([fromId, newArtifact.id]);
  },
  alter(id, user = 0, data) {
    const index = this.artifacts.findIndex((a) => a.id == id);
    if (index >= 0) {
      const beingAltered = this.find(id);
      beingAltered.name = data.newName || 'Sem nome';
      this.lastSignaling = {
        signal: 'alter',
        args: [beingAltered, user],
      };
      this.alterSignaling(beingAltered, user);
    }
  },
  alterSignaling(alteredArtifact, user) {
    const focusedArtifact = this.artifacts.find((a) => a.focused);
    const where = this.where(focusedArtifact, alteredArtifact);
    const options = {
      action: 'updating', user,
      pan: where.dir || 0, distance: where.count,
    };
    if (this.session) {
      const doc = {sequence: ++this.sequence, ...options,
        timestamp: db.currentTimestamp};
      this.session.collection('interactions').add(doc);
    }
    Sonify.play(options);
  },
  add(newArtifact, fromId, user = 0) {
    this.prepare(newArtifact);
    if (fromId !== undefined) this.link(newArtifact, fromId);
    this.artifacts.push(newArtifact);
    this.lastSignaling = {
      signal: 'add',
      args: [newArtifact, user],
    };
    this.addSignaling(newArtifact, user);

    // newArtifact, user
    // const focusedArtifact = this.artifacts.find((a) => a.focused);
    // const where = this.where(focusedArtifact, newArtifact);
    // const options = {action: 'addition', user,
    //  pan: where.dir, distance: where.count};
    // Sonify.play(options);
  },
  addSignaling(newArtifact, user) {
    // console.log('addSignaling', newArtifact, user);
    const focusedArtifact = this.artifacts.find((a) => a.focused);
    const where = this.where(focusedArtifact, newArtifact);
    const options = {action: 'addition', user,
      pan: where.dir || 0, distance: where.count};
    if (this.session) {
      const doc = {sequence: ++this.sequence, ...options,
        timestamp: db.currentTimestamp};
      this.session.collection('interactions').add(doc);
    }
    Sonify.play(options);
  },
  remove(id, user = 0) {
    const index = this.artifacts.findIndex((a) => a.id == id);
    if (index >= 0) {
      const focusedArtifact = this.artifacts.find((a) => a.focused);
      const toBeRemovedArtifact = this.find(id);
      const where = this.where(focusedArtifact, toBeRemovedArtifact);
      const options = {
        action: 'removal', user,
        pan: where.dir || 0, distance: where.count,
      };

      if (this.session) {
        const doc = {sequence: ++this.sequence, ...options,
          timestamp: db.currentTimestamp};
        this.session.collection('interactions').add(doc);
      }
      Sonify.play(options);

      if (focusedArtifact === toBeRemovedArtifact) {
        if (toBeRemovedArtifact.left) {
          toBeRemovedArtifact.left.focused = true;
        } else if (toBeRemovedArtifact.right) {
          toBeRemovedArtifact.right.focused = true;
        } else if (toBeRemovedArtifact.top) {
          toBeRemovedArtifact.top.focused = true;
        } else {
          console.error('There is not any artifact that could receive focus');
        }
      }

      let linkIndex = -1;
      while ((linkIndex = this.links.findIndex((link) =>
        link[0] === id || link[1] === id)) >= 0) {
        const from = this.links[linkIndex][1] === id ?
          this.links[linkIndex][0] : this.links[linkIndex][1];
        this._dereference(from, id);
        this.links.splice(linkIndex, 1);
      }
      this.artifacts.splice(index, 1);
    }
  },
  removeSignaling(removedArtifact, user) {
    // TODO remove signaling
  },
  _dereference(fromId, destId) {
    const from = this.find(fromId);
    if (from) {
      if (from.left && from.left.id === destId) {
        from.left = null;
      }
      if (from.right && from.right.id === destId) {
        from.right = null;
      }
      if (from.top && from.top.id === destId) {
        from.top = null;
      }
    }
  },
};

function dfs(origin, target, count = 0) {
  if (origin.visited) return {count};
  origin.visited = true;
  if (origin === target) return {count};
  const r = {right: 100, left: 100, top: 100};
  if (origin.right && !origin.right.visited) {
    r.right = dfs(origin.right, target, count + 1)['count'];
  }
  if (origin.left && !origin.left.visited) {
    r.left = dfs(origin.left, target, count + 1)['count'];
  }
  if (origin.top && !origin.top.visited) {
    r.top = dfs(origin.top, target, count + 1)['count'];
  }
  return {
    count: Math.min(r.left, r.right, r.top),
    dir: (r.right < r.left && r.top ? 1 : (r.top < r.left ? 0 : -1)),
  };
}
