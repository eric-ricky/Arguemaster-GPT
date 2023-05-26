import { useUIContext } from "@/lib/context/ui";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const NewButton = () => {
  const UICtx = useUIContext();

  return (
    <Link
      href="/new"
      onClick={() => UICtx?.setShowSidebar(false)}
      className="py-1 px-3 rounded-md bg-slate-700 border border-slate-500 text-slate-100 cursor-pointer hover:opacity-80 active:scale-95 duration-150"
    >
      <PlusIcon className="w-5" />
    </Link>
  );
};

export default NewButton;
