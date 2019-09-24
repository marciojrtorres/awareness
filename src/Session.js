export default {
  users: [
    {
      id: 0, name: 'Jane', instrument: 'piano',
    },
    {
      id: 1, name: 'Peter', instrument: 'guitar',
    },
    {
      id: 99, name: 'Me', instrument: 'me',
    },
  ],
  sonification: {
    techniques: ['none', 'abstract', 'speech', 'mixed'],
    selected: 0,
    get selectedTechnique() {
      return this.techniques[this.selected];
    },
  },
};
