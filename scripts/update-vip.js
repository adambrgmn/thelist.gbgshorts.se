/* eslint-disable no-use-before-define */
require('dotenv').config();
const firebase = require('firebase');
const inquirer = require('inquirer');
const R = require('ramda');

firebase.initializeApp({
  apiKey: process.env.FIREBASE_KEY,
  authDomain: 'gbgshorts.firebaseapp.com',
  databaseURL: 'https://gbgshorts.firebaseio.com',
  projectId: 'firebase-gbgshorts',
});

const refPath = '2017/people';
const peopleRef = firebase.database().ref(refPath);

async function run() {
  await authenticate();

  const snapshot = await peopleRef.once('value');
  const val = snapshot.val();
  const list = Object.keys(val).map(key => Object.assign({}, val[key], {
    id: key,
  }));

  try {
    const { update } = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Name',
      },
      {
        type: 'input',
        name: 'email',
        message: 'Email',
      },
      {
        type: 'checkbox',
        name: 'update',
        message: 'Who to update',
        choices: ({ name, email }) => {
          const nameRegExp = new RegExp(name, 'gi');
          const emailRegExp = new RegExp(email, 'gi');

          const testName = name ? R.compose(R.test(nameRegExp), R.prop('name')) : R.F;
          const testEmail = email ? R.compose(R.test(emailRegExp), R.prop('email')) : R.F;

          const filterFn = name || email ? R.anyPass([testName, testEmail]) : R.T;
          const mapFn = person => ({
            name: `${person.name} (${person.email})`,
            value: person.id,
            short: person.name,
          });

          return R.compose(R.map(mapFn), R.filter(filterFn))(list);
        },
      },
    ]);

    return update;
  } catch (err) {
    throw err;
  }
}

async function addVipStatus(keys) {
  try {
    const promises = keys.map((key) => {
      const currentPerson = peopleRef.child(`/${key}/vip`);
      return currentPerson.set(true);
    });

    await Promise.all(promises);
    return null;
  } catch (err) {
    throw err;
  }
}

run()
  .then(addVipStatus)
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err.message);
    process.exit(err.code || 1);
  });


function authenticate() {
  return firebase.auth().signInWithEmailAndPassword(process.env.FB_EMAIL, process.env.FB_PASS);
}
