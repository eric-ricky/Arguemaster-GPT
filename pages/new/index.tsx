import MainLayout from "@/components/layout";
import ArgumentComponent from "@/components/section/new/argument";
import IssueComponent from "@/components/section/new/issue";
import PositionComponent from "@/components/section/new/position";
import { useState } from "react";
import { NextPageWithLayout } from "../page";

const NewArgumentPage: NextPageWithLayout = () => {
  const [error, setError] = useState("");
  const [issue, setIssue] = useState("");
  const [position, setPosition] = useState("");
  const [argument, setArgument] = useState("");
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <section className="h-screen overflow-hidden">
      <div className="py-20 md:py-40 px-5 xl:px-64 lg:px-12 h-full overflow-y-scroll">
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
            setIsLoading={setIsLoading}
            setError={setError}
            setPosition={setPosition}
            setStep={setStep}
            step={step}
          />

          <ArgumentComponent
            argument={argument}
            error={error}
            isLoading={isLoading}
            step={step}
          />
        </div>
      </div>
    </section>
  );
};

export default NewArgumentPage;

NewArgumentPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;
