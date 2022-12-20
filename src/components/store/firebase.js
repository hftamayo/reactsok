import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

/* import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 
import { getDatabase } from "firebase/database";
*/

const firebaseConfig = {
  apiKey: "AIzaSyB6fBtXeYqMjuj2L_vzO7NSzDMw0lFP06U",
  authDomain: "sotiria-f6005.firebaseapp.com",
  projectId: "sotiria-f6005",
  storageBucket: "sotiria-f6005.appspot.com",
  messagingSenderId: "616599114265",
  appId: "1:616599114265:web:0b41fb9fc74559a04cd088",
  measurementId: "G-J5JSZK4LG3",
};

const fireDbInstance = initializeApp(firebaseConfig);
const fireDb = getDatabase(fireDbInstance);

/* const analytics = getAnalytics(fireDb);
const db = getFirestore(fireDb);
const fireDb = getDatabase(app);
export { db }; */

export default {fireDb};
