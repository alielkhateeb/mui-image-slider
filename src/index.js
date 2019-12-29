import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Image from './Image';
import ArrowButton from "./ArrowButton";

// noinspection JSCheckFunctionSignatures
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
    },
});

const MuiImageSlider = props => {
    const {images, CustomArrow, onArrowClick, autoPlay} = props;

    if (!images || !images.length) {
        throw new Error('images prop is required and cannot be empty.');
    }

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
    const [showArrows, setShowArrows] = useState(false);

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

    return (
        <div className={`${defaultClasses.root} ${classes.root}`}
             onMouseOver={() => setShowArrows(true)}
             onMouseOut={() => setShowArrows(false)}>
            <div className={`${defaultClasses.wrapper} ${classes.wrapper}`}>
                {arrows && <ArrowButton left
                                        {...options}
                                        showArrows={showArrows}
                                        onButtonClick={handlePrevImageClick}
                                        classes={{root: classes.arrowWrapper}}
                                        CustomArrow={CustomArrow}/>}
                <Image currentImage={currentImage} src={images[currentImage]} direction={direction}/>
                {arrows && <ArrowButton right
                                        {...options}
                                        showArrows={showArrows}
                                        onButtonClick={handleNextImageClick}
                                        classes={{root: classes.arrowWrapper}}
                                        CustomArrow={CustomArrow}/>}
            </div>
        </div>
    );
};

export default MuiImageSlider;
