import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import { useUser } from "@auth0/nextjs-auth0/client";
import Navbar from "@/components/Navbar";
import SignOn from "../components/SignOn";
import Container from "react-bootstrap/Container";
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
    if (currentUser !== undefined) {
      getChats(currentUser.id).then((result) => {
        console.log(result);
        setChats(result);
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
    }
  }, [user]);

  const showChats = () => {
    if (chats.length === 0) return <div>No chats yet!</div>;
    return chats.map((chat) => {
      return <div key={chat.id}>{chat.title}</div>;
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <Head>
        <title>CoffeeChatr</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        {user && currentUser ? (
          <>
            <Navbar isCreate={false} userId={user.id} />
            <div style={{ marginTop: "100px" }}>
              Welcome {user.email} with ID: {user.id}!{" "}
              <a href="/api/auth/logout">Logout</a>
            </div>
            <Container>
              <h2>Coffee Chats</h2>
              <div>{showChats()}</div>
            </Container>
          </>
        ) : (
          <SignOn />
        )}
      </main>
    </>
  );
}
