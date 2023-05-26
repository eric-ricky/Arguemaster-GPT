import { Transition } from "@headlessui/react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useRef, Dispatch, SetStateAction } from "react";

interface IProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  issue: string;
  setIssue: Dispatch<SetStateAction<string>>;
}

const IssueComponent: React.FC<IProps> = ({
  step,
  setStep,
  issue,
  setIssue,
}) => {
  const issueRef = useRef<HTMLInputElement>(null);

  const handleIssue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = issueRef.current?.value;

    if (!value) return;

    setIssue(value.trim());
    setStep(2);
  };

  return (
    <>
      <Transition
        appear={true}
        show={step > 0}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="flex space-x-5">
          <div className="h-5 w-5 rounded-full bg-gradient-to-r from-purple-600 to-rose-500 mt-4">
            .
          </div>

          <div className="w-fit flex-1 rounded-lg border border-slate-700 p-5 text-white flex flex-col space-y-5">
            <p>Hi, welcome to ArgueMaster GPT!</p>
            <p>
              What's the topic or issue you are involved in a discussion about?
            </p>

            <Transition.Child
              enter="transition-scale ease-in-out duration-300"
              enterFrom="scale-50"
              enterTo="scale-100"
              leave="transition-scale ease-in-out duration-300"
              leaveFrom="scale-100"
              leaveTo="scale-75"
              as="form"
              onSubmit={handleIssue}
              className={`${
                issue ? "hidden" : "flex"
              } items-center bg-slate-800 rounded-lg overflow-hidden  md:w-2/3 border  border-slate-600 `}
            >
              <input
                type="text"
                ref={issueRef}
                placeholder="Issue/topic Exa: Should Kenyans be forced to pay for housing?"
                className="flex-grow py-2 px-4 bg-transparent border-none outline-none"
              />

              <button
                type="submit"
                className="bg-gradient-to-br from-yellow-500 via-purple-500 to-rose-500 hover:opacity-80 duration-150 p-3"
              >
                <PaperAirplaneIcon className="w-5 text-white" />
              </button>
            </Transition.Child>

            <div className="hidden items-center bg-slate-800 rounded-lg overflow-hidden  md:w-2/3 border  border-slate-600">
              <input
                type="text"
                placeholder="Issue/topic Exa: Should Kenyans be forced to pay for housing?"
                className="flex-grow py-2 px-4 bg-transparent border-none outline-none"
              />

              <button
                type="submit"
                className="bg-gradient-to-br from-yellow-500 via-purple-500 to-rose-500 hover:opacity-80 duration-150 p-3"
              >
                <PaperAirplaneIcon className="w-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </Transition>

      <Transition
        show={!!issue}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        as="div"
        className="flex items-center justify-end"
      >
        <p className="text-right text-white">{issue}</p>
      </Transition>
    </>
  );
};

export default IssueComponent;
