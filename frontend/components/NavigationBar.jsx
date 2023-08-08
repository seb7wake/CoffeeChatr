import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useAppContext } from "../context/state";

const NavigationBar = ({ user }) => {
  const { _, setCurrentUser } = useAppContext();
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container className="m-2 align-items-center">
        <Navbar.Brand href="/">
          <h3 className="m-0 mx-2">CoffeeChatr</h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="me-auto">
          <Nav.Link href="/">View chats</Nav.Link>
          <Nav.Link href="/create">Create chat</Nav.Link>
        </Nav>
      </Container>
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          <NavDropdown title={user.email} className="justify-content-end mx-5">
            <NavDropdown.Item
              href="/api/auth/logout"
              onClick={() => setCurrentUser(undefined)}
            >
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
