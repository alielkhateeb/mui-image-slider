import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    height: "100%",
    position: "absolute",
    top: 0,
    right: ({ right }) => right && 0,
    width: "10%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    cursor: "pointer",
    transition: "opacity 300ms, background 300ms",
    opacity: ({ alwaysShowArrows, showArrows }) =>
      alwaysShowArrows || showArrows ? 1 : 0,
    background: ({ arrowsBgColor }) => arrowsBgColor,
    "&:hover": {
      background: ({ arrowsBgHoverColor }) => arrowsBgHoverColor,
    },
  },
  arrow: {
    position: "relative",
    display: "block",
    height: 50,
    "&::before": {
      position: "absolute",
      display: "block",
      content: "''",
      border: "15px solid transparent",
      right: ({ left }) => left && -5,
      borderRightColor: ({ left, arrowsColor }) => left && arrowsColor,
      left: ({ right }) => right && -5,
      borderLeftColor: ({ right, arrowsColor }) => right && arrowsColor,
    },
  },
});

export const ARROW_RIGHT_TEST_ID = "arrow-right";
export const ARROW_LEFT_TEST_ID = "arrow-left";

function ArrowButton(props) {
  const { onButtonClick, right, left, CustomArrow } = props;

  if (!CustomArrow && !right && !left) {
    throw new Error("One of `right` or `left` props must be true");
  }

  const classes = useStyles(props);
  return (
    <div
      data-testid={right ? ARROW_RIGHT_TEST_ID : ARROW_LEFT_TEST_ID}
      onClick={onButtonClick}
      className={classes.root}
    >
      {CustomArrow ? CustomArrow() : <i className={`${classes.arrow}`} />}
    </div>
  );
}

export default ArrowButton;
