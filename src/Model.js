/* eslint-disable no-console */

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
  add(newArtifact, fromId) {
    newArtifact.id = _id++;
    newArtifact.isFull = function() {
      return this.left !== null && this.top !== null && this.right !== null;
    };
    if (fromId !== undefined) {
      const from = this.find(fromId);
      if (!from.right) {
        from.right = newArtifact;
        newArtifact.left = from;
      } else if (!from.left) {
        from.left = newArtifact;
        newArtifact.right = from;
      } else if (!from.top) {
        from.top = newArtifact;
        newArtifact.left = from;
      } else {
        throw new Error('There is no direction where to put this new artifact');
      }
      this.links.push([fromId, newArtifact.id]);
    }
    this.artifacts.push(newArtifact);
    // console.dir(this.artifacts);
    console.dir(this.links);
  },
  remove(id) {
    const index = this.artifacts.findIndex((a) => a.id == id);
    if (index >= 0) {
      let linkIndex = -1;
      while ((linkIndex = this.links.findIndex((link) =>
        link[0] === id || link[1] === id)) >= 0) {
        const from = this.links[linkIndex][1] === id ?
          this.links[linkIndex][0] : this.links[linkIndex][1];
        this.dereference(from, id);
        this.links.splice(linkIndex, 1);
      }
      this.artifacts.splice(index, 1);
    }
    console.dir(this.artifacts);
    console.dir(this.links);
  },
  dereference(fromId, destId) {
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

/*
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
*/
