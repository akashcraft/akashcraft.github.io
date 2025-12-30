import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  deleteUser,
  reauthenticateWithPopup,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useEffect, useState } from "react";
import { auth, db } from "../akash-commons/firebaseHooks";
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export function useLoginSubmit() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [statusCode, setStatusCode] = useState<number>(0);

  const signInWithGitHub = async () => {
    setIsSubmitting(true);
    setIsError(false);
    setIsSuccess(false);
    signInWithPopup(auth, new GithubAuthProvider())
      .then(async (result) => {
        const newUser = result.user;
        if (newUser) {
          await setDoc(
            doc(db, "user", newUser.uid),
            {
              name: newUser.displayName || "",
              email: newUser.email || "",
              photo: newUser.photoURL || "",
              provider: "google",
            },
            { merge: true },
          );
          window.location.href = "/#/account/home";
        } else {
          setIsError(true);
          setStatusCode(500);
        }
      })
      .catch((error) => {
        if (
          (error as FirebaseError).code ==
          "auth/account-exists-with-different-credential"
        ) {
          setIsError(true);
          setStatusCode(409);
        } else if ((error as FirebaseError).code === "auth/user-cancelled") {
          setIsError(true);
          setStatusCode(410);
        } else if (
          (error as FirebaseError).code !== "auth/popup-closed-by-user"
        ) {
          setIsError(true);
          setStatusCode(500);
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const signInWithGoogle = async () => {
    setIsSubmitting(true);
    setIsError(false);
    setIsSuccess(false);
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(async (result) => {
        const newUser = result.user;
        if (newUser) {
          await setDoc(
            doc(db, "user", newUser.uid),
            {
              name: newUser.displayName || "",
              email: newUser.email || "",
              photo: newUser.photoURL || "",
              provider: "google",
            },
            { merge: true },
          );
          setIsSuccess(true);
        } else {
          setIsError(true);
          setStatusCode(500);
        }
      })
      .catch((error) => {
        if (
          (error as FirebaseError).code ==
          "auth/account-exists-with-different-credential"
        ) {
          setIsError(true);
          setStatusCode(409);
        } else if ((error as FirebaseError).code === "auth/user-cancelled") {
          setIsError(true);
          setStatusCode(410);
        } else if (
          (error as FirebaseError).code !== "auth/popup-closed-by-user"
        ) {
          setIsError(true);
          setStatusCode(500);
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const submitLoginForm = async (data: {
    name?: string;
    email: string;
    password?: string;
  }) => {
    setIsSubmitting(true);
    setIsError(false);
    setIsSuccess(false);

    if (data.name && data.email && data.password) {
      //Registration
      try {
        await createUserWithEmailAndPassword(auth, data.email!, data.password!);
        const newUser = auth.currentUser;
        if (newUser) {
          await setDoc(doc(db, "user", newUser.uid), {
            name: data.name,
            email: data.email,
            photo: "",
            provider: "email",
          });
          await sendEmailVerification(newUser);
          await auth.signOut();
          setIsSuccess(true);
        } else {
          setIsError(true);
          setStatusCode(500);
        }
      } catch (error) {
        setIsError(true);
        if ((error as FirebaseError).code === "auth/email-already-in-use") {
          setStatusCode(409);
        } else {
          setStatusCode(500);
        }
      } finally {
        setIsSubmitting(false);
      }
    } else if (data.email && data.password) {
      //Login
      try {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        if (auth.currentUser && !auth.currentUser.emailVerified) {
          await auth.signOut();
          setIsError(true);
          setStatusCode(404);
          setIsSubmitting(false);
          return;
        }
        setIsSuccess(true);
      } catch (error) {
        setIsError(true);
        switch ((error as FirebaseError).code) {
          case "auth/invalid-credential":
            setStatusCode(400);
            break;
          case "auth/user-not-found":
            setStatusCode(404);
            break;
          case "auth/user-disabled":
            setStatusCode(403);
            break;
          default:
            setStatusCode(500);
            break;
        }
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Password Reset
      try {
        await sendPasswordResetEmail(auth, data.email);
        setIsSuccess(true);
      } catch (error) {
        setIsError(true);
        console.log((error as FirebaseError).code);
        setStatusCode(500);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return {
    isSubmitting,
    isError,
    isSuccess,
    statusCode,
    submitLoginForm,
    signInWithGoogle,
    signInWithGitHub,
  };
}

export function useSettingsSubmit() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (isSuccess || isError) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
        setIsError(false);
        setErrorMessage("");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isSuccess, isError]);

  const updateUserSetting = async (
    uid: string,
    field: string,
    value: string,
    callback?: () => void,
  ) => {
    setIsSubmitting(true);
    setIsError(false);
    setIsSuccess(false);
    const collectionRef = collection(db, "user");
    const recordRef = doc(collectionRef, uid);

    try {
      await updateDoc(recordRef, {
        [field]: value,
      });
      if (callback) {
        setIsSuccess(true);
        callback();
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
      console.log((error as FirebaseError).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteUserAccount = async (
    uid: string,
    email: string,
    provider: string,
    password?: string,
  ) => {
    setIsSubmitting(true);
    setIsError(false);
    setIsSuccess(false);

    const recordRef = doc(db, "user", uid);
    const currentUser = auth.currentUser;

    try {
      if (provider === "email") {
        console.log("Reauthenticating with email and password");
        const credential = EmailAuthProvider.credential(email, password ?? "");
        await reauthenticateWithCredential(currentUser!, credential);
      }
      if (currentUser && currentUser.uid === uid) {
        await deleteUser(currentUser);
        await deleteDoc(recordRef);
        setIsSuccess(true);
        await auth.signOut();
      } else {
        throw new Error("No authenticated user found to delete.");
      }
    } catch (error) {
      if ((error as FirebaseError).code === "auth/requires-recent-login") {
        if (provider === "google") {
          const providerInstance = new GoogleAuthProvider();
          await reauthenticateWithPopup(currentUser!, providerInstance);
          await deleteUserAccount(uid, email, provider);
        } else if (provider === "github") {
          const providerInstance = new GithubAuthProvider();
          await reauthenticateWithPopup(currentUser!, providerInstance);
          await deleteUserAccount(uid, email, provider);
        } else {
          if (password) {
            const credential = EmailAuthProvider.credential(email, password);
            await reauthenticateWithCredential(currentUser!, credential);
            await deleteUserAccount(uid, email, provider);
          } else {
            setIsError(true);
            setErrorMessage("Password is required for re-authentication.");
            setIsSubmitting(false);
            return;
          }
        }
      } else {
        setIsError(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    isError,
    isSuccess,
    errorMessage,
    updateUserSetting,
    deleteUserAccount,
  };
}
