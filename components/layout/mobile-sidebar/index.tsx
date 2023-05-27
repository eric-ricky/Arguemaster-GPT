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
    <div className="absolute top-0 left-0 z-50 w-full h-full overflow-hidden bg-slate-800 flex flex-col justify-between">
      <div className="flex flex-col space-y-2 h-screen overflow-hidden">
        <div className="flex items-center justify-between pt-4 pb-2 px-4 border-b border-slate-800">
          <Logo bgDark />

          <XMarkIcon
            onClick={() => setShowSidebar(false)}
            className="w-6 text-white active:scale-95 duration-150"
          />
        </div>

        <div className="flex-1 flex flex-col space-y-2 py-5 px-4 h-1/2 overflow-y-scroll">
          {historyCtx?.history.map((history) => (
            <History key={history.id} history={history} />
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-center py-5 px-4">
        <UserButton />
      </div>
    </div>
  );
};

export default MobileSidebar;
