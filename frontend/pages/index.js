import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import { useUser } from "@auth0/nextjs-auth0/client";
import Router from "next/router";
import Navbar from "@/components/Navbar";
import SignOn from "../components/SignOn";
import { getChats } from "./api/chats";
import { createUser, getUser } from "./api/user";
import Meetings from "../components/Meetings";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { user, error, isLoading } = useUser();
  const [chats, setChats] = useState([]);
  const [startTime, setStartTime] = useState(undefined);
  const [endTime, setEndTime] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    if (currentUser !== undefined) {
      getChats(currentUser.id).then((result) => {
        console.log(result);
        setChats(
          result.sort(
            (a, b) => a.meeting_start_time - b.meeting_start_time || a.id - b.id
          )
        );
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (user) {
      getUser(user.email)
        .catch((error) => {
          createUser(user.email).then(async (result) => {
            setCurrentUser(result.data);
          });
        })
        .then(async (result) => {
          setCurrentUser(result.data);
        });
    } else if (!isLoading) {
      Router.push("/login");
    }
  }, [user, isLoading]);

  if (isLoading || !user || !currentUser) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <Head>
        <title>CoffeeChatr</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <>
          <Navbar isCreate={false} userId={currentUser.id} />
          <div style={{ marginTop: "100px" }}>
            Welcome {user.email} with ID: {currentUser.id}!{" "}
          </div>
          <Meetings chats={chats} />
        </>
      </main>
    </>
  );
}
