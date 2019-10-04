/* eslint-disable no-console */
import Sonify from './Sonify';

let _id = 0;

export default {
  artifacts: [
  ],
  links: [

  ],
  find(id) {
    id = Number(id);
    if (isNaN(id)) return;
    return this.artifacts.find((a) => a.id === id);
  },
  add(newArtifact, fromId, user = 0) {
    const options = {user, pan: 0, distance: 1};
    newArtifact.id = _id++;
    if (fromId !== undefined) {
      const from = this.find(fromId);
      if (!from.right) {
        from.right = newArtifact;
        newArtifact.left = from;
        options.pan = 1;
      } else if (!from.left) {
        from.left = newArtifact;
        newArtifact.right = from;
        options.pan = -1;
      } else if (!from.top) {
        from.top = newArtifact;
        newArtifact.left = from;
        options.pan = 0;
      } else {
        throw new Error('There is no direction where to put this new artifact');
      }
      this.links.push([fromId, newArtifact.id]);
    }
    this.artifacts.push(newArtifact);
    Sonify.addition(options);
  },
  remove(id, user = 0) {
    const options = {user, pan: 0, distance: 1};
    const index = this.artifacts.findIndex((a) => a.id == id);
    if (index >= 0) {
      let linkIndex = -1;
      while ((linkIndex = this.links.findIndex((link) =>
        link[0] === id || link[1] === id)) >= 0) {
        const from = this.links[linkIndex][1] === id ?
          this.links[linkIndex][0] : this.links[linkIndex][1];
        this._dereference(from, id);
        this.links.splice(linkIndex, 1);
      }
      this.artifacts.splice(index, 1);
      Sonify.removal(options);
    }
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
