import { initializeApp } from "firebase/app";
import {
  collection,
  getFirestore,
  doc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyDoAKXQrOtB6EAHNvaiOk98EZNXpreXQDM",
  authDomain: "akashcraft-firebase.firebaseapp.com",
  projectId: "akashcraft-firebase",
  storageBucket: "akashcraft-firebase.firebasestorage.app",
  messagingSenderId: "120116375945",
  appId: "1:120116375945:web:2589bc98e94d7ff845b158",
};

export function useGetCount() {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const collectionRef = collection(db, "eyeport");
  const countRef = doc(collectionRef, "1");

  onSnapshot(countRef, (doc) => {
    if (doc.exists()) {
      const data = doc.data();
      setCount(data.count);
      setLoading(false);
    } else {
      setError(true);
      setLoading(false);
    }
  });

  return { count, loading, error };
}

export async function updateCount(number: number) {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const collectionRef = collection(db, "eyeport");
  const countRef = doc(collectionRef, "1");

  try {
    await setDoc(countRef, {
      count: number,
    });
  } catch (error) {
    console.log("Error updating count:", error);
  }
}
