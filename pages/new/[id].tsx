import MainLayout from "@/components/layout";
import ArgumentComponent from "@/components/section/new/argument";
import IssueComponent from "@/components/section/new/issue";
import PositionComponent from "@/components/section/new/position";
import { useHistoryContext } from "@/lib/context/history";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { NextPageWithLayout } from "../page";

const SingleArgumentPage: NextPageWithLayout = () => {
  const router = useRouter();
  const id = router.query.id;

  const histCtx = useHistoryContext();
  const current = histCtx?.history.find((hist) => hist.id === `${id}`);

  const [issue, setIssue] = useState(current?.issue || "");
  const [position, setPosition] = useState(current?.position || "");
  const [argument, setArgument] = useState(current?.argument || "");
  const [step, setStep] = useState(current ? 3 : 1);

  useEffect(() => {
    console.log("ID changed ===>", id);
    const newCurrent = histCtx?.history.find((hist) => hist.id === `${id}`);

    if (!newCurrent) return;

    // setCurrent(newCurrent);
    setIssue(newCurrent.issue);
    setPosition(newCurrent.position);
    setArgument(newCurrent.argument);
  }, [id, histCtx?.history]);

  if (!current) {
    return (
      <section className="h-screen overflow-y-scroll scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-700 py-12">
        <div className="container mx-auto px-5 py-10 xl:px-80 lg:px-12 flex flex-col space-y-5 items-center">
          <div className="text-white">Nothing found here!</div>

          <Link
            href="/new"
            className="w-fit py-2 px-4 rounded-md text-white font-medium bg-gradient-to-br from-yellow-500 via-purple-500 to-rose-500 cursor-pointer hover:opacity-80 duration-150"
          >
            New
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="h-screen overflow-y-scroll scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-700 py-12">
      <div className="container mx-auto px-5 py-10 xl:px-80 lg:px-12">
        <div className="flex flex-col md:space-y-12 space-y-8">
          <IssueComponent
            issue={issue}
            setIssue={setIssue}
            setStep={setStep}
            step={step}
          />

          <PositionComponent
            issue={issue}
            position={position}
            setArgument={setArgument}
            setPosition={setPosition}
            setStep={setStep}
            step={step}
          />

          <ArgumentComponent argument={argument} step={step} />
        </div>
      </div>
    </section>
  );
};

export default SingleArgumentPage;

SingleArgumentPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;
