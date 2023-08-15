import { useState, useEffect } from "react";
import { createContext, useContext } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getUser, createUser } from "@/pages/api/user";
import Router from "next/router";

export const CurrentUserContext = createContext();

export function AppWrapper({ children }) {
  const { user, error, isLoading } = useUser();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    if (user && currentUser === undefined) {
      const res = getUser(user.email)
        .catch(async () => {
          createUser(user.email).then(async (result) => {
            setCurrentUser(result.data);
          });
        })
        .then(async (result) => {
          if (result?.data) {
            setCurrentUser(result.data);
          }
        });
    } else if (!isLoading && !user) {
      Router.push("/landing");
    }
  }, [user, isLoading]);

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
