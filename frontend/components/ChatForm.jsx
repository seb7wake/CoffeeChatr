import TextArea from "@/components/TextArea";
import TextInput from "@/components/TextInput";
import { Form } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import { generateQuestions, createChat } from "@/pages/api/chats";
import { Container, Button } from "react-bootstrap";
import TextEdit from "@/components/TextEdit";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";

const ChatForm = ({
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

  const popover = (
    <Popover>
      <Popover.Header as="h3">Generating Questions using AI</Popover.Header>
      <Popover.Body>
        Complete at least one of the following fields before generating
        questions for your meeting:
        <ul>
          <li>Guest Description</li>
          <li>Experience</li>
          <li>Education</li>
        </ul>
      </Popover.Body>
    </Popover>
  );

  if (!user) return <div></div>;

  return (
    <Form onSubmit={(e) => onSubmit(e, form)}>
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
      <Form.Group className="mb-5">
        <label style={{ width: "13rem" }}>Meeting Start Time</label>
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
      </Form.Group>
      <TextArea
        name="invitee_about"
        title="Description of Guest"
        value={form.invitee_about}
        handleChange={handleTextInputChange}
        placeholder="Please describe the guest in a few sentences."
        errors={errors}
        text=""
      />
      <TextArea
        name="invitee_experience"
        title="Previous Work Experience of Guest"
        value={form.invitee_experience}
        handleChange={handleTextInputChange}
        placeholder="Please list the guest's previous experience."
        errors={errors}
        text="Tip: Copy information from their Linkedin profile for best results!"
      />
      <TextArea
        name="invitee_education"
        title="Previous Education of Guest"
        value={form.invitee_education}
        handleChange={handleTextInputChange}
        placeholder="Please list the guest's previous education."
        errors={errors}
      />
      <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
        <Button
          className="generate-questions-button mb-2"
          onClick={getQuestions}
        >
          Generate Meeting Questions
        </Button>
      </OverlayTrigger>
      <TextEdit
        name="questions"
        title="Meeting Questions"
        value={form.questions}
        errors={errors}
        placeholder="Generate questions to ask the guest by clicking the button above. The list of questions will be based on the guest's description, experience, and education"
        handleChange={handleTextAreaChange}
      />
      <TextEdit
        name="meeting_notes"
        title="Meeting Notes"
        value={form.meeting_notes}
        placeholder="Enter notes from the meeting"
        handleChange={handleTextAreaChange}
      />
      <Button type="submit">
        {existingMeeting ? "Update" : "Create"} Coffee Chat
      </Button>
    </Form>
  );
};

export default ChatForm;
