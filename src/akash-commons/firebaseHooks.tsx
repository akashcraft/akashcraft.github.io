import { initializeApp } from "firebase/app";
import {
  collection,
  getFirestore,
  doc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyDoAKXQrOtB6EAHNvaiOk98EZNXpreXQDM",
  authDomain: "akashcraft-firebase.firebaseapp.com",
  projectId: "akashcraft-firebase",
  storageBucket: "akashcraft-firebase.firebasestorage.app",
  messagingSenderId: "120116375945",
  appId: "1:120116375945:web:2589bc98e94d7ff845b158",
};

export function useGetCount(dbname?: string) {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const collectionRef = collection(db, dbname || "eyeport");
    const countRef = doc(collectionRef, "1");

    const unsubscribe = onSnapshot(
      countRef,
      (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setCount(data.count);
          setError(false);
          setLoading(false);
        } else {
          setError(true);
          setLoading(false);
        }
      },
      (err) => {
        console.error("Firebase Error:", err);
        setError(true);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [dbname]);

  return { count, loading, error };
}

export async function updateCount(number: number, dbname?: string) {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const collectionRef = collection(db, dbname || "eyeport");
  const countRef = doc(collectionRef, "1");

  try {
    await setDoc(countRef, {
      count: number,
    });
  } catch (error) {
    console.error("Error updating count:", error);
  }
}

export async function addContact(contact: {
  name?: string;
  email?: string;
  message?: string;
}) {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const collectionRef = collection(db, "contacts");
  const contactRef = doc(collectionRef);

  try {
    await setDoc(contactRef, contact);
  } catch (error) {
    console.error("Error adding contact:", error);
    throw new Error("Failed to add contact");
  }
}
