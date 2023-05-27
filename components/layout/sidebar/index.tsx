import History from "@/components/ui/History";
import Logo from "@/components/ui/Logo";
import NewButton from "@/components/ui/NewButton";
import UserButton from "@/components/ui/UserButton";
import { useHistoryContext } from "@/lib/context/history";

const Sidebar = () => {
  const historyCtx = useHistoryContext();

  return (
    <div className="col-span-12 xl:col-span-2 lg:col-span-4 h-screen max-h-screen overflow-hidden hidden lg:flex flex-col space-y-1 border-r border-slate-800">
      <div className="flex items-center justify-between py-4 px-2">
        <Logo bgDark />

        <NewButton />
      </div>

      <div className="pt-5 px-4 text-white font-medium">History</div>

      <div className="flex-1 h-[75%] flex flex-col space-y-2 w-full px-3 py-5 overflow-y-scroll scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-800">
        {historyCtx?.history.map((h) => (
          <History key={h.id} history={h} />
        ))}
      </div>

      <UserButton />
    </div>
  );
};

export default Sidebar;
