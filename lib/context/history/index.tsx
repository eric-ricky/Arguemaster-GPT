import { db } from "@/lib/firebaseConfig";
import { IHistory } from "@/types";
import { collection, getDocs, query, where } from "firebase/firestore";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthContext } from "../auth";

interface IHistoryContext {
  history: IHistory[];
  setHistory: Dispatch<SetStateAction<IHistory[]>>;
}
const HistoryContext = createContext<IHistoryContext | null>(null);

interface IHistoryContextProvider {
  children: ReactNode;
}
const HistoryContextProvider: React.FC<IHistoryContextProvider> = ({
  children,
}) => {
  const authCtx = useAuthContext();
  const [history, setHistory] = useState<IHistory[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!authCtx?.state.user?.uid) return;

      console.log("fetching history data....");
      try {
        const histRef = collection(db, "history");
        const q = query(histRef, where("author", "==", authCtx.state.user.uid));

        const snapshots = await getDocs(q);

        console.log("snapshots===>", snapshots.size);

        if (snapshots.empty) return;

        const histData: IHistory[] = snapshots.docs.map((doc) => ({
          id: doc.id,
          argument: doc.data().argument || "",
          issue: doc.data().issue || "",
          position: doc.data().position || "",
        }));

        setHistory(histData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchHistory();
  }, [authCtx?.state.user?.uid]);

  return (
    <HistoryContext.Provider value={{ history, setHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export default HistoryContextProvider;

export const useHistoryContext = () => useContext(HistoryContext);
