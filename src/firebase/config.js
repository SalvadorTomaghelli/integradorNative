import app from 'firebase/app'
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyB0GAqvsU9GkrK1j9hUCv6JGOV8aSurcZg",
    authDomain: "miproyecto-8c800.firebaseapp.com",
    projectId: "miproyecto-8c800",
    storageBucket: "miproyecto-8c800.appspot.com",
    messagingSenderId: "400817997586",
    appId: "1:400817997586:web:a2ed325bb57d31c58e95cb",
    measurementId: "G-TE96PM5C80"
  };

  app.initializeApp(firebaseConfig)
  export const auth = firebase.auth();
  export const storage = app.storage();
  export const db = app.firestore();