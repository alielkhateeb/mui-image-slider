import React from "react";
import {configure, shallow} from 'enzyme';
import MuiImageSlider from '../src';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('<MuiImageSlider/>', () => {
    it('Renders', () => {
        shallow(<MuiImageSlider/>);
    });
});
