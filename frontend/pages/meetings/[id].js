import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getChat } from "@/pages/api/chats";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getUser } from "@/pages/api/user";
import { updateChat } from "@/pages/api/chats";
import NavigationBar from "@/components/NavigationBar";
import ChatForm from "@/components/ChatForm";
import LoadingOverlay from "react-loading-overlay";
import Spinner from "@/components/Spinner";
import { useAppContext } from "@/context/state";

const Meetings = () => {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const [form, setForm] = useState({
    title: "",
    invitee_name: "",
    invitee_linkedin_url: "",
    invitee_industry: "",
    meeting_start_time: "",
    questions: "",
    meeting_notes: "",
    invitee_background: "",
    goal: "",
  });
  const { currentUser, _ } = useAppContext();
  const [errors, setErrors] = useState({
    title: "",
    questions: "",
    meeting_start_time: "",
  });
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

  useEffect(() => {
    if (router.query.id) {
      getChat(router.query.id).then((result) => {
        console.log(result);
        setForm((prev) => ({ ...prev, ...result }));
      });
    }
  }, [router]);

  const trimEmptyFields = (obj) => {
    let newObj = {};
    Object.keys(obj).forEach((key) => {
      if (obj[key] !== "") {
        newObj[key] = obj[key];
      }
    });
    return newObj;
  };

  const onSubmit = (event, data) => {
    event.preventDefault();
    if (!data.title) {
      setErrors((prevState) => ({
        ...prevState,
        title: "Please enter a title",
      }));
      return;
    }
    console.log("submitting form:", form);
    updateChat(data.id, trimEmptyFields(data))
      .then(() => {
        router.push({
          pathname: "/",
          query: {
            show: true,
            status: "success",
            message: "Coffee chat has been updated successfully!",
          },
        });
      })
      .catch((err) => {
        console.log(err);
        router.push({
          pathname: "/",
          query: {
            show: true,
            status: "danger",
            message: "Something went wrong. Please try again.",
          },
        });
      });
  };

  if (!currentUser) return <Spinner />;

  return (
    <LoadingOverlay
      active={isLoadingQuestions}
      spinner
      text="Generating questions... This could take a minute."
    >
      <div>
        <NavigationBar isCreate={false} user={user} />
        <h2 className="chat-title">Update Coffee Chat</h2>
        <div className="form-container">
          <ChatForm
            onSubmit={onSubmit}
            user={currentUser}
            errors={errors}
            setErrors={setErrors}
            existingMeeting={form}
            setIsLoadingQuestions={setIsLoadingQuestions}
          />
        </div>
      </div>
    </LoadingOverlay>
  );
};

export default Meetings;
