import React from "react";
import { Card } from "react-bootstrap";
import NextLink from "next/link";

const Item = ({ chat }) => {
  return (
    <NextLink href={`/meetings/${chat.id}`} className="item-link">
      <Card border="dark" className="mb-3 item">
        <Card.Body>
          <Card.Title>{chat.title}</Card.Title>
          <Card.Text>{chat.meeting_start_time}</Card.Text>
        </Card.Body>
      </Card>
    </NextLink>
  );
};

export default Item;
