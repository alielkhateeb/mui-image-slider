import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    arrowWrapper: {
        height: "100%",
        position: "absolute",
        top: 0,
        right: ({right}) => right && 0,
        width: "10%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
        cursor: 'pointer',
        transition: 'opacity 300ms, background 300ms',
        opacity: ({alwaysShowArrows, showArrows}) => alwaysShowArrows || showArrows ? 1 : 0,
        background: ({arrowsBgColor}) => arrowsBgColor,
        '&:hover': {
            background: ({arrowsBgHoverColor}) => arrowsBgHoverColor,
        },
    },
    arrow: {
        position: 'relative',
        display: 'block',
        height: 50,
        '&::before': {
            position: "absolute",
            display: "block",
            content: "''",
            border: "15px solid transparent",
            right: ({left}) => left && -5,
            borderRightColor: ({left, arrowsColor}) => left && arrowsColor,
            left: ({right}) => right && -5,
            borderLeftColor: ({right, arrowsColor}) => right && arrowsColor,
        },
    },
});

function ArrowButton(props) {
    const {onButtonClick, classes, right, left, CustomArrow} = props;

    const customClasses = classes ? classes : {};

    if (!CustomArrow && !right && !left) {
        throw new Error('One of `right` or `left` props must be true');
    }

    const styles = useStyles(props);
    return <div onClick={onButtonClick} className={`${styles.arrowWrapper} ${customClasses.root}`}>
        {CustomArrow ? CustomArrow() : <i className={`${styles.arrow}`}/>}
    </div>;
}

export default ArrowButton;
