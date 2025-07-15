import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCQsYVgQVHahoJhRP0rRgVdEdfDZRenM94',
  authDomain: 'fir-s-6efa0.firebaseapp.com',
  databaseURL: 'https://fir-s-6efa0-default-rtdb.firebaseio.com',
  projectId: 'fir-s-6efa0',
  storageBucket: 'fir-s-6efa0.firebasestorage.app',
  messagingSenderId: '19654666545',
  appId: '1:19654666545:web:9d214835b0b17b001f6810',
  measurementId: 'G-YL60BD2KZQ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
