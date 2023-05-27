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
  showDisclaimer: boolean;
  setShowDisclaimer: Dispatch<SetStateAction<boolean>>;
}
const UIContext = createContext<IUIContext | null>(null);

interface IUIContextProvider {
  children: ReactNode;
}
const UIContextProvider: React.FC<IUIContextProvider> = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  return (
    <UIContext.Provider
      value={{ setShowSidebar, showSidebar, setShowDisclaimer, showDisclaimer }}
    >
      {children}
    </UIContext.Provider>
  );
};

export default UIContextProvider;

export const useUIContext = () => useContext(UIContext);
