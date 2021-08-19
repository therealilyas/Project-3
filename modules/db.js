 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 var firebaseConfig = {
     apiKey: "AIzaSyDaPMZ4n-pJa1l_gFHzTK8-k2-8tJN274w",
     authDomain: "employeessystem-b5281.firebaseapp.com",
     projectId: "employeessystem-b5281",
     storageBucket: "employeessystem-b5281.appspot.com",
     messagingSenderId: "484242441762",
     appId: "1:484242441762:web:65ff8193a8dc607d45ec7b",
     measurementId: "G-CWZCTZLM9F"
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 const db = firebase.firestore();
 export default db