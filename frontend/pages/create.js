import Navbar from "@/components/Navbar";
import TextArea from "@/components/TextArea";
import TextInput from "@/components/TextInput";
import React, { useState } from "react";
import { generateQuestions, createChat } from "@/pages/api/chats";
import Router from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

const Create = () => {
  const [form, setForm] = useState({
    title: "",
    invitee_name: "",
    invitee_linkedin_url: "",
    invitee_industry: "",
    meeting_start_time: "",
    questions: "",
    meeting_notes: "",
  });
  const { user, error, isLoading } = useUser();
  const [errors, setErrors] = useState({
    title: "",
    invitee_linkedin_url: "",
  });

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

  const getQuestions = async () => {
    event.preventDefault();
    if (!form.invitee_linkedin_url) {
      setErrors((prevState) => ({
        ...prevState,
        invitee_linkedin_url: "Please enter a valid LinkedIn URL",
      }));
      return;
    }
    const split_url = form.invitee_linkedin_url.split("/");
    const profile = split_url[split_url.length - 1];
    generateQuestions(profile).then((data) => {
      console.log(data);
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
    const data = {
      ...form,
      user: id,
    };
    createChat(id, data)
      .then((data) => {
        console.log(data);
      })
      .then(() => {
        Router.replace("/");
      });
  };

  return (
    <div>
      <Navbar isCreate={true} userId={user.id} />
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
          <TextInput
            name="invitee_linkedin_url"
            title={"Invitee Linkedin URL"}
            className="form-input"
            value={form.invitee_linkedin_url}
            handleChange={handleTextInputChange}
            errors={errors}
          />
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
            value={form.meetings_notes}
            handleChange={handleTextAreaChange}
          />
          <button onClick={handleSubmit}>Create Coffee Chat</button>
        </form>
      </div>
    </div>
  );
};

export default Create;
