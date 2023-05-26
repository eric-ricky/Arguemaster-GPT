import { useAuthContext } from "@/lib/context/auth";
import { useHistoryContext } from "@/lib/context/history";
import { db } from "@/lib/firebaseConfig";
import { Transition } from "@headlessui/react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useRef } from "react";

interface IProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  issue: string;
  position: string;
  setPosition: Dispatch<SetStateAction<string>>;
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
  setError?: Dispatch<SetStateAction<string>>;
  setArgument: Dispatch<SetStateAction<string>>;
}

const PositionComponent: React.FC<IProps> = ({
  position,
  step,
  issue,
  setStep,
  setPosition,
  setError,
  setIsLoading,
  setArgument,
}) => {
  const authCtx = useAuthContext();
  const histCtx = useHistoryContext();
  const router = useRouter();
  const positionRef = useRef<HTMLInputElement>(null);

  const handlePosition = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!authCtx?.state.user?.uid) return;
    if (!issue) return;

    const value = positionRef.current?.value;
    if (!value) return;

    setPosition(value.trim());
    setStep(3);

    try {
      setIsLoading && setIsLoading(true);

      const response = await fetch("/api/v1/argument", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          issue,
          position: value.trim(),
        }),
      });

      const data = await response.json();
      console.log("data", data);

      if (data.error) {
        setError && setError(data.error);
        setIsLoading && setIsLoading(false);
        return;
      }

      const id = data.data.id;
      const { text } = data.data.choices[0];

      console.log("Argument==>", text);
      setArgument(text);
      setIsLoading && setIsLoading(false);

      // setting history
      histCtx?.setHistory((prev) => [
        ...prev,
        { id, issue, position: value.trim(), argument: text },
      ]);

      const histRef = doc(db, "history", id);
      const payload = {
        issue,
        argument: text,
        position: value.trim(),
        author: authCtx.state.user.uid,
      };
      await setDoc(histRef, payload);
      console.log("added ==>", payload);

      // route to /new/[id]
      router.push(`/new/${id}`);
    } catch (err) {
      setIsLoading && setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      <Transition
        show={step > 1}
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

          <div className="flex-grow rounded-lg border border-slate-700 p-5 text-white flex flex-col space-y-5">
            <p>Issue: {issue}</p>

            <p>What's your position on this topic or issue.</p>

            <Transition.Child
              enter="transition-scale ease-in-out duration-300"
              enterFrom="scale-50"
              enterTo="scale-100"
              leave="transition-scale ease-in-out duration-300"
              leaveFrom="scale-100"
              leaveTo="scale-75"
              as="form"
              onSubmit={handlePosition}
              className={`${
                position ? "hidden" : "flex"
              } items-center bg-slate-800 rounded-lg overflow-hidden  md:w-[75%] border  border-slate-600 `}
            >
              <input
                type="text"
                ref={positionRef}
                placeholder="Your position Exa: Absolutely no, it'll be a burden on low-income earners."
                className="flex-grow py-2 px-4 bg-transparent border-none outline-none"
              />

              <button
                type="submit"
                className="bg-gradient-to-br from-yellow-500 via-purple-500 to-rose-500 hover:opacity-80 duration-150 p-3"
              >
                <PaperAirplaneIcon className="w-5 text-white" />
              </button>
            </Transition.Child>
          </div>
        </div>
      </Transition>

      <Transition
        show={!!position}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        as="div"
        className="flex items-center justify-end"
      >
        <p className="text-right text-white">{position}</p>
      </Transition>
    </>
  );
};

export default PositionComponent;
