import React from "react";
import {configure, mount, shallow} from "enzyme";
import {expect} from 'chai';
import Image from "../src/Image";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});

describe('Image Component', () => {
    it('Renders', () => {
        shallow(<Image src="Some URL"/>);
    });
    it('Assert src prop is required', () => {
        expect(Image).to.throw();
    });
    it('Prop currentImage starts with 0', () => {
        let wrapper = mount(<Image src="Some URL" currentImage={0}/>);
        expect(wrapper.prop('currentImage')).to.equal(0);
    });
});
