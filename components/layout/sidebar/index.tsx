import History from "@/components/ui/History";
import Logo from "@/components/ui/Logo";
import NewButton from "@/components/ui/NewButton";
import UserButton from "@/components/ui/UserButton";
import { useHistoryContext } from "@/lib/context/history";

const Sidebar = () => {
  const historyCtx = useHistoryContext();

  return (
    <div className="col-span-12 xl:col-span-2 lg:col-span-4 h-screen max-h-screen overflow-hidden hidden lg:flex flex-col space-y-1 border-r border-slate-800">
      <div className="h-[5vh] flex items-center justify-between py-4 px-2">
        <Logo bgDark />

        <NewButton />
      </div>

      <div className="h-[85vh] overflow-y-scroll scrollbar-thin scrollbar-track-inherit scrollbar-thumb-slate-800 flex flex-col space-y-2 py-5 px-4">
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

export default Sidebar;
