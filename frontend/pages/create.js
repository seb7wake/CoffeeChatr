import NavigationBar from "@/components/NavigationBar";
import React, { useState, useEffect } from "react";
import { generateQuestions, createChat } from "@/pages/api/chats";
import { getUser } from "@/pages/api/user";
import Router from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import ChatForm from "@/components/form/ChatForm";
import LoadingOverlay from "react-loading-overlay";
import Spinner from "@/components/Spinner";
import { useAppContext } from "@/context/state";
import * as amplitude from "@amplitude/analytics-browser";

const Create = () => {
  const { currentUser, _ } = useAppContext();
  const [errors, setErrors] = useState({
    title: "",
    questions: "",
    meeting_start_time: "",
  });
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

  const handleSubmit = async (event, form) => {
    event.preventDefault();
    if (!form.title) {
      setErrors((prevState) => ({
        ...prevState,
        title: "Please enter a title",
      }));
      return;
    }
    const res = await createChat(currentUser.id, trimEmptyFields(form));
    amplitude.track("Create Chat", {
      status: res.status,
      ...form,
      user_id: currentUser.id,
      email: currentUser.email,
    });
    handleResult(res);
  };

  const handleResult = (res) => {
    if (res.status === 201) {
      Router.push({
        pathname: "/home",
        query: {
          show: true,
          status: "success",
          message: "Coffee chat has been created successfully!",
        },
      });
    } else {
      Router.push({
        pathname: "/home",
        query: {
          show: true,
          status: "danger",
          message: "Coffee chat could not be created.",
        },
      });
    }
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

  if (!currentUser) return <Spinner />;

  return (
    <LoadingOverlay
      active={isLoadingQuestions}
      spinner
      trigger={["hover", "focus"]}
      text="Generating questions... This could take a minute."
    >
      <div>
        <NavigationBar isCreate={true} user={currentUser} />
        <h2 className="chat-title text-2xl mb-4 font-semibold">
          Create Coffee Chat
        </h2>
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
