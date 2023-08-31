import React from "react";
import { Form } from "react-bootstrap";

const TextInput = (props) => {
  return (
    <Form.Group className="d-flex mb-4 align-items-center">
      <Form.Label style={{ width: "13rem" }}>{props.title}</Form.Label>
      <Form.Control
        type="text"
        className="w-50"
        name={props.name}
        required={props.required}
        value={props.value}
        onChange={props.handleChange}
      />
      {props.errors[props.name] && (
        <div className="error">{props.errors[props.name]}</div>
      )}
    </Form.Group>
  );
};

export default TextInput;
