import * as firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyCrTvXpc9YjU7oHveXlk8cgUgF6e2JolO8',
  authDomain: 'awareness-ppgcomp.firebaseapp.com',
  databaseURL: 'https://awareness-ppgcomp.firebaseio.com',
  projectId: 'awareness-ppgcomp',
  storageBucket: 'awareness-ppgcomp.appspot.com',
  messagingSenderId: '637117095854',
  appId: '1:637117095854:web:b8bf1d951cd894b550f23f',
});

// const db = firebase.firestore;
export const db = {
  store: firebase.firestore(),
  get currentTimestamp() {
    return firebase.firestore.Timestamp.now();
  },
  add(collection, data) {
    data.timestamp = this.currentTimestamp;
    return this.store.collection(collection).add(data);
  },
  doc(collection, id) {
    return this.store.collection(collection).doc(id);
  },
};
/*
db.collection('sessions').add({
  when: firebase.firestore.Timestamp.now()
});
*/
export default firebase;
