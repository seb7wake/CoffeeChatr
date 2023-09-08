import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Form } from "react-bootstrap";

const MultiSelect = (props) => {
  return (
    <Form.Group className="mb-5 row">
      <label style={{ width: "10rem" }}>Meeting goal</label>
      <Select
        isMulti
        name="goal"
        placeholder="Select all that apply..."
        value={
          props.form.goal
            ? goalOptions.filter((option) => {
                return props.form.goal.split(", ").includes(option.value);
              })
            : []
        }
        options={goalOptions}
        className="basic-multi-select"
        required
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
    value: "get a job referral",
    label: "Getting a job referral",
  },
  {
    value: "receive career advice",
    label: "Receiving career advice",
  },
  {
    value: "receive advice on educational paths",
    label: "Receiving advice on educational paths",
  },
  {
    value: "receive mentorship and guidance",
    label: "Receiving mentorship and guidance",
  },
  {
    value: "learn about their education experience",
    label: "Learning about their education experience",
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
    label: "Learning about skill development in their industry",
  },
  {
    value: "explore partnership or collaboration opportunities",
    label: "Exploring partnership or collaboration opportunities",
  },
  {
    value: "learn about their career path",
    label: "Learning about their career path",
  },
];

export default MultiSelect;
