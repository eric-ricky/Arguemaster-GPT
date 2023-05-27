import { useAuthContext } from "@/lib/context/auth";
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

const UserButton = () => {
  const authCtx = useAuthContext();

  return (
    <>
      {authCtx?.state.user ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative w-10 h-10 bg-slate-500 rounded-full overflow-hidden">
              <Image
                src={authCtx.state.user.photoURL || "/images/ai.jpg"}
                alt="."
                fill
                className="object-cover"
              />
            </div>

            <div className="">
              <p className="font-semibold text-slate-50">
                {authCtx.state.user.displayName}
              </p>
              <span className="text-slate-100">{authCtx.state.user.email}</span>
            </div>
          </div>

          <div
            onClick={authCtx.handleLogout}
            className="p-2 rounded-md bg-slate-700 cursor-pointer hover:bg-slate-600 active:scale-90 duration-150"
          >
            <ArrowRightOnRectangleIcon className="w-6 text-slate-200" />
          </div>
        </div>
      ) : (
        <Link
          href="/signin"
          className="flex space-x-3 items-center justify-center rounded-md bg-slate-800 p-2 cursor-pointer hover:bg-slate-700 active:scale-90 duration-150"
        >
          <ArrowLeftOnRectangleIcon className="w-6 text-slate-200" />
          <span className="text-white">Sign in</span>
        </Link>
      )}
    </>
  );
};

export default UserButton;
