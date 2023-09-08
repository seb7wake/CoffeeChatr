import React from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import School from "./School";

const Education = (props) => {
  const removeSchool = (e, id) => {
    e.preventDefault();
    props.setForm((prevState) => ({
      ...prevState,
      education: props.education.filter((item) => item.id !== id),
    }));
  };

  const addSchool = (e) => {
    e.preventDefault();
    props.setForm((prevState) => ({
      ...prevState,
      education: [
        ...props.education,
        {
          id: (props.education.length + 1).toString(),
          school: "",
          degree: "",
          field_of_study: "",
          description: "",
        },
      ],
    }));
  };

  return (
    <div className="mb-4">
      <label className="mb-2 d-flex flex-row">
        Relevant Education of Guest
      </label>
      {props.education &&
        props.education.map((item, index) => {
          return (
            <School
              index={item.id}
              {...item}
              removeSchool={removeSchool}
              education={props.education}
              setForm={props.setForm}
            />
          );
        })}
      <button
        type="button"
        className="rounded-pill pill-btn mb-3 border-1 py-2 w-25"
        onClick={addSchool}
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

export default Education;
