import React from "react";
import { Card } from "react-bootstrap";
import NextLink from "next/link";
import { FaTrashCan } from "react-icons/fa6";

const Item = ({ chat, remove }) => {
  const getDescriptiveText = () => {
    if (chat.invitee_about) {
      return `About Guest: ${chat.invitee_about}`;
    } else if (chat.goal) {
      return `Goal: ${chat.goal}`;
    } else if (chat.invitee_industry) {
      return `Industry: ${chat.invitee_industry}`;
    }
  };
  return (
    <NextLink href={`/meetings/${chat.id}`} className="item-link">
      <Card border="dark" className="mb-3 item p-2">
        <Card.Body className="d-flex flex-row align-items-center justify-content-between">
          <div>
            <Card.Title>{chat.title}</Card.Title>
            {/* <Card.Text>
              {"When: " +
                start_time.toLocaleString("default", {
                  month: "long",
                }) +
                " " +
                start_time.getDate() +
                ", " +
                start_time.getFullYear() +
                " @ " +
                start_time.toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit",
                })}
            </Card.Text> */}
            {getDescriptiveText() && (
              <Card.Text>{getDescriptiveText()}</Card.Text>
            )}
          </div>
          <div onClick={(e) => remove(e, chat.id)} className="mx-2">
            <FaTrashCan color="#ff0000" />
          </div>
        </Card.Body>
      </Card>
    </NextLink>
  );
};

export default Item;
