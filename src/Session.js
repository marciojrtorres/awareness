export const session = {
  state: {
    users: [
      {
        id: 0, name: 'Me', instrument: 'me',
      },
      {
        id: 1, name: 'Jane', instrument: 'piano',
      },
      {
        id: 2, name: 'Peter', instrument: 'guitar',
      },
    ],
    selected: 0,
  },
  select(id) {
    this.state.selected = id;
  },
  get currentUser() {
    return this.state.users.find((u) => u.id === this.state.selected);
  },
};
