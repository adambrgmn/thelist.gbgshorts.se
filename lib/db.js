import firebase from 'firebase';

try {
  firebase.initializeApp({
    apiKey: process.env.FIREBASE_KEY || window.__env__.FIREBASE_KEY,
    authDomain: 'gbgshorts.firebaseapp.com',
    databaseURL: 'https://gbgshorts.firebaseio.com',
    projectId: 'firebase-gbgshorts',
  });
} catch (err) {
  if (!/already exists/.test(err.message) && process.env.NODE_ENV !== 'production') {
    console.error('Firebase initialization error', err.stack);
  }
}

const env = process.env.NODE_ENV || window.__env__.NODE_ENV;
const isProduction = env === 'production';

const refPath = isProduction ? '2017' : 'development/2017';

const root = firebase.database()
  .ref(refPath);

export default root;
