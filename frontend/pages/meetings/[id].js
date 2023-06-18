import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getChat } from "@/pages/api/chats";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getUser } from "@/pages/api/user";
import { generateQuestions, updateChat } from "@/pages/api/chats";
import Router from "next/router";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import Navbar from "@/components/Navbar";
import TextArea from "@/components/TextArea";
import TextInput from "@/components/TextInput";

const Meetings = () => {
  const router = useRouter();
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
    console.log("yes", router.query.id);
    if (router.query.id) {
      getChat(router.query.id).then((result) => {
        console.log(result);
        setForm((prev) => ({ ...prev, ...result }));
      });
    }
  }, [router]);

  useEffect(() => {
    if (user) {
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
      router.replace("/");
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
    updateChat(form.id, trimEmptyFields(form)).then((data) => {
      console.log(data);
    });
  };

  if (isLoading || !currentUser) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <Navbar isCreate={false} userId={currentUser.id} />
      <h2 className="create-chat-title">Update Coffee Chat</h2>
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
          <button onClick={handleSubmit}>Update Coffee Chat</button>
        </form>
      </div>
    </div>
  );
};

export default Meetings;
