import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles({
    wrapper: {
        position: 'relative',
        width: 500,
        height: ({fitImageHeight}) => !fitImageHeight && 500,
    },
    sliderWrapper: {
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
    },
    container: {
        display: 'flex',
        transitionProperty: 'transform',
        height: '100%',
        alignItems: 'center',
    },
    img: {
        width: '100%',
    },
    chevronWrapper: {
        height: "100%",
        position: "absolute",
        top: 0,
        width: "10%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
        cursor: 'pointer',
        background: ({arrowBgColor}) => arrowBgColor,
        '&:hover': {
            background: ({arrowBgHoverColor}) => arrowBgHoverColor,
        },
    },
    chevronWrapperRight: {
        right: 0,
    },
    chevron: {
        position: 'relative',
        display: 'block',
        height: 50,
        '&::before': {
            position: "absolute",
            display: "block",
            content: "''",
            border: "15px solid transparent",
        },
    },
    chevronLeft: {
        '&::before': {
            right: -5,
            borderRightColor: ({arrowColor}) => arrowColor,
        },
    },
    chevronRight: {
        '&::before': {
            left: -5,
            borderLeftColor: ({arrowColor}) => arrowColor,
        },
    },
});

const ReactImagesSlider = props => {
    const {images} = props;

    let settings = {
        arrows: true,
        autoPlay: true,
        arrowColor: 'black',
        arrowBgColor: 'transparent',
        arrowBgHoverColor: '#d3d3d35e',
        fitImageHeight: false,
    };
    settings = Object.assign({}, settings, props);

    const {arrows} = settings;

    const [currentImage, setCurrentImage] = useState(0);
    const [direction, setDirection] = useState();

    const nextImage = () => (currentImage + 1) % images.length;
    const prevImage = () => (currentImage ? currentImage : images.length) - 1;

    const handleNextImageClick = () => {
        setDirection('left');
        setCurrentImage(nextImage());
    };

    const handlePrevImageClick = () => {
        setDirection('right');
        setCurrentImage(prevImage());
    };

    const Image = () => <Slide in={true} direction={direction}>
        <img className={classes.img} src={images[currentImage]} alt=""/>
    </Slide>;

    const classes = useStyles(settings);
    return (
        <div className={classes.wrapper}>
            {arrows && <div onClick={handlePrevImageClick} className={classes.chevronWrapper}>
                <i className={`${classes.chevron} ${classes.chevronLeft}`}/>
            </div>}
            <div className={classes.sliderWrapper}>
                <div className={classes.container}>
                    <Image/>
                </div>
            </div>
            {arrows && <div onClick={handleNextImageClick} className={`${classes.chevronWrapper} ${classes.chevronWrapperRight}`}>
                <i className={`${classes.chevron} ${classes.chevronRight}`}/>
            </div>}
        </div>
    );
};

export default ReactImagesSlider;
