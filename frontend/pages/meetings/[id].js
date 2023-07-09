import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getChat } from "@/pages/api/chats";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getUser } from "@/pages/api/user";
import { updateChat } from "@/pages/api/chats";
import Navbar from "@/components/Navbar";
import Form from "@/components/Form";

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
    updateChat(data.id, trimEmptyFields(data)).then(() => {
      console.log("updated form");
      router.push(`/`);
    });
  };

  if (isLoading || !currentUser || !form) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <Navbar isCreate={true} userId={user.id} />
      <h2 className="create-chat-title">Update Coffee Chat</h2>
      <div className="form-container">
        <Form
          onSubmit={onSubmit}
          user={currentUser}
          errors={errors}
          setErrors={setErrors}
          existingMeeting={form}
        />
      </div>
    </div>
  );
};

export default Meetings;
