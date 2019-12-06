/* eslint-disable no-console */
/* eslint-disable require-jsdoc */

import Sonify from './Sonify';

let _id = 0;

export default {
  artifacts: [],
  links: [],
  lastSignaling: null,
  action(action) {
    const art = this.artifacts.find((a) => a.focused);
    if (! art) {
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
      if (focus) Sonify.speech(`Tabela ${focus.name}`)
    }

    if ('connections' === action) {
      const focus = this.artifacts.find((a) => a.focused);
      if (! focus) return;
      const connections = [];
      if (focus.left)  connections.push('esquerda');
      if (focus.top)   connections.push('frente');
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
        this[signalingMethod].apply(this, this.lastSignaling.args);
      }
    }

    if ('neighbors' === action) {
      const focus = this.artifacts.find((a) => a.focused);
      if (! focus) return;
      const connections = [];
      if (focus.left)  connections.push(`${focus.left.name} à esquerda`);
      if (focus.top)   connections.push(`${focus.top.name} à frente`);
      if (focus.right) connections.push(`${focus.right.name} à direita`);
      connections.forEach((c) => {
        Sonify.speech(c);
      });
    }

    if ('increase_speech_rate' === action) {
      Sonify.increaseSpeechRate();
    }
    if ('decrease_speech_rate' === action) {
      Sonify.decreaseSpeechRate();
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
      Sonify.speech(`Tabela ${art[dir].name}`);
    } else {
      Sonify.play({action: 'error',
        description: 'Não há objetos nesta direção'});
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
      const focusedArtifact = this.artifacts.find((a) => a.focused);
      const beingAltered = this.find(id);
      beingAltered.name = data.newName || 'Sem nome';
      const where = this.where(focusedArtifact, beingAltered);
      const options = {
        action: 'updating', user,
        pan: where.dir, distance: where.count,
      };
      Sonify.play(options);
    }
  },
  alterSignaling() {
    // TODO alter signaling
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
    console.log('addSignaling', newArtifact, user);
    const focusedArtifact = this.artifacts.find((a) => a.focused);
    const where = this.where(focusedArtifact, newArtifact);
    const options = {action: 'addition', user,
      pan: where.dir, distance: where.count};
    console.log(options);
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
        pan: where.dir, distance: where.count,
      };
      Sonify.play(options);
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
  removeSignaling() {
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
