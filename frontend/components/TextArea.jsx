import React from "react";
import dynamic from "next/dynamic";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const TextArea = (props) => {
  return (
    <div>
      <label>{props.title}</label>
      <QuillNoSSRWrapper
        theme="snow"
        value={props.value}
        onChange={(val) => props.handleChange(props.name, val)}
      />
    </div>
  );
};

export default TextArea;
