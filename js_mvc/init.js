export const C_PATH_TO_MODE = {
  'index.html': 'signup',
  'login.html': 'signin',
  'users.html': 'main',
}

const firebaseConfig = {
  apiKey: "AIzaSyAANOzvKeul760IlhOkpAStiwUm67-AHs8",
  authDomain: "todo-6954b.firebaseapp.com",
  projectId: "todo-6954b",
  storageBucket: "todo-6954b.appspot.com",
  messagingSenderId: "916655235259",
  appId: "1:916655235259:web:2cabff3d5ca4cba581099e",
  measurementId: "G-2VSQSSQW8T"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
