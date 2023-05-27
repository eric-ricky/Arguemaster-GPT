import { useUIContext } from "@/lib/context/ui";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import MobileSidebar from "./mobile-sidebar";
import Sidebar from "./sidebar";
import Topbar from "./topbar";

interface IMainLayout {
  children: ReactNode;
}

const MainLayout: React.FC<IMainLayout> = ({ children }) => {
  const UICtx = useUIContext();
  const router = useRouter();
  const meta = {
    title:
      "😎 ArguMaster GPT 😅 | Unbeatable Arguments Generator - Win Every Argument 😅",
    description:
      "ArguMaster GPT 😎😅 uses cutting-edge AI technology to generate arguments that are both logical and persuasive. With ArguMaster, you'll never lose an argument again!",
    cardImage: "https://vidawa.top/images/vidawa.ai.jpg",
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <link href="/favicon.ico" rel="shortcut icon" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://wecodepro.top${router.asPath}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.cardImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@vercel" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.cardImage} />
      </Head>

      <div className="grid grid-cols-12 h-screen bg-[#111827]">
        <Sidebar />

        <div className="col-span-12 xl:col-span-10 lg:col-span-8 h-screen overflow-hidden relative">
          <Topbar />

          {children}
        </div>
      </div>

      {UICtx?.showSidebar && (
        <MobileSidebar setShowSidebar={UICtx.setShowSidebar} />
      )}
    </>
  );
};

export default MainLayout;
