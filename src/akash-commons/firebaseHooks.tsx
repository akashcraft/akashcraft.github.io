import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  initializeFirestore,
  onSnapshot,
  persistentLocalCache,
  persistentMultipleTabManager,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyDoAKXQrOtB6EAHNvaiOk98EZNXpreXQDM",
  authDomain: "akashcraft-firebase.firebaseapp.com",
  projectId: "akashcraft-firebase",
  storageBucket: "akashcraft-firebase.firebasestorage.app",
  messagingSenderId: "120116375945",
  appId: "1:120116375945:web:2589bc98e94d7ff845b158",
};

export const app = initializeApp(firebaseConfig);

export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});

export const auth = getAuth();

export const storage = getStorage(app);

export function useGetCount(recordName: string) {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const collectionRef = collection(db, "count");
    const recordRef = doc(collectionRef, recordName);

    const unsubscribe = onSnapshot(
      recordRef,
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
      (error) => {
        console.error(error);
        setError(true);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [recordName]);

  return { count, loading, error };
}
export async function updateCount(number: number, recordName: string) {
  const collectionRef = collection(db, "count");
  const recordRef = doc(collectionRef, recordName);

  try {
    await setDoc(recordRef, {
      count: number,
    });
  } catch (error) {
    console.error("Error updating count:", error);
  }
}

export const useContactSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const submitContactForm = async (data: {
    name?: string;
    email?: string;
    message?: string;
  }) => {
    setIsSubmitting(true);
    setIsError(false);
    setIsSuccess(false);

    try {
      const collectionRef = collection(db, "contacts");
      const contactRef = doc(collectionRef);
      await setDoc(contactRef, data);
      setIsSuccess(true);
    } catch (error) {
      setIsError(true);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, isError, isSuccess, submitContactForm };
};
