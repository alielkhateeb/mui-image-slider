import React from "react";
import {configure, shallow} from 'enzyme';
import MuiImageSlider from '../src';
import {expect} from 'chai';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('<MuiImageSlider/>', () => {
    it('Renders', () => {
        let wrapper = shallow(<MuiImageSlider/>);
        expect(wrapper.props().children.props.children).to.have.lengthOf(3);
        expect(wrapper.props().children.props.children[0]).to.be.an('object');
        expect(wrapper.props().children.props.children[2]).to.be.an('object');
    });
    it('Renders with arrows=false', () => {
        let wrapper = shallow(<MuiImageSlider arrows={false}/>);
        expect(wrapper.props().children.props.children[0]).to.equal(false, 'Left arrow was rendered when arrows=false');
        expect(wrapper.props().children.props.children[2]).to.equal(false, 'Right arrow was rendered when arrows=false');
    });
});
