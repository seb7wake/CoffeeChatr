import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import { useUser } from "@auth0/nextjs-auth0/client";
import Navbar from "@/components/Navbar";
import SignOn from "../components/SignOn";
import { getChats } from "./api/chats";
import { createUser, getUser } from "./api/user";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { user, error, isLoading } = useUser();
  const [chats, setChats] = useState([]);
  const [startTime, setStartTime] = useState(undefined);
  const [endTime, setEndTime] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    if (user?.id !== undefined) {
      getChats(user.id).then((result) => {
        setChats(result);
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (user) {
      getUser(user.email)
        .catch((error) => {
          createUser(user.email).then(async (result) => {
            await user.update({
              id: result.data.id,
            });
          });
        })
        .then(async (result) => {
          await user.update({
            id: result.data.id,
          });
        });
    }
  }, [user]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <Head>
        <title>CoffeeChatr</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        {user ? (
          <>
            <Navbar isCreate={false} userId={user.id} />
            <div style={{ marginTop: "100px" }}>
              Welcome {user.email} with ID: {user.id}!{" "}
              <a href="/api/auth/logout">Logout</a>
            </div>
          </>
        ) : (
          <SignOn />
        )}
      </main>
    </>
  );
}
