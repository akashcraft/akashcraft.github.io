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
  updatePassword,
} from "firebase/auth";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { FirebaseError } from "firebase/app";
import { useEffect, useState } from "react";
import { auth, db, storage } from "../akash-commons/firebaseHooks";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
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
          setIsSuccess(true);
          localStorage.setItem("loggedIn", "true");
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
          localStorage.setItem("loggedIn", "true");
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
            name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
            email: data.email,
            photo: "",
            provider: "email",
            classSharing: false,
            examSharing: false,
          });
          await sendEmailVerification(newUser);
          await auth.signOut();
          localStorage.setItem("loggedIn", "true");
          setIsSuccess(true);
        } else {
          localStorage.setItem("loggedIn", "false");
          setIsError(true);
          setStatusCode(500);
        }
      } catch (error) {
        if ((error as FirebaseError).code === "auth/email-already-in-use") {
          try {
            const userCredential = await signInWithEmailAndPassword(
              auth,
              data.email,
              data.password!,
            );
            const existingUser = userCredential.user;

            if (!existingUser.emailVerified) {
              await sendEmailVerification(existingUser);
              await auth.signOut();

              localStorage.setItem("loggedIn", "true");
              setIsSuccess(true);
              return;
            } else {
              localStorage.setItem("loggedIn", "false");
              setIsError(true);
              setStatusCode(409);
            }
          } catch (error) {
            localStorage.setItem("loggedIn", "false");
            console.error(error);
            setIsError(true);
            setStatusCode(409);
          }
        } else {
          localStorage.setItem("loggedIn", "false");
          setIsError(true);
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
        localStorage.setItem("loggedIn", "true");
        setIsSuccess(true);
      } catch (error) {
        localStorage.setItem("loggedIn", "true");
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
        localStorage.setItem("loggedIn", "true");
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
        const credential = EmailAuthProvider.credential(email, password ?? "");
        await reauthenticateWithCredential(currentUser!, credential);
      }

      if (currentUser && currentUser.uid === uid) {
        const examQuery = query(
          collection(db, "exam"),
          where("uid", "==", uid),
        );
        const examSnap = await getDocs(examQuery);
        const examDeletions = examSnap.docs.map((d) => deleteDoc(d.ref));

        const classQuery = query(
          collection(db, "class"),
          where("uid", "==", uid),
        );
        const classSnap = await getDocs(classQuery);
        const classDeletions = classSnap.docs.map((d) => deleteDoc(d.ref));

        await Promise.all([...examDeletions, ...classDeletions]);

        await deleteUser(currentUser);
        await deleteDoc(recordRef);

        setIsSuccess(true);
        localStorage.removeItem("loggedIn");
        sessionStorage.removeItem("account-photo");
        sessionStorage.removeItem("account-name");
        sessionStorage.removeItem("account-game");
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
          setIsError(true);
        }
      } else if ((error as FirebaseError).code === "auth/invalid-credential") {
        setErrorMessage("Invalid Credentials");
        setIsError(true);
      } else {
        setIsError(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const changeUserPassword = async (
    email: string,
    oldPassword: string,
    newPassword: string,
  ) => {
    setIsSubmitting(true);
    setIsError(false);
    setIsSuccess(false);

    const currentUser = auth.currentUser;

    try {
      const credential = EmailAuthProvider.credential(email, oldPassword ?? "");
      await reauthenticateWithCredential(currentUser!, credential);
      await updatePassword(currentUser!, newPassword);
      setIsSuccess(true);
    } catch (error) {
      if ((error as FirebaseError).code === "auth/invalid-credential") {
        setErrorMessage("Invalid Credentials");
        setIsError(true);
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
    changeUserPassword,
  };
}

export function usePhotoUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const uploadPhoto = async (uid: string, file: File) => {
    setIsUploading(true);
    setUploadError(null);

    // 1. Create storage reference
    const storageRef = ref(storage, `profile_photos/${uid}`);

    try {
      // 2. Upload the file to Storage
      const snapshot = await uploadBytes(storageRef, file);

      // 3. Get the public download URL
      const downloadURL = await getDownloadURL(snapshot.ref);

      // 4. Update the photo field in Firestore
      const userDocRef = doc(db, "user", uid);
      await updateDoc(userDocRef, {
        photo: downloadURL,
      });

      return downloadURL;
    } catch (error) {
      console.error(error);
      setUploadError((error as FirebaseError).message);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const deletePhoto = async (uid: string) => {
    setIsUploading(true);
    const storageRef = ref(storage, `profile_photos/${uid}`);
    const userDocRef = doc(db, "user", uid);

    try {
      await deleteObject(storageRef);

      await updateDoc(userDocRef, {
        photo: "",
      });
    } catch (error) {
      if ((error as FirebaseError).code === "storage/object-not-found") {
        await updateDoc(userDocRef, { photo: "" });
      } else {
        setUploadError((error as FirebaseError).message);
      }
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadPhoto, deletePhoto, isUploading, uploadError };
}

export function useAdminSettingsSubmit() {
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

  const updateGeneralSetting = async (
    field: string,
    value: string,
    callback?: () => void,
  ) => {
    setIsSubmitting(true);
    setIsError(false);
    setIsSuccess(false);

    try {
      const generalRef = doc(db, "link", "general");
      await setDoc(generalRef, { [field]: value }, { merge: true });

      setIsSuccess(true);
      if (callback) callback();
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addUserLink = async (
    header: string,
    description: string,
    url: string,
  ) => {
    setIsSubmitting(true);
    setIsError(false);
    setIsSuccess(false);

    try {
      const linkCollectionRef = collection(db, "link");
      await addDoc(linkCollectionRef, {
        header,
        description,
        url,
      });

      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAirportSchedules = async () => {
    setIsSubmitting(true);
    setIsError(false);
    setIsSuccess(false);

    try {
      const airportCollectionRef = collection(db, "airport");
      const querySnapshot = await getDocs(airportCollectionRef);

      const batch = writeBatch(db);
      querySnapshot.forEach((document) => {
        batch.delete(document.ref);
      });

      await batch.commit();
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    isError,
    isSuccess,
    errorMessage,
    updateGeneralSetting,
    addUserLink,
    resetAirportSchedules,
  };
}

export function useAdminLinkDelete() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isSuccess || isError) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
        setIsError(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, isError]);

  const deleteLink = async (uid: string) => {
    setIsSubmitting(true);
    setIsError(false);
    setIsSuccess(false);

    try {
      const linkRef = doc(db, "link", uid);
      await deleteDoc(linkRef);
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    isError,
    isSuccess,
    deleteLink,
  };
}

export function useExamHooks() {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [successText, setSuccessText] = useState("");
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    if (isSuccess || isError) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
        setIsError(false);
        setSuccessText("");
        setErrorMessage("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, isError]);

  const updateSharing = async (uid: string, value: boolean) => {
    setIsError(false);
    setErrorMessage("");

    try {
      const userRef = doc(db, "user", uid);
      await updateDoc(userRef, { examSharing: value });
      setIsSharing(value);
      setSuccessText(value ? "Sharing Enabled" : "Sharing Disabled");
      setIsSuccess(true);
    } catch (error) {
      setErrorMessage((error as FirebaseError).message || "Error");
      setIsError(true);
    }
  };

  const addExam = async (
    uid: string,
    courseName: string,
    date: string,
    startTime: string,
    endTime: string,
  ) => {
    if (!uid) {
      setErrorMessage("Unauthorized");
      setIsError(true);
      return;
    }
    if (!courseName || !date) {
      setErrorMessage("Course Name and Date are required");
      setIsError(true);
      return;
    }

    let timeRange = "";
    if (!startTime && !endTime) {
      timeRange = "Not Set";
    } else if (!startTime) {
      timeRange = `Until ${endTime}`;
    } else if (!endTime) {
      timeRange = `From ${startTime}`;
    } else {
      timeRange = `${startTime} - ${endTime}`;
    }

    setIsError(false);
    setIsSuccess(false);
    setErrorMessage("");

    try {
      const examRef = collection(db, "exam");
      await addDoc(examRef, {
        uid: uid,
        courseName: courseName.toUpperCase(),
        date: date,
        time: timeRange,
      });

      setSuccessText("Exam added successfully");
      setIsSuccess(true);
    } catch (error) {
      setErrorMessage((error as FirebaseError).message || "Error");
      setIsError(true);
    }
  };

  const deleteExam = async (examId: string) => {
    setIsError(false);
    setIsSuccess(false);
    setErrorMessage("");

    try {
      const examDocRef = doc(db, "exam", examId);
      await deleteDoc(examDocRef);
      setSuccessText("Exam deleted");
      setIsSuccess(true);
    } catch (error) {
      setErrorMessage(
        (error as FirebaseError).message || "Error deleting exam",
      );
      setIsError(true);
    }
  };

  return {
    isSuccess,
    successText,
    isError,
    errorMessage,
    isSharing,
    setIsSharing,
    updateSharing,
    addExam,
    deleteExam,
  };
}

export function useClassHooks() {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [successText, setSuccessText] = useState("");
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    if (isSuccess || isError) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
        setIsError(false);
        setSuccessText("");
        setErrorMessage("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, isError]);

  const updateSharing = async (uid: string, value: boolean) => {
    setIsError(false);
    setIsSuccess(false);
    setErrorMessage("");

    try {
      const userRef = doc(db, "user", uid);
      await updateDoc(userRef, { classSharing: value });
      setSuccessText(value ? "Sharing Enabled" : "Sharing Disabled");
      setIsSharing(value);
      setIsSuccess(true);
    } catch (error) {
      setErrorMessage((error as FirebaseError).message || "Error");
      setIsError(true);
    }
  };

  const addClass = async (
    uid: string,
    className: string,
    daysOfWeek: string,
    startTime: string,
    endTime: string,
  ) => {
    if (!uid) {
      setErrorMessage("Unauthorized");
      setIsError(true);
      return;
    }

    if (!startTime || !endTime || !className || !daysOfWeek) {
      setErrorMessage("All fields are required");
      setIsError(true);
      return;
    }

    const getMinutes = (timeStr: string) => {
      const [hours, minutes] = timeStr.split(":").map(Number);
      return hours * 60 + minutes;
    };

    const startMinutes = getMinutes(startTime);
    const endMinutes = getMinutes(endTime);

    if (endMinutes <= startMinutes) {
      setErrorMessage("End time must be after Start time");
      setIsError(true);
      return;
    }

    setIsError(false);
    setIsSuccess(false);
    setErrorMessage("");

    try {
      const classRef = collection(db, "class");
      await addDoc(classRef, {
        uid,
        className: className.toUpperCase(),
        daysOfWeek,
        startTime,
        endTime,
      });

      setSuccessText("Class added successfully");
      setIsSuccess(true);
    } catch (error) {
      setErrorMessage((error as FirebaseError).message || "Error");
      setIsError(true);
    }
  };

  const deleteClass = async (classId: string) => {
    setIsError(false);
    setIsSuccess(false);
    setErrorMessage("");

    try {
      const classDocRef = doc(db, "class", classId);
      await deleteDoc(classDocRef);
      setSuccessText("Class deleted");
      setIsSuccess(true);
    } catch (error) {
      setErrorMessage(
        (error as FirebaseError).message || "Error deleting class",
      );
      setIsError(true);
    }
  };

  return {
    isSuccess,
    successText,
    isError,
    isSharing,
    errorMessage,
    setIsSharing,
    updateSharing,
    addClass,
    deleteClass,
  };
}

export function useExamSharing(uid: string | undefined) {
  const [data, setData] = useState<{
    exams: unknown[];
    name: string;
    university: string;
    semester: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!uid) return;

    const fetchAllData = async () => {
      setLoading(true);
      setError(null);

      try {
        const userDocRef = doc(db, "user", uid);
        const userSnap = await getDoc(userDocRef);

        if (!userSnap.exists()) {
          setError("Invalid URL");
          setLoading(false);
          return;
        }

        const userData = userSnap.data();

        if (!userData.examSharing && uid !== auth.currentUser?.uid) {
          setError("Invalid URL");
          setData(null);
          setLoading(false);
          return;
        }

        const now = new Date();
        now.setHours(0, 0, 0, 0);

        const examQuery = query(
          collection(db, "exam"),
          where("uid", "==", uid),
        );
        const examSnap = await getDocs(examQuery);

        const examList = examSnap.docs
          .map((doc) => {
            const data = doc.data();
            return {
              courseName: data.courseName,
              date: data.date,
              time: data.time,
              uid: doc.id,
            };
          })
          .filter((exam) => new Date(exam.date) >= now)
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
          );

        setData({
          exams: examList,
          name: userData.name || "",
          university: userData.university || "",
          semester: userData.semester || "",
        });
      } catch (err) {
        console.error("Error fetching exam data:", err);
        setError("500 - Internal Server Error");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [uid]);

  return { data, error, loading };
}

export function useClassSharing(uid: string | undefined) {
  const [data, setData] = useState<{
    events: unknown[];
    name: string;
    university: string;
    semester: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!uid) return;

    const fetchAllData = async () => {
      setLoading(true);
      setError(null);

      try {
        const userDocRef = doc(db, "user", uid);
        const userSnap = await getDoc(userDocRef);

        if (!userSnap.exists()) {
          setError("Invalid URL");
          setLoading(false);
          return;
        }

        const userData = userSnap.data();

        if (!userData.classSharing && uid !== auth.currentUser?.uid) {
          setError("Invalid URL");
          setData(null);
          setLoading(false);
          return;
        }

        const classQuery = query(
          collection(db, "class"),
          where("uid", "==", uid),
        );
        const classSnap = await getDocs(classQuery);
        const dayMap: { [key: string]: number } = {
          M: 1,
          T: 2,
          W: 3,
          R: 4,
          F: 5,
        };

        const classList = classSnap.docs.map((doc) => {
          const data = doc.data();

          const numericDays = data.daysOfWeek
            ? data.daysOfWeek.split("").map((char: string) => dayMap[char])
            : [];

          return {
            title: data.className,
            startTime: data.startTime,
            endTime: data.endTime,
            daysOfWeek: numericDays,
            uid: doc.id,
          };
        });

        setData({
          events: classList,
          name: userData.name || "",
          university: userData.university || "",
          semester: userData.semester || "",
        });
      } catch (err) {
        console.error("Error fetching class data:", err);
        setError("500 - Internal Server Error");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [uid]);

  return { data, error, loading };
}
