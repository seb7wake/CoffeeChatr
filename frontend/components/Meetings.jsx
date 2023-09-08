import React, { useEffect, useState } from "react";
import Item from "./Item";
import Search from "./form/Search";
import { Image, Button } from "react-bootstrap";
import ChatLogo from "../public/chat.png";

const Meetings = ({ chats, remove }) => {
  const [searchTerm, setSearchTerm] = useState();

  const filteredMeetings = (meetings) => {
    if (searchTerm) {
      meetings = meetings.filter((chat) => {
        return (
          chat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          chat.invitee_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }
    if (meetings.length === 0) {
      return (
        <div>
          <div className="d-flex justify-content-center">
            <Image
              src={ChatLogo.src}
              className="coffee-chat-img"
              alt="coffee chat"
            />
          </div>
          <div className="d-flex justify-content-center ">
            <Button
              className="align-items-center rounded-pill pill-btn font-semibold"
              size="lg"
              href="/create"
            >
              Create your first coffee chat
            </Button>
          </div>
        </div>
      );
    }
    return meetings.map((chat) => {
      return <Item key={chat.id} chat={chat} remove={remove} />;
    });
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <div className="mt-5 container pt-3">
      <Search handleSearch={handleSearch} />
      {filteredMeetings(chats)}
    </div>
  );
};

export default Meetings;
