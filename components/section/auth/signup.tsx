import { auth, db } from "@/lib/firebaseConfig";
import { IUser } from "@/types";
import { Transition } from "@headlessui/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Form, FormikProvider, useFormik } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import * as Yup from "yup";

interface IProps {
  setIsLoadingStatus: Dispatch<SetStateAction<string | undefined>>;
  setFormError: Dispatch<SetStateAction<string | undefined>>;
  showSignup: boolean;
}

const SignupComponent: React.FC<IProps> = ({
  setFormError,
  setIsLoadingStatus,
  showSignup,
}) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const userSchema = Yup.object({
    firstname: Yup.string().required("First Name is required"),
    lastname: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Provide a valid email"),
    password: Yup.string()
      .min(7, "Password is too short")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      try {
        setFormError(undefined)
        setIsLoadingStatus("Authenticating...");

        const { email, firstname, lastname, password } = values;
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // update profile
        // console.log('update profile...', result);
        setIsLoadingStatus("Updating profile...");

        await updateProfile(result.user, {
          displayName: `${firstname} ${lastname}`,
        });

        // create user in firestore
        const newUser: IUser = {
          uid: result.user.uid,
          displayName: `${firstname} ${lastname}`,
          email: result.user.email || email,
          phone: result.user.phoneNumber || "",
          createdAt: result.user.metadata.creationTime,
          photoURL: "",
        };
        await setDoc(doc(db, "users", result.user.uid), newUser);

        // set Cookies and success message
        setIsLoadingStatus("Saving details...");
        Cookies.set("user", JSON.stringify(newUser));

        setTimeout(() => {
          setIsLoadingStatus("Security Checks...");
          router.reload();
        }, 2000);
      } catch (error: { code: string } | any) {
        const errCode = error.code || "";
        console.log(errCode);

        let message: string;

        switch (errCode) {
          case "auth/email-already-in-use":
            message =
              "This email is already in use. Please use a different email address or sign in with your existing account.";
            break;
          case "auth/invalid-email":
            message = "Invalid email address. Please check and try again.";
            break;
          case "auth/operation-not-allowed":
            message =
              "Account creation is currently not allowed. Please try again later.";
            break;
          case "auth/weak-password":
            message =
              "Weak password. Your password should be at least 6 characters long and contain a mix of letters, numbers, and symbols.";
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
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Transition
      show={showSignup}
      enter="transition-opacity duration-500 delay-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <FormikProvider value={formik}>
        <Form
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
          className="grid grid-cols-12 gap-4"
        >
          <div className="col-span-12 flex flex-col">
            <input
              type="text"
              {...getFieldProps("firstname")}
              placeholder="First name"
              className="rounded-md py-2 px-4 border bg-slate-700 active:bg-slate-800 text-white"
            />
            {touched.firstname && errors.firstname && (
              <p className="text-sm text-orange-700 text-left mt-1 pl-1 pb-2 outline-slate-400">
                {errors.firstname}
              </p>
            )}
          </div>

          <div className="col-span-12 flex flex-col">
            <input
              type="text"
              {...getFieldProps("lastname")}
              placeholder="Last name"
              className="rounded-md py-2 px-4 border bg-slate-700 active:bg-slate-800 text-white"
            />
            {touched.lastname && errors.lastname && (
              <p className="text-sm text-orange-700 text-left mt-1 pl-1 pb-2 outline-slate-400">
                {errors.lastname}
              </p>
            )}
          </div>

          <div className="col-span-12 flex flex-col">
            <input
              type="email"
              {...getFieldProps("email")}
              placeholder="Email Address"
              className="rounded-md py-2 px-4 border bg-slate-700 active:bg-slate-800 text-white"
            />
            {touched.email && errors.email && (
              <p className="text-sm text-orange-700 text-left mt-1 pl-1 pb-2 outline-slate-400">
                {errors.email}
              </p>
            )}
          </div>

          <div className="col-span-12 flex flex-col">
            <div className="flex items-center rounded-md overflow-hidden border bg-slate-700 relative">
              <input
                type={showPassword ? "text" : "password"}
                {...getFieldProps("password")}
                placeholder="Password"
                className="flex-grow py-2 px-4 border-none outline-none bg-slate-700 text-white"
              />

              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="hover:bg-text-rose-500 w-10 h-10 grid place-items-center cursor-pointer text-white"
              >
                {showPassword ? (
                  <EyeIcon className="w-5" />
                ) : (
                  <EyeSlashIcon className="w-5" />
                )}
              </div>
            </div>

            {touched.password && errors.password && (
              <p className="text-sm text-orange-700 text-left mt-1 pl-1 pb-2 outline-slate-400">
                {errors.password}
              </p>
            )}
          </div>

          <div className="col-span-12 flex flex-col">
            <button
              type="submit"
              className="py-2 px-4 rounded-md bg-rose-500 text-center font-bold text-white active:scale-95 duration-150"
            >
              {isSubmitting ? "Signing..." : "Sign up"}
            </button>
          </div>
        </Form>
      </FormikProvider>
    </Transition>
  );
};

export default SignupComponent;
