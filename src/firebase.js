import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDes1WtJTL9I7zwvbEPP55dI9CmjCs1y4M",
    authDomain: "todo-app-349b9.firebaseapp.com",
    databaseURL: "https://todo-app-349b9.firebaseio.com",
    projectId: "todo-app-349b9",
    storageBucket: "todo-app-349b9.appspot.com",
    messagingSenderId: "714416726771",
    appId: "1:714416726771:web:aa6ef21fbc5b780d418d86",
    measurementId: "G-3CKS62E690"
});

const db = firebaseApp.firestore();

export default db;



