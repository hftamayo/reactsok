import firebase from "firebase";
import "firebase/database";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6fBtXeYqMjuj2L_vzO7NSzDMw0lFP06U",
  authDomain: "sotiria-f6005.firebaseapp.com",
  projectId: "sotiria-f6005",
  storageBucket: "sotiria-f6005.appspot.com",
  messagingSenderId: "616599114265",
  appId: "1:616599114265:web:0b41fb9fc74559a04cd088",
  measurementId: "G-J5JSZK4LG3",
};

const fireDb = initializeApp(firebaseConfig);
const analytics = getAnalytics(fireDb);
const db = getFirestore(fireDb);
/* export { fireDb, db };
 */
export default fireDb.database().ref();