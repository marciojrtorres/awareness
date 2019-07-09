export default {
  root: null,
  eastmost: {
    node: null,
    x: 120,
    y: 0,
    hops: 0,
  },
  westmost: {
    node: null,
    x: -120,
    y: 0,
    hops: 0,
  },
  northmost: {
    node: null,
    x: 0,
    y: -100,
    hops: 0,
  },
  run: function(root) {
    this.root = root;
    this.westmost.node = root;
    this.eastmost.node = root;
    this.northmost.node = root;
    this.loop(2);
  },
  loop(n = 10) {
    const direction = Math.random() > 0.6666 ? this.northmost
      : Math.random() > 0.3333 ? this.westmost : this.eastmost;
    this.add(direction);
  },
  add(direction) {
    if (this.onCreateArtifact === null ||
      this.onCreateArtifact === undefined) {
      throw new Error('onCreateArtifact function not defined');
    }
    const add = {
      name: `New`,
      x: direction.node.x + direction.x,
      y: direction.node.y + direction.y,
    };
    this.onCreateArtifact({
      source: direction.node,
      add,
    });
    // update las node and hops counting
    direction.node = add;
    direction.hops++;
    setTimeout(() => {
      const direction = Math.random() > 0.6666 ? this.northmost :
        Math.random() > 0.3333 ? this.westmost : this.eastmost;
      this.add(direction);
    }, 3000);
  },
  onCreateArtifact: null,
  onDropArtifact: null,
};
