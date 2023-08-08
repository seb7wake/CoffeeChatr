import React from "react";
import dynamic from "next/dynamic";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});
const TextEdit = (props) => {
  return (
    <div className="mb-5">
      <label>{props.title}</label>
      <QuillNoSSRWrapper
        theme="snow"
        className="text-area"
        value={props.value}
        required={props.required}
        onChange={(val) => props.handleChange(props.name, val)}
        placeholder={props.placeholder ?? ""}
      />
      {props?.errors && props.errors[props.name] && (
        <div className="error">{props.errors[props.name]}</div>
      )}
    </div>
  );
};

export default TextEdit;
