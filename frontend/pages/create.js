import Navbar from "@/components/Navbar";
import TextArea from "@/components/TextArea";
import TextInput from "@/components/TextInput";
import React, { useState, useEffect } from "react";
import { generateQuestions, createChat } from "@/pages/api/chats";
import { getUser } from "@/pages/api/user";
import Router from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import Form from "@/components/Form";

const Create = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [errors, setErrors] = useState({
    title: "",
    questions: "",
  });
  const { user, error, isLoading } = useUser();

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

  if (isLoading || !currentUser) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <Navbar isCreate={true} userId={user.id} />
      <h2 className="create-chat-title">Create Coffee Chat</h2>
      <div className="form-container">
        <Form
          onSubmit={handleSubmit}
          user={currentUser}
          errors={errors}
          setErrors={setErrors}
        />
      </div>
    </div>
  );
};

export default Create;
