import React from "react";
import { Card } from "react-bootstrap";
import NextLink from "next/link";
import { FaTrashCan } from "react-icons/fa6";
import { deleteChat } from "../pages/api/chats";

const Item = ({ chat }) => {
  const start_time = new Date(chat.meeting_start_time);

  const remove = async (e) => {
    e.stopPropagation();
    await deleteChat(chat.id);
    window.location.reload();
  };
  return (
    <NextLink href={`/meetings/${chat.id}`} className="item-link">
      <Card border="dark" className="mb-3 item">
        <Card.Body className="d-flex flex-col align-items-center justify-content-between">
          <div>
            <Card.Title>{chat.title}</Card.Title>
            <Card.Text>
              {"Start Time: " +
                start_time.toLocaleString("default", {
                  month: "long",
                }) +
                " " +
                start_time.getDate() +
                ", " +
                start_time.getFullYear()}
            </Card.Text>
          </div>
          <div onClick={remove} className="mx-2">
            <FaTrashCan color="#ff0000" />
          </div>
        </Card.Body>
      </Card>
    </NextLink>
  );
};

export default Item;
