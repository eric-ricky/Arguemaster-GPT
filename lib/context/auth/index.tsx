import { auth, db } from "@/lib/firebaseConfig";
import { IUser } from "@/types";
import { signOut } from "firebase/auth";
import {
  DocumentData,
  DocumentSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { IAuthContext, IAuthContextProvider, IAuthState } from "./types";

const initialState = {
  user: undefined,
  setUser: () => {},
  handleLogin: () => {},
  handleLogout: () => {},
};

const AuthContext = createContext<IAuthContext | null>(null);

const AuthContextProvider: React.FC<IAuthContextProvider> = ({ children }) => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [state, setState] = useState<IAuthState>(initialState);

  useEffect(() => {
    if (loading) return;
    if (!user?.uid) return;

    // check for user in cookie
    const userCookie = Cookies.get("user");
    if (userCookie) {
      const activeUser = JSON.parse(userCookie);
      setState((prev) => ({ ...prev, user: activeUser }));
      return;
    }

    // else set from firestore
    const fetchUser = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) return;

        const payload: IUser = formatUser(docSnap);

        Cookies.set("user", JSON.stringify(payload));
        setState((prev) => ({ ...prev, user: payload }));
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [loading, user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Cookies.remove("user");
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const setUser = (user: IUser) => {
    setState((prev) => ({ ...prev, user }));
  };

  return (
    <AuthContext.Provider value={{ state, setUser, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);

const formatUser = (docSnap: DocumentSnapshot<DocumentData>) => {
  const payload: IUser = {
    uid: docSnap.data()?.uid,
    displayName: docSnap.data()?.displayName,
    email: docSnap.data()?.email,
    photoURL: docSnap.data()?.photoURL,
    phone: docSnap.data()?.phone,
    createdAt: docSnap.data()?.createdAt,
  };

  return { ...payload };
};
