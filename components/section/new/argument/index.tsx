import LoadingDots from "@/components/ui/LoadingDots";
import { Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

interface IProps {
  step: number;
  argument: string;
  error?: string;
  isLoading?: boolean;
}

const ArgumentComponent: React.FC<IProps> = ({
  argument,
  step,
  error,
  isLoading,
}) => {
  const router = useRouter();

  return (
    <Transition
      show={step > 2}
      enter="transition-opacity duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="flex space-x-5 mb-28">
        <div className="h-5 w-5 rounded-full bg-gradient-to-r from-purple-600 to-rose-500 mt-4">
          .
        </div>

        {isLoading ? (
          <div className="w-full flex items-center justify-center p-10 pt-5">
            <LoadingDots />
          </div>
        ) : error ? (
          <div className="w-full flex items-center justify-center px-2 py-10">
            <div className="flex flex-col space-y-4 items-center justify-center my-2">
              <p className="text-red-500 text-center">{error}</p>

              <div
                onClick={() => {
                  router.push("/");
                  router.push("/new");
                }}
                className="py-2 px-4 rounded-md text-white font-medium bg-gradient-to-br from-yellow-500 via-purple-500 to-rose-500 cursor-pointer hover:opacity-80 duration-150"
              >
                Start
              </div>
            </div>
          </div>
        ) : (
          <div
            className="w-fit rounded-lg border border-slate-700 text-white flex flex-col space-y-5
                 p-5"
          >
            <ReactMarkdown className="">{argument}</ReactMarkdown>
          </div>
        )}
      </div>
    </Transition>
  );
};

export default ArgumentComponent;
