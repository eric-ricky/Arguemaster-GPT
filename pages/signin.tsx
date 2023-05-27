import GoogleComponent from "@/components/section/auth/google";
import SigninComponent from "@/components/section/auth/signin";
import SignupComponent from "@/components/section/auth/signup";
import LoadingDots from "@/components/ui/LoadingDots";
import Logo from "@/components/ui/Logo";
import { useState } from "react";

const SigninPage = () => {
  const [isLoadingStatus, setIsLoadingStatus] = useState<string | undefined>();
  const [formError, setFormError] = useState<string | undefined>(undefined);

  const [showSignup, setShowSignup] = useState(false);

  return (
    <>
      {isLoadingStatus && (
        <div className="fixed top-0 left-0 z-50 w-full h-screen bg-slate-900 bg-opacity-60 grid place-items-center text-white text-center text-lg">
          <LoadingDots />
        </div>
      )}

      <section className="bg-slate-900 min-h-screen md:pt-52 pt-20 lg:pb-20 pb-32">
        <div className="container mx-auto w-full min-h-full px-10 md:px-44 flex bg-slate-00">
          <div className="w-full md:w-96 mx-auto flex flex-col space-y-8 rounded-xl md:px-5 bg-whit">
            <div className="grid place-items-center text-center w-full pb-8">
              <Logo bgDark />
            </div>

            <GoogleComponent
              setFormError={setFormError}
              setIsLoadingStatus={setIsLoadingStatus}
            />

            {showSignup ? (
              <SignupComponent
                setFormError={setFormError}
                setIsLoadingStatus={setIsLoadingStatus}
                showSignup={showSignup}
              />
            ) : (
              <SigninComponent
                setFormError={setFormError}
                setIsLoadingStatus={setIsLoadingStatus}
                showSignup={showSignup}
              />
            )}

            <div className="flex items-center justify-center space-x-2">
              <span className="text-zinc-400">
                {showSignup
                  ? "Already have an account?"
                  : "Not registered yet?"}
              </span>
              <span
                onClick={() => setShowSignup((prev) => !prev)}
                className="text-slate-100 underline underline-offset-1 cursor-pointer"
              >
                {showSignup ? "Sign in" : " Sign up"}
              </span>
            </div>

            {formError && (
              <div className=" text-red-500 text-center">{formError}</div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default SigninPage;
