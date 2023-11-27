import React, { useContext, createContext } from "react";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const address = "";
  return (
    <StateContext.Provider
      value={{
        address,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
