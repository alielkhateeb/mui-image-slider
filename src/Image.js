import React from "react";
import Slide from "@mui/material/Slide";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    transitionProperty: "transform",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: "100%",
  },
});

const Image = (props) => {
  const { src, direction, currentImage } = props;
  if (!src) {
    throw new Error("Image src is required.");
  }

  const classes = useStyles(props);
  return (
    <div key={currentImage} className={classes.root}>
      <Slide in={true} direction={direction}>
        <img className={classes.img} src={src} alt="" />
      </Slide>
    </div>
  );
};

export default Image;
