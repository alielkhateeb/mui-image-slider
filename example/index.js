import React from "react";
import { render } from "react-dom";
import MuiImageSlider from "../src";

const App = () => {
  return (
    <MuiImageSlider
      images={[
        "https://picsum.photos/id/0/5000/3333",
        "https://picsum.photos/id/1/5000/3333",
        "https://picsum.photos/id/2/5000/3333",
        "https://picsum.photos/id/3/5000/3333",
      ]}
      autoPlay
    />
  );
};
render(<App />, document.getElementById("root"));
