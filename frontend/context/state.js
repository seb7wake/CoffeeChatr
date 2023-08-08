import { useState } from "react";
import { createContext, useContext } from "react";

export const CurrentUserContext = createContext();

export function AppWrapper({ children }) {
  const [currentUser, setCurrentUser] = useState();

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useAppContext() {
  return useContext(CurrentUserContext);
}
