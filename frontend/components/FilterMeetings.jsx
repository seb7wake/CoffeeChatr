import React, { useEffect, useState } from "react";
import { Container, Button, Image } from "react-bootstrap";
import Item from "./Item";
import { TbCoffeeOff, TbCoffee } from "react-icons/tb";
import { GiCoffeeBeans } from "react-icons/gi";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import logo from "./coffee-chat.png";

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
    if (chats.length === 0) {
      return (
        <div className="empty-container w-100">
          <img src={require(`./coffee-chat.png`)} alt="coffee chat" />
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
