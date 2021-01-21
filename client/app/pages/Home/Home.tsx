import React from "react";
import myImage from "../../../public/images/test_image.png";

// type HomeProps = {}

const Home = (): JSX.Element => {
  return (
    <div>
      <h1 className="test">Welcome to our basic react app</h1>
      <img src={myImage}/>
    </div>
  );
};

export default Home;
