//import * as firebase from 'firebase';
import firebase from "firebase/compat/app";
//import "firebase/firestore";
import "firebase/compat/firestore";
//import "firebase/auth";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCIE5L2ZAs3dkdKcm5fpovxQwnzHlSgc7o",
  authDomain: "v2rnchatapp.firebaseapp.com",
  projectId: "v2rnchatapp",
  storageBucket: "v2rnchatapp.appspot.com",
  messagingSenderId: "877424338310",
  appId: "1:877424338310:web:bdc7d180f90830f54df807"
};

let app;
// if we didnt initializse the app then =>
if(firebase.apps.length === 0){
   app=firebase.initializeApp(firebaseConfig);
}
else{ //else just use the firebase app
    app=firebase.app();
}


const db = app.firestore();
const auth=firebase.auth();

export {db, auth};

//export default app;