export const session = {
  state: {
    users: [
      {
        id: 0,
        name: 'Me',
        instrument: 'none',
      },
      {
        id: 1,
        name: 'Jane',
        instrument: 'piano',
        recordings: {
        },
      },
      {
        id: 2,
        name: 'Peter',
        instrument: 'guitar',
        recordings: {
        },
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
