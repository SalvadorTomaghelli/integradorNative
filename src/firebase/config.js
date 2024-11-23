import app from 'firebase/app'
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAJ0a6W4WwdHwGARY8eoEYZN0JukljXVr8",
  authDomain: "integrador-native.firebaseapp.com",
  projectId: "integrador-native",
  storageBucket: "integrador-native.firebasestorage.app",
  messagingSenderId: "514721104315",
  appId: "1:514721104315:web:b77ee995cc8969a378c49e"
};

  app.initializeApp(firebaseConfig)
  export const auth = firebase.auth();
  export const storage = app.storage();
  export const db = app.firestore();