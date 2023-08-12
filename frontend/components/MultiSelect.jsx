import React from "react";
import Select from "react-select";
import { Form } from "react-bootstrap";

const goalOptions = [
  {
    value: "get a job at their company",
    label: "Getting a job at their company",
  },
  {
    value: "learn about industry insight",
    label: "Learning about industry insight",
  },
  {
    value: "receive mentorship and guidance",
    label: "Receiving mentorship and guidance",
  },
  {
    value: "build a long-term relationship",
    label: "Building a long-term relationship",
  },
  {
    value: "understand company culture and values",
    label: "Understanding the company culture and values",
  },
  {
    value: "gain inspiration and motivation",
    label: "Gaining inspiration and motivation",
  },
  {
    value: "interview prep for that their company",
    label: "Interview prep for that their company",
  },
  {
    value: "learn about skill development in their industry",
    label: "Learn about skill development in their industry",
  },
];

const MultiSelect = (props) => {
  return (
    <Form.Group className="mb-5">
      <label style={{ width: "13rem" }}>The goal of this meeting is...</label>
      <Select
        isMulti
        name="goal"
        options={goalOptions}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={(values) => {
          props.setForm((prevState) => ({
            ...prevState,
            goal: values.map((item) => item.value).join(", "),
          }));
          console.log(values.map((item) => item.value).join(", "));
        }}
      />
    </Form.Group>
  );
};

export default MultiSelect;
