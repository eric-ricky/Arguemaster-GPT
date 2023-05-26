import { useHistoryContext } from "@/lib/context/history";
import { IHistory } from "@/types";
import { TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface IProps {
  history: IHistory;
}

const History: React.FC<IProps> = ({ history: { id, issue } }) => {
  const historyCtx = useHistoryContext();
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <div className="py-2 px-4 rounded-md bg-slate-700 flex items-center space-x-2 justify-between cursor-pointer relative">
      {isDeleting && (
        <div className="absolute top-0 left-0 h-full w-full rounded-md bg-slate-900 bg-opacity-70"></div>
      )}

      <Link
        href={`/new/${id}`}
        className="flex-1 pr-2 text-slate-200 cursor-pointer hover:underline duration-150 truncate"
      >
        {issue}
      </Link>

      <div className="w-[10%] flex items-center justify-end">
        {isDeleting ? (
          <LoadingSpinner size="w-4 h-4" />
        ) : (
          <TrashIcon
            onClick={() => {
              try {
                setIsDeleting(true);
                historyCtx?.handleDelete(id);
              } catch (error) {
                setIsDeleting(false);
                console.log(error);
              }
            }}
            className="w-5 text-slate-300 cursor-pointer hover:text-white active:scale-95 duration-150"
          />
        )}
      </div>
    </div>
  );
};

export default History;
