import React, { useState, useEffect, useContext } from "react";
import { Vortex } from "react-loader-spinner";
import Head from "next/head";
import { Inter } from "next/font/google";
import { useUser } from "@auth0/nextjs-auth0/client";
import Router from "next/router";
import NavigationBar from "@/components/NavigationBar";
import { getChats } from "./api/chats";
import { createUser, getUser } from "./api/user";
import FilterMeetings from "../components/FilterMeetings";
import Spinner from "../components/Spinner";
import { useAppContext } from "@/context/state";

export default function Home() {
  const { user, error, isLoading } = useUser();
  const [chats, setChats] = useState([]);
  const { currentUser, setCurrentUser } = useAppContext();

  useEffect(() => {
    if (currentUser !== undefined) {
      getChats(currentUser.id).then((result) => {
        console.log(result);
        setChats(
          result.sort(
            (a, b) =>
              Date.parse(b.meeting_start_time) -
              Date.parse(a.meeting_start_time)
          )
        );
      });
    }
  }, [currentUser]);

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
      Router.push("/authenticate");
    }
  }, [user, isLoading]);

  if (isLoading || !user || !currentUser) return <Spinner />;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <Head>
        <title>CoffeeChatr</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <>
          <NavigationBar isCreate={false} user={currentUser} />
          <FilterMeetings chats={chats} />
        </>
      </main>
    </>
  );
}
