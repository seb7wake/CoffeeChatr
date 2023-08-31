import React from "react";
import { Card } from "react-bootstrap";
import { FaTrashCan } from "react-icons/fa6";
import { Form } from "react-bootstrap";
import TextArea from "./TextArea";

const Position = (props) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    const position = props.experience.find((item) => item.id === props.id);
    const updatedPosition = {
      ...position,
      [name]: value,
    };
    const experience = props.experience.map((item) =>
      item.id === props.id ? updatedPosition : item
    );
    props.setForm((prevState) => ({
      ...prevState,
      experience: experience,
    }));
  };

  return (
    <Card
      key={props.key}
      style={{ backgroundColor: "#fbfbfb" }}
      className="mb-4 p-2"
    >
      <Card.Body className="">
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <div>
            <Form.Group className="d-flex align-items-center flex-row mb-2">
              <Form.Label className="w-50 mb-0">Position:</Form.Label>
              <Form.Control
                type="text"
                name="title"
                required={true}
                value={props.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="d-flex align-items-center flex-row">
              <Form.Label className="w-50 mb-0">Company:</Form.Label>
              <Form.Control
                type="text"
                name="company"
                required={true}
                value={props.company}
                onChange={handleChange}
              />
            </Form.Group>
          </div>
          <div
            onClick={(e) => props.removePosition(e, props.id)}
            className="ml-5"
          >
            <FaTrashCan color="#ff0000" />
          </div>
        </div>
        <Form.Group>
          <Form.Control
            as="textarea"
            type="text"
            name="description"
            placeholder="Describe the position in a few sentences."
            value={props.description}
            onChange={handleChange}
            rows={2}
          />
        </Form.Group>
      </Card.Body>
    </Card>
  );
};

export default Position;
