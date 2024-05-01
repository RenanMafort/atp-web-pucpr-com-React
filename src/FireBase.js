import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyADLxS6o5nFbyh-8mSDoI5dA9HZyBxEtz4",
    authDomain: "devops-pucpr.firebaseapp.com",
    projectId: "devops-pucpr",
    storageBucket: "devops-pucpr.appspot.com",
    messagingSenderId: "1051134616588",
    appId: "1:1051134616588:web:7846c336d01444f95cba29"
};

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export default firebase;