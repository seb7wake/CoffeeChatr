import React, { useState } from "react";
import { Container, Button, Image, Col, Form, Row } from "react-bootstrap";

const Search = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Row>
      <Col sm={4}>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search title..."
            className="me-2 "
            aria-label="Search meeting title"
            value={searchTerm}
            onChange={(e) => {
              if (e.target.value === "") {
                handleSearch("");
              }
              setSearchTerm(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearch(searchTerm);
              }
            }}
          />
          <Button
            className="rounded-pill"
            variant="outline-primary"
            onClick={() => handleSearch(searchTerm)}
          >
            Search
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default Search;
