import NewButton from "@/components/ui/NewButton";
import { useUIContext } from "@/lib/context/ui";
import { Bars3Icon } from "@heroicons/react/24/outline";
import MobileSidebar from "../mobile-sidebar";

const Topbar = () => {
  const UICtx = useUIContext();

  return (
    <>
      {UICtx?.showSidebar && (
        <MobileSidebar setShowSidebar={UICtx.setShowSidebar} />
      )}

      <div className="md:hidden flex items-center justify-between fixed top-0 left-0 w-full bg-slate-800 py-2 px-5">
        <Bars3Icon
          onClick={() => UICtx?.setShowSidebar((prev) => !prev)}
          className="w-7 text-zinc-200 cursor-pointer hover:text-slate-white active:scale-95 duration-150"
        />

        <NewButton />
      </div>
    </>
  );
};

export default Topbar;
