import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Form } from "react-bootstrap";

const MultiSelect = (props) => {
  return (
    <Form.Group className="mb-5">
      <label style={{ width: "13rem" }}>The goal of this meeting is...</label>
      <Select
        isMulti
        name="goal"
        value={
          props.form.goal
            ? goalOptions.filter((option) => {
                return props.form.goal.split(", ").includes(option.value);
              })
            : []
        }
        options={goalOptions}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={(values) => {
          props.setForm((prevState) => ({
            ...prevState,
            goal: values.map((item) => item.value).join(", "),
          }));
        }}
      />
    </Form.Group>
  );
};

const goalOptions = [
  {
    value: "get a referral for their company",
    label: "Getting a referral for their company",
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
    value: "interview prep for their current company",
    label: "Interview prep for their current company",
  },
  {
    value: "learn about skill development in their industry",
    label: "Learn about skill development in their industry",
  },
];

export default MultiSelect;
