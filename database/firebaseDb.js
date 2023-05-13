import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyC5b95OWWQvqqfkVivoaPrGDA40Y2mi8jg",
    authDomain: "todo-app-21437.firebaseapp.com",
    projectId: "todo-app-21437",
    storageBucket: "todo-app-21437.appspot.com",
    messagingSenderId: "978546812938",
    appId: "1:978546812938:web:0ecf66c9f84a7815d9d7f3"
};
firebase.initializeApp(firebaseConfig);
firebase.firestore();
export default firebase;