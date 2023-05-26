import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface IUIContext {
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}
const UIContext = createContext<IUIContext | null>(null);

interface IUIContextProvider {
  children: ReactNode;
}
const UIContextProvider: React.FC<IUIContextProvider> = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <UIContext.Provider value={{ setShowSidebar, showSidebar }}>
      {children}
    </UIContext.Provider>
  );
};

export default UIContextProvider;

export const useUIContext = () => useContext(UIContext);
