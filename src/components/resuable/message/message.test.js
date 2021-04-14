import React from "react";
import "@testing-library/jest-dom";
import axios from "axios";
import { render, screen, act, cleanup } from "@testing-library/react";
import { Message } from "./message.component";

afterEach(cleanup);

describe("it should render the component", () => {
	it("should render the message component", () => {
		const { container } = render(<Message message="Loading ..." />);
		expect(container.firstChild.className).toMatch("message");
	});

	it("should show props value", () => {
		const { rerender } = render(<Message message="Loading ..." />);
		expect(screen.getByText(/Loading .../i)).toBeInTheDocument();
		rerender(<Message message="error while fetching data" />);
		expect(screen.getByText(/error while fetching data/i)).toBeInTheDocument();
	});
});
describe("it should match the snapshot", () => {
	it("should match snapshot", () => {
		const testUnit = render(<Message message="Loading ..." />);
		expect(testUnit).toMatchSnapshot();
	});
});
