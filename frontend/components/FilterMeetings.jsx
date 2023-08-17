import React, { useEffect, useState } from "react";
import Item from "./Item";
import Search from "./Search";
import { TbCoffeeOff, TbCoffee } from "react-icons/tb";
import { Image, Button } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ChatLogo from "../public/chat.png";
import NextLink from "next/link";

const FilterMeetings = ({ chats, remove }) => {
  const [time, setTime] = useState(new Date());
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
