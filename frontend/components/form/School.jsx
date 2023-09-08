import React from "react";
import { Card } from "react-bootstrap";
import { FaTrashCan } from "react-icons/fa6";
import { Form } from "react-bootstrap";

const School = (props) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    const school = props.education.find((item) => item.id === props.id);
    const updatedSchool = {
      ...school,
      [name]: value,
    };
    const education = props.education.map((item) =>
      item.id === props.id ? updatedSchool : item
    );
    props.setForm((prevState) => ({
      ...prevState,
      education: education,
    }));
  };

  return (
    <Card
      key={props.index}
      style={{ backgroundColor: "#fbfbfb" }}
      className="mb-4 p-2"
    >
      <Card.Body className="">
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <div>
            <Form.Group className="d-flex align-items-center flex-row mb-2">
              <Form.Label className="w-75 mb-0">School:</Form.Label>
              <Form.Control
                type="text"
                name="school"
                required={true}
                value={props.school}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="d-flex align-items-center flex-row mb-2">
              <Form.Label className="w-75 mb-0">Field of Study:</Form.Label>
              <Form.Control
                type="text"
                name="field_of_study"
                required={true}
                value={props.field_of_study}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="d-flex align-items-center flex-row mb-2">
              <Form.Label className="w-75 mb-0">Degree:</Form.Label>
              <Form.Control
                type="text"
                name="degree"
                required={true}
                value={props.degree}
                onChange={handleChange}
              />
            </Form.Group>
          </div>
          <div
            onClick={(e) => props.removeSchool(e, props.id)}
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
            placeholder="Describe any academic achievements."
            value={props.description}
            onChange={handleChange}
            rows={2}
          />
        </Form.Group>
      </Card.Body>
    </Card>
  );
};

export default School;
