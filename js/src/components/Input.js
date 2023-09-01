import React from "react";

export const Input = ({ lable, type = "text", ...rest }) => {
  return (
    <div style={{ display: "flex", gap: "5px" }}>
      <label>{lable}</label>
      <input type={type} {...rest}></input>
    </div>
  );
};
