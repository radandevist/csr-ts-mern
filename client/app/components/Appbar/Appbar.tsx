import React from "react";
import { Link } from "react-router-dom";

const AppBar = (): JSX.Element => {
  return (
    <div>
      <h3>This is an AppBar</h3>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/form">Form</Link>
        </li>
      </ul>
    </div>
  );
};

export default AppBar;
