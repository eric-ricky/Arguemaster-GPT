import FormButton from "@/components/ui/form/Button";
import { auth } from "@/lib/firebaseConfig";
import { Transition } from "@headlessui/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Form, FormikProvider, useFormik } from "formik";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import * as Yup from "yup";

interface IProps {
  setIsLoadingStatus: Dispatch<SetStateAction<string | undefined>>;
  setFormError: Dispatch<SetStateAction<string | undefined>>;
  showSignup: boolean;
}

const SigninComponent: React.FC<IProps> = ({
  setFormError,
  setIsLoadingStatus,
  showSignup,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const userSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Provide a valid email"),
    password: Yup.string()
      .min(7, "Password is too short")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      try {
        setFormError(undefined);
        setIsLoadingStatus("Authenticating");

        const { email, password } = values;
        await signInWithEmailAndPassword(auth, email, password);

        setTimeout(() => {
          setIsLoadingStatus("Security Checks");
          router.reload();
        }, 2000);
      } catch (error: { code: string } | any) {
        console.log(error);
        const errCode = error.code || "";

        let message: string;

        switch (errCode) {
          case "auth/invalid-email":
            message = "Invalid email address. Please check and try again.";
            break;
          case "auth/user-disabled":
            message =
              "Your account has been disabled. Please contact support for assistance.";
            break;
          case "auth/user-not-found":
            message =
              "This email is not associated with any account. Please check and try again.";
            break;
          case "auth/wrong-password":
            message = "Incorrect password. Please check and try again.";
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
      appear={true}
      show={!showSignup}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
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
            <div className="flex items-center rounded-md overflow-hidden border bg-slate-700 pr-2 relative">
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

          <div className="col-span-12 flex flex-col mt-5">
            <FormButton>{isSubmitting ? "Signing..." : "Sign in"}</FormButton>
          </div>
        </Form>
      </FormikProvider>
    </Transition>
  );
};

export default SigninComponent;
