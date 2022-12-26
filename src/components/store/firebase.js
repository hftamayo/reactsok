/* firebase v9 
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";  */

import firebase from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB6fBtXeYqMjuj2L_vzO7NSzDMw0lFP06U",
  authDomain: "sotiria-f6005.firebaseapp.com",
  projectId: "sotiria-f6005",
  storageBucket: "sotiria-f6005.appspot.com",
  messagingSenderId: "616599114265",
  appId: "1:616599114265:web:0b41fb9fc74559a04cd088",
  measurementId: "G-J5JSZK4LG3",
  /* databaseURL: "https://sotiria-f6005-default-rtdb.firebaseio.com/", */
};


/* firebase V9: 
const app = initializeApp(firebaseConfig);
const fireDb = getDatabase(app);  
export default {fireDb};
*/

const fireDb = firebase.initializeApp(firebaseConfig);
/* const analytics = getAnalytics(fireDb); */

export default fireDb.database().ref();


