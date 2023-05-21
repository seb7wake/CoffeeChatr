import React from "react";
import NextLink from "next/link";

const Navbar = (props) => {
  return (
    <div className="navbar-container">
      <h1 className="title">CoffeeChatr</h1>
      <div className="link-container">
        <NextLink
          href="/"
          className={
            props.isCreate ? "view-chats-unselected" : "view-chats-selected"
          }
        >
          <h3>View Coffee Chats</h3>
        </NextLink>
        <NextLink
          href={`/create`}
          className={
            props.isCreate ? "create-chat-selected" : "create-chat-unselected"
          }
        >
          <h3>Create Coffee Chat</h3>
        </NextLink>
      </div>
    </div>
  );
};

export default Navbar;
