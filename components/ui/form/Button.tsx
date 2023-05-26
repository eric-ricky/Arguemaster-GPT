import React, { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const FormButton: React.FC<IProps> = ({ children }) => {
  return (
    <button
      type="submit"
      className="py-2 px-4 rounded-md bg-rose-500 text-center font-bold text-white active:scale-95 duration-150"
    >
      {children}
    </button>
  );
};

export default FormButton;
