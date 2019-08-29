import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: 'FIREBASE_apiKey',
  authDomain: 'FIREBASE_authDomain',
  databaseURL: 'FIREBASE_databaseURL',
  projectId: 'FIREBASE_projectId',
  storageBucket: 'FIREBASE_storageBucket',
  messagingSenderId: 'FIREBASE_messagingSenderId',
  appId: 'FIREBASE_appId'
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const db = firebase.firestore();

export const storage = firebase.storage();