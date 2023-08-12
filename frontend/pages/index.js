import React, { useState, useEffect, useContext } from "react";
import { Vortex } from "react-loader-spinner";
import { Toast, ToastContainer } from "react-bootstrap";
import Head from "next/head";
import { Inter } from "next/font/google";
import { useUser } from "@auth0/nextjs-auth0/client";
import Router, { withRouter } from "next/router";
import NavigationBar from "@/components/NavigationBar";
import { getChats } from "./api/chats";
import { createUser, getUser } from "./api/user";
import FilterMeetings from "../components/FilterMeetings";
import Spinner from "../components/Spinner";
import { useAppContext } from "@/context/state";

const Home = (props) => {
  const [chats, setChats] = useState([]);
  const [show, setShow] = useState(props.router.query.show ?? false);
  const [message, setMessage] = useState(props.router.query.message ?? "");
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
    console.log(props.router.query);
  }, [props.router.query]);

  if (!currentUser) return <Spinner />;

  return (
    <>
      <ToastContainer
        className="p-3 w-100"
        style={{ zIndex: 1, color: "white" }}
      >
        <Toast
          onClose={() => setShow(false)}
          show={show}
          bg="success"
          delay={3000}
          className="w-100"
          autohide
        >
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>
      <Head>
        <title>CoffeeChatr</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <>
          <NavigationBar isCreate={false} user={currentUser} />
          <FilterMeetings chats={chats} setShowToast={setShow} />
        </>
      </main>
    </>
  );
};

export default withRouter(Home);
