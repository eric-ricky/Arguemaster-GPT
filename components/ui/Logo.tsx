import { useUIContext } from "@/lib/context/ui";
import Link from "next/link";

interface IProps {
  bgDark?: boolean;
}
const Logo: React.FC<IProps> = ({ bgDark }) => {
  const UICtx = useUIContext();

  return (
    <Link
      href="/"
      onClick={() => UICtx?.setShowSidebar(false)}
      className="flex items-center space-x-2 font-bold text-2xl"
    >
      <span>😎</span>
      <span className={`${bgDark ? "text-slate-100" : "text-slate-800"}`}>
        ArgueMaster GPT
      </span>
    </Link>
  );
};

export default Logo;
