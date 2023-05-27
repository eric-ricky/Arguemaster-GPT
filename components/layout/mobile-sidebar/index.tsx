import History from "@/components/ui/History";
import Logo from "@/components/ui/Logo";
import UserButton from "@/components/ui/UserButton";
import { useHistoryContext } from "@/lib/context/history";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction } from "react";

interface IMobileSidebar {
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}

const MobileSidebar: React.FC<IMobileSidebar> = ({ setShowSidebar }) => {
  const historyCtx = useHistoryContext();

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-screen max-h-screen overflow-hidden bg-slate-800 flex flex-col">
      <div className="h-[5vh] flex items-center justify-between px-4 border-b border-slate-800">
        <Logo bgDark />
        {/* <div className=" text-white font-medium">History</div> */}

        <XMarkIcon
          onClick={() => setShowSidebar(false)}
          className="w-6 text-white active:scale-95 duration-150"
        />
      </div>

      <div className="h-[85vh] overflow-y-scroll flex flex-col space-y-2 py-5 px-4">
        {historyCtx?.history.map((history) => (
          <History key={history.id} history={history} />
        ))}
      </div>

      <div className="flex-1 flex flex-col justify-center py-5 px-4">
        <UserButton />
      </div>
    </div>
  );
};

export default MobileSidebar;
