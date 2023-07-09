import Navbar from "@/components/Navbar";
import TextArea from "@/components/TextArea";
import TextInput from "@/components/TextInput";
import React, { useState, useEffect } from "react";
import { generateQuestions, createChat } from "@/pages/api/chats";
import LoadingOverlay from "react-loading-overlay";
import { getUser } from "@/pages/api/user";
import Router from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";

const Form = ({
  user,
  onSubmit,
  errors,
  setErrors,
  existingMeeting,
  setIsLoadingQuestions,
}) => {
  const [form, setForm] = useState({
    title: "",
    invitee_name: "",
    invitee_linkedin_url: "",
    invitee_industry: "",
    meeting_start_time: "",
    questions: "",
    meeting_notes: "",
    invitee_about: "",
    invitee_education: "",
    invitee_experience: "",
    invitee_about: "",
  });

  useEffect(() => {
    if (existingMeeting) {
      setForm(existingMeeting);
    }
  }, [existingMeeting]);

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
    console.log("form after input change:", form);
  };

  const handleTextAreaChange = (name, newValue) => {
    if (errors[name] !== undefined && errors[name] !== "") {
      setErrors({ ...errors, [name]: "" });
    }
    setForm((prevState) => ({ ...prevState, [name]: newValue }));
  };

  const getQuestions = async (event) => {
    event.preventDefault();
    if (
      form.invitee_about === "" &&
      form.invitee_experience === "" &&
      form.invitee_education === ""
    ) {
      setErrors((prevState) => ({
        ...prevState,
        questions:
          "Please complete at least one of the following fields before generating questions: Guest Description, Experience, or Education",
      }));
      return;
    }
    const invitee_info = {
      invitee_about: form.invitee_about,
      invitee_experience: form.invitee_experience,
      invitee_education: form.invitee_education,
      invitee_industry: form.invitee_industry ?? "",
    };
    setIsLoadingQuestions(true);
    generateQuestions(invitee_info).then((data) => {
      setIsLoadingQuestions(false);
      if (data.error) {
        setErrors((prevState) => ({
          ...prevState,
          questions: data.error,
        }));
        return;
      } else {
        setForm((prevState) => ({
          ...prevState,
          questions: data,
        }));
      }
    });
  };

  if (!user) return <div></div>;

  return (
    <form onSubmit={(e) => onSubmit(e, form)}>
      <TextInput
        name="title"
        title={"Title"}
        className="form-input"
        value={form.title}
        required
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
          className="date-picker"
          required
          disableClock
          minDate={new Date()}
          onChange={(value) =>
            handleTextInputChange({
              target: { name: "meeting_start_time", value },
            })
          }
        />
        {errors.meeting_start_time && (
          <div className="error">{errors.meeting_start_time}</div>
        )}
      </div>
      <TextArea
        name="invitee_about"
        title="Description of Guest"
        value={form.invitee_about}
        handleChange={handleTextAreaChange}
        placeholder="Please describe the guest in a few sentences."
        errors={errors}
      />
      <TextArea
        name="invitee_experience"
        title="Previous Work Experience of Guest"
        value={form.invitee_experience}
        handleChange={handleTextAreaChange}
        placeholder="Please list the guest's previous experience."
        errors={errors}
      />
      <TextArea
        name="invitee_education"
        title="Previous Education of Guest"
        value={form.invitee_education}
        handleChange={handleTextAreaChange}
        placeholder="Please list the guest's previous education."
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
        errors={errors}
        handleChange={handleTextAreaChange}
      />
      <TextArea
        name="meeting_notes"
        title="Meeting Notes"
        value={form.meeting_notes}
        handleChange={handleTextAreaChange}
      />
      <button type="submit">
        {existingMeeting ? "Update" : "Create"} Coffee Chat
      </button>
    </form>
  );
};

export default Form;
