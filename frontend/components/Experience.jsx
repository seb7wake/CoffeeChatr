import React from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import Position from "./Position";

const Experience = (props) => {
  const removePosition = (e, id) => {
    e.preventDefault();
    props.setForm((prevState) => ({
      ...prevState,
      experience: props.experience.filter((item) => item.id !== id),
    }));
  };

  const addPosition = (e) => {
    e.preventDefault();
    props.setForm((prevState) => ({
      ...prevState,
      experience: [
        ...props.experience,
        {
          id: (props.experience.length + 1).toString(),
          title: "",
          description: "",
        },
      ],
    }));
  };

  return (
    <div className="mb-4">
      <label className="mb-2 d-flex flex-row">
        Relevant Work Experience of Guest
      </label>
      {props.experience &&
        props.experience.map((item, index) => {
          return (
            <Position
              key={index}
              {...item}
              removePosition={removePosition}
              experience={props.experience}
              setForm={props.setForm}
            />
          );
        })}
      <button
        type="button"
        className="rounded-pill pill-btn mb-3 border-1 py-2 w-25"
        onClick={addPosition}
      >
        <span className="d-flex flex-row justify-content-center align-items-center">
          Add
          <IoAddCircleOutline className="ml-1" size={20} />
        </span>
      </button>
      {props?.errors && props.errors[props.name] && (
        <div className="error">{props.errors[props.name]}</div>
      )}
    </div>
  );
};

export default Experience;
