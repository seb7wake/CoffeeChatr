import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getChat } from "@/pages/api/chats";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getUser } from "@/pages/api/user";
import { updateChat } from "@/pages/api/chats";
import NavigationBar from "@/components/NavigationBar";
import ChatForm from "@/components/form/ChatForm";
import LoadingOverlay from "react-loading-overlay";
import Spinner from "@/components/Spinner";
import { useAppContext } from "@/context/state";
import * as amplitude from "@amplitude/analytics-browser";

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
        setForm((prev) => ({ ...prev, ...result.data }));
      });
    }
  }, [router]);

  const onSubmit = async (event, data) => {
    event.preventDefault();
    if (!data.title) {
      setErrors((prevState) => ({
        ...prevState,
        title: "Please enter a title",
      }));
      return;
    }
    const res = await updateChat(data.id, data);
    amplitude.track("Update Chat", {
      status: res.status,
      ...data,
      user_id: currentUser.id,
      email: currentUser.email,
    });
    if (res.status === 200) {
      router.push({
        pathname: "/home",
        query: {
          show: true,
          status: "success",
          message: "Coffee chat has been updated successfully!",
        },
      });
    } else {
      router.push({
        pathname: "/home",
        query: {
          show: true,
          status: "danger",
          message: "Something went wrong. Please try again.",
        },
      });
    }
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
        <h2 className="chat-title text-2xl font-semibold">
          Update Coffee Chat
        </h2>
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
