export const session = {
  state: {
    users: [
      {
        id: 0,
        name: 'Eu',
        instrument: 'none',
      },
      {
        id: 1,
        name: 'Marcio',
        instrument: 'piano',
        recordings: {
        },
      },
      {
        id: 2,
        name: 'Regina',
        instrument: 'guitar',
        recordings: {
        },
      },
    ],
    selected: 0,
  },
  user(id) {
    return this.state.users[id];
  },
  select(id) {
    this.state.selected = id;
  },
  instrument(id) {
    return this.state.users[id].instrument;
  },
  get currentUser() {
    return this.state.users.find((u) => u.id === this.state.selected);
  },
};
