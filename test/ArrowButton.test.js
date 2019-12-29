import React from "react";
import {configure, mount, shallow} from "enzyme";
import {expect} from 'chai';
import Adapter from "enzyme-adapter-react-16";
import ArrowButton from "../src/ArrowButton";

configure({adapter: new Adapter()});

describe('ArrowButton Component', () => {
    it('Left Arrow Renders', () => {
        shallow(<ArrowButton left/>);
    });
    it('Right Arrow Renders', () => {
        shallow(<ArrowButton right/>);
    });
    it('Assert right/left prop is required', () => {
        expect(() => shallow(ArrowButton)).to.throw();
    });
    it('Click callback is called', () => {
        let callCount = 0;
        const testFunction = () => {
            callCount++;
        };
        let wrapper = shallow(<ArrowButton left onButtonClick={testFunction}/>);
        wrapper.simulate('click');
        expect(callCount).to.equal(1);
    });
    it('CustomArrow renders', () => {
        const Test = () => <span>Test</span>;
        const wrapper = mount(<ArrowButton left CustomArrow={Test}/>);
        expect(wrapper.text()).to.equal('Test');
    });
    it('Prop showArrows', () => {
        const wrapper = mount(<ArrowButton left showArrows/>);
        expect(wrapper.prop('showArrows')).to.be.true;
    });
    it('Prop alwaysShowArrows', () => {
        const wrapper = mount(<ArrowButton left alwaysShowArrows/>);
        expect(wrapper.prop('alwaysShowArrows')).to.be.true;
    });
});
