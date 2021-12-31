import React from "react";
export default function Spinner(props) {
  return (
    props.spinner && (
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    )
  );
}
