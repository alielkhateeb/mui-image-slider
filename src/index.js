import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles({
    root: {
        position: 'relative',
        width: 500,
        height: ({fitToImageHeight}) => !fitToImageHeight && 500,
    },
    wrapper: {
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        '&:hover': {
            '& $arrowWrapper': {
                opacity: 1,
            },
        },
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
    arrowWrapper: {
        height: "100%",
        position: "absolute",
        top: 0,
        width: "10%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
        cursor: 'pointer',
        transition: 'opacity 300ms, background 300ms',
        opacity: ({alwaysShowArrows}) => alwaysShowArrows ? 1 : 0,
        background: ({arrowsBgColor}) => arrowsBgColor,
        '&:hover': {
            background: ({arrowsBgHoverColor}) => arrowsBgHoverColor,
        },
    },
    arrowWrapperRight: {
        right: 0,
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
        },
    },
    arrowLeft: {
        '&::before': {
            right: -5,
            borderRightColor: ({arrowsColor}) => arrowsColor,
        },
    },
    arrowRight: {
        '&::before': {
            left: -5,
            borderLeftColor: ({arrowsColor}) => arrowsColor,
        },
    },
});

const MuiImageSlider = props => {
    const {images, customArrow, onArrowClick, autoPlay} = props;

    let defaultOptions = {
        arrows: true,
        autoPlay: true,
        arrowsColor: 'dimgrey',
        arrowsBgColor: 'transparent',
        arrowsBgHoverColor: '#B9B9B95E',
        alwaysShowArrows: false,
        fitToImageHeight: false,
    };
    let options = Object.assign({}, defaultOptions, props);

    const {arrows} = options;

    const [currentImage, setCurrentImage] = useState(0);
    const [direction, setDirection] = useState('left');
    const [autoPlayTimeout, setAutoPlayTimeout] = useState();

    const getNextImage = () => (currentImage + 1) % images.length;
    const getPrevImage = () => (currentImage ? currentImage : images.length) - 1;

    const handleNextImageClick = () => {
        setDirection('left');
        restartAutoPlay();
        let nextImage = getNextImage();
        setCurrentImage(nextImage);
        if (onArrowClick) {
            onArrowClick(nextImage);
        }
    };

    const handlePrevImageClick = () => {
        setDirection('right');
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
            setDirection('left');
            setCurrentImage(getNextImage());
            restartAutoPlay();
        }, 3000);

        setAutoPlayTimeout(timeout);
    }

    /**
     * Default classes
     * @type {{root: string, wrapper: string, arrowWrapper: string}}
     */
    let classes = {root: '', wrapper: '', arrowWrapper: ''};
    if (props.classes) {
        classes = {...classes, ...props.classes};
    }

    const defaultClasses = useStyles(options);

    const Image = () => <Slide in={true} direction={direction}>
        <img className={defaultClasses.img} src={images[currentImage]} alt=""/>
    </Slide>;

    return (
        <div className={`${defaultClasses.root} ${classes.root}`}>
            <div className={`${defaultClasses.wrapper} ${classes.wrapper}`}>
                <div onClick={handlePrevImageClick}
                     className={`${defaultClasses.arrowWrapper} ${classes.arrowWrapper}`}>
                    {customArrow ? customArrow() :
                        <i className={`${defaultClasses.arrow} ${defaultClasses.arrowLeft}`}/>}
                </div>
                <div className={defaultClasses.container}>
                    <Image/>
                </div>
                {arrows &&
                <div onClick={handleNextImageClick}
                     className={`${defaultClasses.arrowWrapper} ${classes.arrowWrapper} ${defaultClasses.arrowWrapperRight}`}>
                    <i className={`${defaultClasses.arrow} ${defaultClasses.arrowRight}`}/>
                </div>}
            </div>
        </div>
    );
};

export default MuiImageSlider;
