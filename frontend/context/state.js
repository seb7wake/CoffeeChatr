import { useState, useEffect } from "react";
import { createContext, useContext } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getUser, createUser } from "@/pages/api/user";
import * as amplitude from "@amplitude/analytics-browser";
import Router from "next/router";

export const CurrentUserContext = createContext();

export function AppWrapper({ children }) {
  const { user, error, isLoading } = useUser();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    amplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY, {
      defaultTracking: true,
    });
    const getOrCreateUser = async () => {
      const result = await getUser(user.email);
      const identifyEvent = new amplitude.Identify();
      identifyEvent.set("url", process.env.AUTH0_BASE_URL);
      if (result.status === 200) {
        await existingUser(result.data, identifyEvent);
      } else {
        await newUser(identifyEvent);
      }
    };
    if (!isLoading && user && currentUser === undefined) {
      getOrCreateUser();
    } else if (!isLoading && !user) {
      Router.push("/");
    }
  }, [user, isLoading]);

  const existingUser = async (data, identifyEvent) => {
    setCurrentUser(data);
    identifyEvent.set("email", data.email);
    amplitude.identify(identifyEvent);
  };

  const newUser = async (identifyEvent) => {
    const result = await createUser(user.email);
    if (result.status === 201) {
      setCurrentUser(result.data);
      amplitude.track("Sign Up", { email: result.data.email });
      identifyEvent.set("email", result.data.email);
      amplitude.identify(identifyEvent);
    }
  };

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
