import firebase from 'firebase';
import db from './db';

export async function addPerson({ name, email }) {
  const peopleRef = db.child('people').push();
  await peopleRef.set({
    name,
    email,
    date: firebase.database.ServerValue.TIMESTAMP,
  });

  return peopleRef.key;
}

export async function getPeople() {
  const peopleRef = db.child('people');
  const list = await peopleRef.once('value');

  return list.val();
}
