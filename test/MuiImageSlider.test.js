import React from "react";
import {configure, shallow, mount} from 'enzyme';
import MuiImageSlider from '../src';
import {expect} from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import ArrowButton from "../src/ArrowButton";
import Image from "../src/Image";

configure({adapter: new Adapter()});

const images = [
    'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
    'https://homepages.cae.wisc.edu/~ece533/images/arctichare.png',
    'https://homepages.cae.wisc.edu/~ece533/images/baboon.png',
    'https://homepages.cae.wisc.edu/~ece533/images/barbara.png',
];

describe('MuiImageSlider Component', () => {
    it('Renders', () => {
        shallow(<MuiImageSlider images={images}/>);
    });
    it('Assert required images prop', () => {
        expect(() => shallow(<MuiImageSlider/>)).to.throw();
    });
    it('Refuse empty array images prop', () => {
        expect(() => shallow(<MuiImageSlider images={[]}/>)).to.throw();
    });
    it('Renders with arrows', () => {
        let wrapper = mount(<MuiImageSlider images={images}/>);
        expect(wrapper.find(ArrowButton)).to.have.lengthOf(2);
    });
    it('Renders without arrows', () => {
        let wrapper = mount(<MuiImageSlider images={images} arrows={false}/>);
        expect(wrapper.find(ArrowButton)).to.have.lengthOf(0);
    });
    it('Autoplay prop', () => {
        let wrapper = mount(<MuiImageSlider images={images} autoPlay/>);
        expect(wrapper.prop('autoPlay')).to.be.true;
    });
    it('Prop currentImage starts with 0', () => {
        let wrapper = mount(<MuiImageSlider images={images}/>);
        expect(wrapper.find(Image).prop('currentImage')).to.equal(0);
    });
    describe('Get prevImage function', () => {
        let wrapper = mount(<MuiImageSlider images={images}/>);
        let prevButton = wrapper.find(ArrowButton).at(0);
        it('Infinite loop for previous image button', () => {
            prevButton.simulate('click');
            expect(wrapper.find(Image).prop('currentImage')).to.equal(3);
        });
        it('Previous Image in list', () => {
            prevButton.simulate('click');
            expect(wrapper.find(Image).prop('currentImage')).to.equal(2);
        });
    });
    describe('Get nextImage function', () => {
        let wrapper = mount(<MuiImageSlider images={images.slice(0, 2)}/>);
        let nextButton = wrapper.find(ArrowButton).at(1);
        it('Next Image in list', () => {
            nextButton.simulate('click');
            expect(wrapper.find(Image).prop('currentImage')).to.equal(1);
        });
        it('Infinite loop for next image button', () => {
            nextButton.simulate('click');
            expect(wrapper.find(Image).prop('currentImage')).to.equal(0);
        });
    });
    describe('onArrowClick Previous/Next Button', () => {
        let callCount = 0;
        let callbackCurrentImage = null;
        const testFunction = (currentImage) => {
            callCount++;
            callbackCurrentImage = currentImage;
        };
        let wrapper = mount(<MuiImageSlider images={images} onArrowClick={testFunction}/>);

        it('onArrowClick Next Button', () => {
            let nextButton = wrapper.find(ArrowButton).at(1);
            nextButton.simulate('click');
            expect(callCount).to.equal(1);
            expect(callbackCurrentImage).to.equal(1);
        });
        it('onArrowClick Previous Button', () => {
            let prevButton = wrapper.find(ArrowButton).at(0);
            prevButton.simulate('click');
            expect(callCount).to.equal(2);
            expect(callbackCurrentImage).to.equal(0);
        });
    });
});

