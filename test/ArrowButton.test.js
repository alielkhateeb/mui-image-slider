import React from "react";
import ArrowButton, {
  ARROW_LEFT_TEST_ID,
  ARROW_RIGHT_TEST_ID,
} from "../src/ArrowButton";
import { render, screen, fireEvent } from "@testing-library/react";

configure({ adapter: new Adapter() });

describe("ArrowButton Component", () => {
  it("Left Arrow Renders", () => {
    render(<ArrowButton left />);
    expect(screen.findByTestId(ARROW_LEFT_TEST_ID)).toBeTruthy();
  });
  it("Right Arrow Renders", () => {
    render(<ArrowButton left />);
    expect(screen.findByTestId(ARROW_RIGHT_TEST_ID)).toBeTruthy();
  });
  it("Assert right/left prop is required", () => {
    expect(() => render(<ArrowButton left />)).to.throw();
  });
  it("Click callback is called", () => {
    const clickCallback = jest.fn();
    render(<ArrowButton left onButtonClick={clickCallback} />);
    const arrow = screen.findByTestId(ARROW_LEFT_TEST_ID);
    fireEvent.click(arrow);
    expect(clickCallback).toHaveBeenCalled();
  });
  it("CustomArrow renders", () => {
    const Test = () => <span>Test</span>;
    render(<ArrowButton left CustomArrow={Test} />);
    expect(screen.getByText("Test")).toBeTruthy();
  });
});
