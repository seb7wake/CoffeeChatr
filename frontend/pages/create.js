import NavigationBar from "@/components/NavigationBar";
import React, { useState, useEffect } from "react";
import { generateQuestions, createChat } from "@/pages/api/chats";
import { getUser } from "@/pages/api/user";
import Router from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import ChatForm from "@/components/ChatForm";
import LoadingOverlay from "react-loading-overlay";
import Spinner from "@/components/Spinner";

const Create = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [errors, setErrors] = useState({
    title: "",
    questions: "",
    meeting_start_time: "",
  });
  const { user, error, isLoading } = useUser();
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

  useEffect(() => {
    if (user) {
      console.log("user:", user);
      getUser(user.email).then((result) => {
        if (result?.data) {
          console.log("result:", result.data);
          if (result.data.id) {
            setCurrentUser(result.data);
          }
        }
      });
    }
  }, [user]);

  useEffect(() => {
    if (!isLoading && !user) {
      Router.replace("/");
    }
  }, [isLoading]);

  const handleSubmit = (event, form) => {
    event.preventDefault();
    if (!form.title) {
      setErrors((prevState) => ({
        ...prevState,
        title: "Please enter a title",
      }));
      return;
    }
    if (!form.meeting_start_time) {
      setErrors((prevState) => ({
        ...prevState,
        meeting_start_time: "Please enter a meeting start time",
      }));
      return;
    }
    console.log(form);
    createChat(currentUser.id, trimEmptyFields(form)).then((data) => {
      console.log(data);
      Router.replace("/");
    });
  };

  const trimEmptyFields = (obj) => {
    let newObj = {};
    Object.keys(obj).forEach((key) => {
      if (obj[key] !== "") {
        newObj[key] = obj[key];
      }
    });
    return newObj;
  };

  if (isLoading || !currentUser) return <Spinner />;
  if (error) return <div>{error.message}</div>;

  return (
    <LoadingOverlay
      active={isLoadingQuestions}
      spinner
      text="Generating questions... This could take a minute."
    >
      <div>
        <NavigationBar isCreate={true} user={user} />
        <h2 className="chat-title">Create Coffee Chat</h2>
        <div className="form-container">
          <ChatForm
            onSubmit={handleSubmit}
            user={currentUser}
            errors={errors}
            setErrors={setErrors}
            setIsLoadingQuestions={setIsLoadingQuestions}
          />
        </div>
      </div>
    </LoadingOverlay>
  );
};

export default Create;
