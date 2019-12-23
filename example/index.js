import React from 'react';
import {render} from 'react-dom';
import MuiImageSlider from '../dist';

const App = () => {
    const images = [
        'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
        'https://homepages.cae.wisc.edu/~ece533/images/arctichare.png',
        'https://homepages.cae.wisc.edu/~ece533/images/baboon.png',
        'https://homepages.cae.wisc.edu/~ece533/images/barbara.png',
    ];

    return <MuiImageSlider images={images}/>;

};
render(<App/>, document.getElementById("root"));
