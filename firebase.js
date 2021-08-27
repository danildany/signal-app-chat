import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDRN0RtLFEDMPB7myxZCuP-R0gof-LPoC4",
    authDomain: "signal-clone-4pp.firebaseapp.com",
    projectId: "signal-clone-4pp",
    storageBucket: "signal-clone-4pp.appspot.com",
    messagingSenderId: "884892914905",
    appId: "1:884892914905:web:9e14970066cd6c6b1fdac8"
  };

let app;

if(firebase.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig);
}else{
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export {db , auth}