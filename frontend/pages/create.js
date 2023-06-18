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

const Create = () => {
  const [form, setForm] = useState({
    title: "",
    invitee_name: "",
    invitee_linkedin_url: "",
    invitee_industry: "",
    meeting_start_time: "",
    questions: "",
    meeting_notes: "",
    invitee_background: "",
  });
  const [currentUser, setCurrentUser] = useState(undefined);
  const { user, error, isLoading } = useUser();
  const [errors, setErrors] = useState({
    title: "",
    background: "",
  });

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

  const handleTextInputChange = (event) => {
    const { name, value } = event.target;
    if (errors[name]) {
      setErrors((prevState) => ({
        ...prevState,
        [name]: "",
      }));
    }
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log("form:", form);
  };

  const handleTextAreaChange = (name, newValue) => {
    console.log(name, newValue);
    setForm((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
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

  const getQuestions = async (event) => {
    event.preventDefault();
    if (!form.invitee_background) {
      setErrors((prevState) => ({
        ...prevState,
        background:
          "Please enter background information on the invitee before generating questions.",
      }));
      return;
    }
    generateQuestions(form.invitee_background).then((data) => {
      setForm((prevState) => ({
        ...prevState,
        questions: data,
      }));
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.title) {
      setErrors((prevState) => ({
        ...prevState,
        title: "Please enter a title",
      }));
      return;
    }
    console.log(form);
    createChat(currentUser.id, trimEmptyFields(form))
      .then((data) => {
        console.log(data);
      })
      .then(() => {
        Router.replace("/");
      });
  };

  if (isLoading || !currentUser) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <Navbar isCreate={true} userId={currentUser.id} />
      <h2 className="create-chat-title">Create Coffee Chat</h2>
      <div className="form-container">
        <form>
          <TextInput
            name="title"
            title={"Title"}
            className="form-input"
            value={form.title}
            handleChange={handleTextInputChange}
            errors={errors}
          />
          <TextInput
            name="invitee_name"
            title={"Invitee Name"}
            className="form-input"
            value={form.invitee_name}
            handleChange={handleTextInputChange}
            errors={errors}
          />
          {/* <TextInput
            name="invitee_linkedin_url"
            title={"Invitee Linkedin URL"}
            className="form-input"
            value={form.invitee_linkedin_url}
            handleChange={handleTextInputChange}
            errors={errors}
          /> */}
          <TextInput
            name="invitee_industry"
            title={"Invitee Industry"}
            className="form-input"
            value={form.invitee_industry}
            handleChange={handleTextInputChange}
            errors={errors}
          />
          <div>
            <label>Meeting Start Time</label>
            <DateTimePicker
              name="meeting_start_time"
              value={form.meeting_start_time}
              onChange={(value) =>
                handleTextInputChange({
                  target: { name: "meeting_start_time", value },
                })
              }
            />
          </div>
          <TextArea
            name="invitee_background"
            title="Invitee Experience Background"
            value={form.invitee_background}
            handleChange={handleTextAreaChange}
            errors={errors}
          />
          <p>
            Tip: Copy their Linkedin profile About, Experience, and Education
            sections for best results!
          </p>
          <button className="generate-questions-button" onClick={getQuestions}>
            Generate Meeting Questions
          </button>
          <TextArea
            name="questions"
            title="Meeting Questions"
            value={form.questions}
            handleChange={handleTextAreaChange}
          />
          <TextArea
            name="meeting_notes"
            title="Meeting Notes"
            value={form.meeting_notes}
            handleChange={handleTextAreaChange}
          />
          <button onClick={handleSubmit}>Create Coffee Chat</button>
        </form>
      </div>
    </div>
  );
};

export default Create;
