import React from "react";
import NextLink from "next/link";

const Item = ({ chat }) => {
  return (
    <NextLink href={`/meetings/${chat.id}`} className="item-link">
      <div className="chat-item">
        <label>{chat.title}</label>
        <p>{chat.meeting_start_time}</p>
      </div>
    </NextLink>
  );
};

export default Item;
