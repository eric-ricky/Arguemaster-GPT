import LoadingDots from "@/components/ui/LoadingDots";
import AuthContextProvider from "@/lib/context/auth";
import HistoryContextProvider from "@/lib/context/history";
import UIContextProvider from "@/lib/context/ui";
import { auth } from "@/lib/firebaseConfig";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { NextPageWithLayout } from "./page";

interface IAppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

export default function App({ Component, pageProps }: IAppPropsWithLayout) {
  // eslint-disable-next-line no-unused-vars
  const [_user, isLoading] = useAuthState(auth);
  const getLayout = Component.getLayout || ((page) => page);

  if (isLoading)
    return (
      <div className="fixed top-0 left-0 h-screen w-screen bg-slate-900 grid place-items-center">
        <LoadingDots />
      </div>
    );

  return (
    <>
      <AuthContextProvider>
        <HistoryContextProvider>
          <UIContextProvider>
            {getLayout(<Component {...pageProps} />)}
          </UIContextProvider>
        </HistoryContextProvider>
      </AuthContextProvider>
    </>
  );
}
