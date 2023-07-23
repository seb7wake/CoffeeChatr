import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import Item from "./Item";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const FilterMeetings = ({ chats }) => {
  const [filter, setFilter] = useState("");
  const [time, setTime] = useState(new Date());
  const [filteredChats, setFilteredChats] = useState(chats);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 100000);

    return () => clearInterval(interval);
  }, []);

  const filteredMeetings = (meetings) => {
    if (meetings.length === 0) return <div>No chats yet!</div>;
    return meetings.map((chat) => {
      return <Item key={chat.id} chat={chat} />;
    });
  };

  return (
    <div className="mx-5 mt-3">
      <h2>Coffee Chats</h2>
      {/* <div className="filter-container"> */}
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
