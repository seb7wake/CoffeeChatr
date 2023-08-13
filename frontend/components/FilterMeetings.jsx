import React, { useEffect, useState } from "react";
import Item from "./Item";
import Search from "./Search";
import { TbCoffeeOff, TbCoffee } from "react-icons/tb";
import { Image, Button } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ChatLogo from "../public/chat.png";
import NextLink from "next/link";

const FilterMeetings = ({ chats }) => {
  const [filter, setFilter] = useState("");
  const [time, setTime] = useState(new Date());
  const [filteredChats, setFilteredChats] = useState(chats);
  const [searchTerm, setSearchTerm] = useState();

  const filteredMeetings = (meetings) => {
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
            className="align-items-center rounded-pill empty-cta"
            size="lg"
            href="/create"
          >
            Start brewing meaningful conversations
          </Button>
        </div>
      </div>
    );
    if (chats.length === 0) {
      return (
        <div className="empty-container w-100">
          <Image src={ChatLogo.src} alt="coffee chat" />
          <h5 className="mx-3 my-0">Create your first coffee chat</h5>
        </div>
      );
    } else if (meetings.length === 0) {
      return (
        <div className="d-flex justify-content-center align-items-center flex-row empty-container">
          <TbCoffeeOff size={32} />
          <h5 className="mx-3 my-0">No coffee chats!</h5>
        </div>
      );
    }
    if (searchTerm) {
      meetings = meetings.filter((chat) => {
        return (
          chat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          chat.invitee_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }
    return meetings.map((chat) => {
      return <Item key={chat.id} chat={chat} />;
    });
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <div className="mt-4 container">
      <h2 className="mb-5">Coffee Chats</h2>
      <Search handleSearch={handleSearch} />
      <Tabs defaultActiveKey="all" variant="underline" className="mb-3 h4 mt-4">
        <Tab eventKey="all" title="All">
          {filteredMeetings(chats)}
        </Tab>
        <Tab eventKey="upcoming" title="Upcoming">
          {filteredMeetings(
            chats.filter(
              (chat) => Date.parse(chat.meeting_start_time) > Date.parse(time)
            )
          )}
        </Tab>
        <Tab eventKey="past" title="Past">
          {filteredMeetings(
            chats.filter(
              (chat) => Date.parse(chat.meeting_start_time) < Date.parse(time)
            )
          )}
        </Tab>
      </Tabs>
    </div>
  );
};

export default FilterMeetings;
