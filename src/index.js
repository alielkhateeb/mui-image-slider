import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Image from "./Image";
import ArrowButton from "./ArrowButton";

// noinspection JSCheckFunctionSignatures
const useStyles = makeStyles({
  root: {
    position: "relative",
    width: 500,
    height: ({ fitToImageHeight }) => !fitToImageHeight && 500,
  },
  wrapper: {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    height: "100%",
  },
  arrowWrapper: {},
  img: {},
});

const MuiImageSlider = (props) => {
  const { images, CustomArrow, onArrowClick, autoPlay } = props;
  if (!images || !images.length) {
    throw new Error("images prop is required and cannot be empty.");
  }

  let defaultOptions = {
    arrows: true,
    autoPlay: true,
    arrowsColor: "dimgrey",
    arrowsBgColor: "transparent",
    arrowsBgHoverColor: "#B9B9B95E",
    alwaysShowArrows: false,
    fitToImageHeight: false,
  };
  let options = Object.assign({}, defaultOptions, props);

  const { arrows } = options;

  const [currentImage, setCurrentImage] = useState(0);
  const [direction, setDirection] = useState("left");
  const [autoPlayTimeout, setAutoPlayTimeout] = useState();
  const [mouseOver, setMouseOver] = useState(false);

  const getNextImage = () => (currentImage + 1) % images.length;
  const getPrevImage = () => (currentImage ? currentImage : images.length) - 1;

  const handleNextImageClick = () => {
    setDirection("left");
    restartAutoPlay();
    let nextImage = getNextImage();
    setCurrentImage(nextImage);
    if (onArrowClick) {
      onArrowClick(nextImage);
    }
  };

  const handlePrevImageClick = () => {
    setDirection("right");
    restartAutoPlay();
    let prevImage = getPrevImage();
    setCurrentImage(prevImage);
    if (onArrowClick) {
      onArrowClick(prevImage);
    }
  };

  const restartAutoPlay = () => {
    clearTimeout(autoPlayTimeout);
    setAutoPlayTimeout(null);
  };

  if (autoPlay && !autoPlayTimeout) {
    let timeout = setTimeout(() => {
      setDirection("left");
      setCurrentImage(getNextImage());
      restartAutoPlay();
    }, 3000);

    setAutoPlayTimeout(timeout);
  }

  const showButtons = arrows && images.length > 1;

  const classes = useStyles(options);
  return (
    <div
      className={classes.root}
      onMouseOver={() => showButtons && setMouseOver(true)}
      onMouseOut={() => setMouseOver(false)}
    >
      <div className={classes.wrapper}>
        {showButtons && (
          <ArrowButton
            left
            {...options}
            showArrows={mouseOver}
            onButtonClick={handlePrevImageClick}
            classes={{ root: classes.arrowWrapper }}
            CustomArrow={CustomArrow}
          />
        )}
        <Image
          currentImage={currentImage}
          src={images[currentImage]}
          direction={direction}
          classes={{ img: classes.img }}
        />
        {showButtons && (
          <ArrowButton
            right
            {...options}
            showArrows={mouseOver}
            onButtonClick={handleNextImageClick}
            classes={{ root: classes.arrowWrapper }}
            CustomArrow={CustomArrow}
          />
        )}
      </div>
    </div>
  );
};

export default MuiImageSlider;
