import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import Item from "./Item";

const Meetings = ({ chats }) => {
  const [filter, setFilter] = useState("");
  const [time, setTime] = useState(new Date());
  const [filteredChats, setFilteredChats] = useState(chats);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 100000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (filter === "upcoming") {
      setFilteredChats(
        chats.filter(
          (chat) => Date.parse(chat.meeting_start_time) > Date.parse(time)
        )
      );
    } else if (filter === "past") {
      setFilteredChats(
        chats.filter(
          (chat) => Date.parse(chat.meeting_start_time) < Date.parse(time)
        )
      );
    } else {
      setFilteredChats(chats);
    }
  }, [filter, time, chats]);

  const filteredMeetings = () => {
    if (filteredChats.length === 0) return <div>No chats yet!</div>;
    return filteredChats.map((chat) => {
      return <Item key={chat.id} chat={chat} />;
    });
  };

  return (
    <Container>
      <h2>Coffee Chats</h2>
      <div className="filter-container">
        <Button className="filter-btn" onClick={() => setFilter("")}>
          All
        </Button>
        <Button className="filter-btn" onClick={() => setFilter("upcoming")}>
          Upcoming
        </Button>
        <Button className="filter-btn" onClick={() => setFilter("past")}>
          Past
        </Button>
      </div>
      <div>{filteredMeetings()}</div>
    </Container>
  );
};

export default Meetings;
