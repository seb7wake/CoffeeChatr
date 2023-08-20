import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useAppContext } from "../context/state";
import { TbCoffee } from "react-icons/tb";

const NavigationBar = ({ user }) => {
  const { _, setCurrentUser } = useAppContext();
  return (
    <Navbar bg="dark" data-bs-theme="dark" className="d-flex flex-row">
      <Container className="mb-0 m-2 align-items-center">
        <Navbar.Brand href="/home" className="d-flex align-items-center mx-1">
          <TbCoffee size={36} />
          <h3 className="ml-2 mr-5 text-2xl font-semibold">CoffeeChatr</h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="me-auto">
          <Nav.Link href="/create">Create chat</Nav.Link>
        </Nav>
      </Container>
      <Navbar.Collapse>
        <Nav>
          <NavDropdown title={user.email}>
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
