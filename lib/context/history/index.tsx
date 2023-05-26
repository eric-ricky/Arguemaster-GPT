import { db } from "@/lib/firebaseConfig";
import { IHistory } from "@/types";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
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
  handleDelete: (_id: string) => Promise<void>;
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
      console.log("fetching history data....");
      if (!authCtx?.state.user?.uid) return;

      try {
        const histRef = collection(db, "history");
        const q = query(histRef, where("author", "==", authCtx.state.user.uid));

        const snapshots = await getDocs(q);

        console.log("snapshots===>", snapshots);

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

  useEffect(() => {
    console.log("History ===>", history);
  }, [history]);

  const handleDelete = async (id: string) => {
    try {
      const histRef = doc(db, "history", id);
      await deleteDoc(histRef);

      setHistory((prev) => prev.filter((h) => h.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HistoryContext.Provider value={{ handleDelete, history, setHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export default HistoryContextProvider;

export const useHistoryContext = () => useContext(HistoryContext);
