import React from "react";
import { hot } from "react-hot-loader";
import myImage from "../public/images/test_image.png";

import "./App.css";
import "./App.scss";

const App = () => {
  return (
    <div>
      <h1 className="test">Holla!!!! jhjho</h1>
      <img src={myImage}/>
    </div>
  );
};

export default hot(module)(App);
// export default hot(App);
// export default App;
