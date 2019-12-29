import React from "react";
import Slide from "@material-ui/core/Slide";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        transitionProperty: 'transform',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: '100%',
    },
});

const Image = ({src, direction, currentImage, classes}) => {
    const styles = useStyles();

    let customClasses = {
        img: '',
        ...classes || {}
    };

    if (!src) {
        throw new Error('Image src is required.');
    }

    return <div key={currentImage} className={styles.root}>
        <Slide in={true} direction={direction}>
            <img className={`${styles.img} ${customClasses.img}`} src={src} alt=""/>
        </Slide>
    </div>;
};

export default Image;
