import TextArea from "@/components/form/TextArea";
import TextInput from "@/components/form/TextInput";
import { Form } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import MultiSelect from "@/components/form/MultiSelect";
import { generateQuestions, createChat } from "@/pages/api/chats";
import { Container, Button, Col, Dropdown } from "react-bootstrap";
import TextEdit from "@/components/TextEdit";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import Experience from "./Experience";
import * as amplitude from "@amplitude/analytics-browser";
import ChatModal from "@/components/ChatModal";
import Education from "./Education";

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
    meeting_link: "",
    invitee_industry: "",
    meeting_start_time: "",
    questions: "",
    meeting_notes: "",
    invitee_about: "",
    experience: [],
    education: [],
    invitee_experience: "",
    invitee_about: "",
    goal: "",
  });
  const [dateValue, setDateValue] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (existingMeeting) {
      setForm(existingMeeting);
      if (existingMeeting.meeting_start_time !== "")
        setDateValue(new Date(existingMeeting.meeting_start_time));
    } else {
      setShow(true);
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
  };

  const handleTextAreaChange = (name, newValue) => {
    if (errors[name] !== undefined && errors[name] !== "") {
      setErrors({ ...errors, [name]: "" });
    }
    setForm((prevState) => ({ ...prevState, [name]: newValue }));
  };

  const getQuestionData = (data) => {
    return {
      invitee_about: data.invitee_about,
      experience: data.experience,
      // education field will be added to the form eventually, but it is low priority and unncecessary for MVP
      education: data.education,
      invitee_industry: data.invitee_industry ?? "",
      goal: data.goal ?? "",
    };
  };

  const isValidForm = () => {
    if (
      form.invitee_about === "" &&
      form.experience.length === 0 &&
      form.education.length === 0 &&
      form.goal === ""
    ) {
      setErrors((prevState) => ({
        ...prevState,
        questions:
          "Please complete at least one of the following fields before generating questions: Meeting goal, Guest description, Experience, or Education.",
      }));
      return false;
    }
    return true;
  };

  const getQuestions = async (event) => {
    event.preventDefault();
    if (!isValidForm()) {
      return;
    }
    const invitee_info = getQuestionData(form);
    setIsLoadingQuestions(true);
    const res = await generateQuestions(invitee_info);
    setIsLoadingQuestions(false);
    amplitude.track("Generate Questions", {
      status: res.status,
      ...invitee_info,
      response: res.data,
      user_id: user.id,
      email: user.email,
    });
    handleResult(res);
  };

  const handleResult = (res) => {
    if (res.status !== 200) {
      setErrors((prevState) => ({
        ...prevState,
        questions: "Error generating questions. Please try again.",
      }));
    } else {
      setForm((prevState) => ({
        ...prevState,
        questions: res.data,
      }));
    }
  };

  const formatDate = (date) => {
    date = new Date(date);
    date.setTime(date.getTime() - date.getTimezoneOffset() * 60000);
    return date.toISOString();
  };

  const popover = (
    <Popover className="popover">
      <Popover.Header as="h3">Generating Questions using AI</Popover.Header>
      <Popover.Body>
        The list of questions generated will be based on:
        <ul>
          <li>Goal of the Meeting</li>
          <li>Guest Description</li>
          <li>Guest Experience</li>
          <li>Guest Education</li>
        </ul>
        Please provide as much information as possible for best results.
      </Popover.Body>
    </Popover>
  );

  if (!user) return <div></div>;

  return (
    <Form onSubmit={(e) => onSubmit(e, form)} className="mb-5">
      <ChatModal show={show} onHide={() => setShow(false)} />
      <TextInput
        name="title"
        title={"Title*"}
        className="form-input"
        value={form.title}
        required
        handleChange={handleTextInputChange}
        errors={errors}
      />
      <TextInput
        name="invitee_industry"
        title={"Industry of Guest"}
        className="form-input"
        value={form.invitee_industry}
        handleChange={handleTextInputChange}
        errors={errors}
      />
      {/* <Form.Group className="mb-5">
        <label style={{ width: "13rem" }}>Meeting Time*</label>
        <DateTimePicker
          name="meeting_start_time"
          value={dateValue}
          className="date-picker"
          required
          format="MM/dd/yyyy h:mm a"
          disableClock
          minDate={new Date()}
          onChange={(date) => {
            setDateValue(date);
            const dateStr = formatDate(date);
            handleTextInputChange({
              target: { name: "meeting_start_time", value: dateStr },
            });
          }}
        />
        {errors.meeting_start_time && (
          <div className="error">{errors.meeting_start_time}</div>
        )}
      </Form.Group> */}

      <MultiSelect setForm={setForm} form={form} />

      <TextArea
        name="invitee_about"
        title="Description of Guest (Optional)"
        value={form.invitee_about}
        handleChange={handleTextInputChange}
        placeholder="Please describe the guest and your relation to them in a few sentences."
        errors={errors}
      />

      <Experience experience={form.experience} setForm={setForm} />

      <Education education={form.education} setForm={setForm} />

      <OverlayTrigger
        trigger={["hover", "focus"]}
        placement="right"
        overlay={popover}
      >
        <Button
          className="wrapper mb-4 mt-3 rounded-pill text-lg font-semibold"
          onClick={getQuestions}
        >
          Generate Meeting Questions
        </Button>
      </OverlayTrigger>
      <TextEdit
        name="questions"
        title="Meeting Questions"
        value={form.questions}
        className="mb-5"
        errors={errors}
        placeholder="Generate questions to ask your guest by clicking the button above."
        handleChange={handleTextAreaChange}
      />
      <TextEdit
        name="meeting_notes"
        title="Meeting Notes"
        className="mb-5"
        value={form.meeting_notes}
        placeholder="Enter notes from the meeting."
        handleChange={handleTextAreaChange}
      />
      <Button type="submit" className="submit-btn" size="lg">
        {existingMeeting ? "Update" : "Create"} Coffee Chat
      </Button>
    </Form>
  );
};

export default ChatForm;
