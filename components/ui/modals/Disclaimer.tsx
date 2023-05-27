import { useUIContext } from "@/lib/context/ui";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const DisclaimerModal = () => {
  const UICtx = useUIContext();

  const closeModal = () => {
    UICtx?.setShowDisclaimer(false);
  };

  return (
    <>
      <Transition appear show={UICtx?.showDisclaimer} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-70 blur-md" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md mx-4 md:mx-0 transform overflow-hidden rounded-2xl bg-gradient-to-br from-rose-100 via-indigo-300 to-yellow-200 p-6 text-left align-middle shadow-xl transition-all flex flex-col items-center justify-center space-y-10">
                  <Dialog.Title
                    as="h3"
                    className="text-center font-bold text-2xl"
                  >
                    😎 ArguMaster GPT
                  </Dialog.Title>
                  <div className="mt-4 px-4">
                    <p className="text-md text-gray-500 text-center">
                      AI is an area of active research and can be inaccurate. It
                      is important to conduct your own research and critical
                      thinking to verify and refine the arguments generated by
                      the platform.
                    </p>
                  </div>

                  <div className="pb-5">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-yellow-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DisclaimerModal;
