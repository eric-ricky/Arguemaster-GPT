import History from "@/components/ui/History";
import Logo from "@/components/ui/Logo";
import NewButton from "@/components/ui/NewButton";
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
    <div className="bg-slate-900 fixed top-0 left-0 z-50 w-full h-screen max-h-screen overflow-hidden flex flex-col">
      <div className="flex items-center justify-end p-2">
        <XMarkIcon
          onClick={() => setShowSidebar(false)}
          className="w-6 text-white active:scale-95 duration-150"
        />
      </div>

      <div className="flex items-center justify-between px-2">
        <Logo bgDark />

        <NewButton />
      </div>

      <div className="pt-5 px-4 text-white font-medium">History</div>

      <div className="flex-1 flex flex-col space-y-2 w-full px-3 py-5 overflow-y-scroll scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-800">
        {historyCtx?.history.map((history) => (
          <History key={history.id} history={history} />
        ))}
      </div>

      <UserButton />
    </div>
  );
};

export default MobileSidebar;
