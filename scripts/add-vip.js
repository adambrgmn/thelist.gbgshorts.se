/* eslint-disable no-use-before-define */
require('dotenv').config();
const firebase = require('firebase');
const inquirer = require('inquirer');

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

  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Name',
      },
      {
        type: 'input',
        name: 'email',
        message: 'Email',
        validate: validateEmail,
      },
      {
        type: 'confirm',
        name: 'vip',
        message: 'VIP',
      },
    ]);

    const newPerson = Object.assign({}, answers, {
      date: firebase.database.ServerValue.TIMESTAMP,
    });

    const newPersonRef = peopleRef.push();
    await newPersonRef.set(newPerson);

    console.log(`${newPerson.name} (${newPerson.email}) added to list${newPerson.vip ? ' as VIP' : ''}.`);

    const { addMore } = await inquirer.prompt([{
      type: 'confirm',
      name: 'addMore',
      message: 'Add more',
    }]);

    if (addMore) {
      await run();
    }
  } catch (err) {
    throw err;
  }
}

run()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err.message);
    process.exit(err.code || 1);
  });


function authenticate() {
  return firebase.auth().signInWithEmailAndPassword(process.env.FB_EMAIL, process.env.FB_PASS);
}

function validateEmail(e) {
  const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExp.test(e);
}
