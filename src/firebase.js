import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAgXCDgXYlK8TjsrlqS2nzdk97H7pmfWI0",
  authDomain: "covid-survey-a36ac.firebaseapp.com",
  databaseURL: "https://covid-survey-a36ac.firebaseio.com",
  projectId: "covid-survey-a36ac",
  storageBucket: "covid-survey-a36ac.appspot.com",
  messagingSenderId: "307629531359",
  appId: "1:307629531359:web:9b790a90d2e5e0f23e496a"
};

firebase.initializeApp(firebaseConfig);

export default firebase;