export default {
  root: null,
  eastmost: {
    node: null,
    x: 120,
    y: 0,
  },
  westmost: {
    node: null,
    x: -120,
    y: 0,
  },
  northmost: {
    node: null,
    x: 0,
    y: -100,
  },
  run: function(root) {
    this.root = root;
    this.westmost.node = root;
    this.eastmost.node = root;
    this.northmost.node = root;
    const direction = Math.random() > 0.6666 ? this.northmost
        : Math.random() > 0.3333 ? this.westmost : this.eastmost;
    this.add(direction);
  },
  add(direction) {
    const add = {
      name: `New`,
      x: direction.node.x + direction.x,
      y: direction.node.y + direction.y,
    };
    if (this.onCreateArtifact) {
      this.onCreateArtifact({
        source: direction.node,
        add,
      });
      direction.node = add;
    }
    setTimeout(() => {
      const direction = Math.random() > 0.6666 ? this.northmost :
        Math.random() > 0.3333 ? this.westmost : this.eastmost;
      this.add(direction);
    }, 3000);
  },
  onCreateArtifact: null,
  onDropArtifact: null,
};
