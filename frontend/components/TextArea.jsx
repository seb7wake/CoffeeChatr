import React from "react";
import { Form } from "react-bootstrap";

const TextArea = (props) => {
  return (
    <Form.Group className="mb-4">
      <Form.Label>{props.title}</Form.Label>
      <Form.Control
        as="textarea"
        type="text"
        name={props.name}
        required={props.required}
        value={props.value}
        onChange={props.handleChange}
      />
      {props.text && <Form.Text muted>{props.text}</Form.Text>}
      {props.errors[props.name] && (
        <div className="error">{props.errors[props.name]}</div>
      )}
    </Form.Group>
  );
};

export default TextArea;
