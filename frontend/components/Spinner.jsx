import React from "react";
import { Vortex } from "react-loader-spinner";

const Spinner = ({ chat }) => {
  return (
    <Vortex
      visible={true}
      height="80"
      width="80"
      ariaLabel="vortex-loading"
      wrapperClass="vortex-wrapper"
      colors={["red", "green", "blue", "yellow", "orange", "purple"]}
    />
  );
};

export default Spinner;
