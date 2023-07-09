import React from "react";

const TextInput = (props) => {
  return (
    <div>
      <label>{props.title}</label>
      <input
        type="text"
        name={props.name}
        required={props.required}
        value={props.value}
        onChange={props.handleChange}
      />
      {props.errors[props.name] && (
        <div className="error">{props.errors[props.name]}</div>
      )}
    </div>
  );
};

export default TextInput;
