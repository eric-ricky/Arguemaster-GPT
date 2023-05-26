import GoogleIcon from "@/components/ui/icons/google";
import { auth, db, googleProvider } from "@/lib/firebaseConfig";
import { IUser } from "@/types";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";

interface IProps {
  setIsLoadingStatus: Dispatch<SetStateAction<string | undefined>>;
  setFormError: Dispatch<SetStateAction<string | undefined>>;
}

const GoogleComponent: React.FC<IProps> = ({
  setFormError,
  setIsLoadingStatus,
}) => {
  const router = useRouter();

  const handleAuth = async () => {
    try {
      setFormError(undefined);
      setIsLoadingStatus("Authenticating...");

      const result = await signInWithPopup(auth, googleProvider);
      const docRef = doc(db, "users", result.user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        const newUser: IUser = {
          uid: result.user.uid,
          displayName: result.user.displayName || "",
          email: result.user.email || "",
          photoURL: result.user.photoURL || "",
          phone: result.user.phoneNumber || "",
          createdAt: result.user.metadata.creationTime,
        };
        await setDoc(docRef, newUser, { merge: true });
        Cookies.set("user", JSON.stringify(newUser));
      }

      setTimeout(() => {
        setIsLoadingStatus("Security Checks...");
        router.reload();
      }, 2000);
    } catch (error: any) {
      const errCode = error.code || "";
      console.log(errCode);

      let message: string;

      switch (errCode) {
        case "auth/cancelled-popup-request":
          message = "Sign in request cancelled. Please try again.";
          break;
        case "auth/popup-closed-by-user":
          message = "Sign in window closed. Please try again.";
          break;
        case "auth/popup-blocked":
          message =
            "Authentication popup blocked. Please enable popups and try again.";
          break;
        case "auth/popup-opened-over-another-popup":
          message =
            "Only one sign in window is allowed at a time. Please close any other open sign in windows and try again.";
          break;
        case "auth/unauthorized-domain":
          message =
            "Unable to authenticate from this domain. Please try again from an authorized domain.";
          break;
        case "auth/operation-not-supported-in-this-environment":
          message =
            "Sign in is not supported on this device. Please try again from a supported device.";
          break;
        case "auth/internal-error":
          message = "An internal error has occurred. Please try again later.";
          break;
        default:
          message = "Something went wrong. Please try again!";
          break;
      }
      setFormError(message);
      setIsLoadingStatus(undefined);
    }
  };

  return (
    <div
      onClick={handleAuth}
      className="flex items-center justify-center space-x-2 rounded-md py-2  border border-slate-800 bg-slate-800 text-white cursor-pointer hover:bg-slate-700 ease-in-out duration-200 active:scale-95"
    >
      <GoogleIcon />

      <p className="">Sign in with Google</p>
    </div>
  );
};

export default GoogleComponent;
