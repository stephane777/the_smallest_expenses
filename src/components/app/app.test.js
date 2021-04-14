import React from "react";
import "@testing-library/jest-dom";
import axios from "axios";
import {
	render,
	screen,
	act,
	cleanup,
	waitForElementToBeRemoved,
} from "@testing-library/react";
import { App } from "./app.component";

import { data } from "./__test__/mockAPI";

jest.mock("axios");

afterEach(cleanup);

describe("it should render App", () => {
	it("should render App", async () => {
		const promise = Promise.resolve(data);
		act(() => {
			const { container } = render(<App />);
			expect(container.firstChild.firstChild.className).toMatch(
				"sc-bdvvaa gbShRg header"
			);
		});
		await act(() => promise);
	});
	it("should show Loading...", async () => {
		const promise = Promise.resolve(data);
		axios.get.mockImplementation(() => promise);

		render(<App />);
		expect(screen.getByText(/Loading .../i)).toBeInTheDocument();
		await act(() => promise);
	});
	it("should show Curent Account,sort-code and balance", async () => {
		const promise = Promise.resolve(data);
		axios.get.mockImplementation(() => promise);
		render(<App />);

		expect(screen.getByText(/Loading .../i)).toBeInTheDocument();
		await waitForElementToBeRemoved(() => screen.getByText(/Loading .../i));

		expect(screen.getByText(/current account/i)).toBeInTheDocument();
		expect(screen.getByText(/12345678/)).toBeInTheDocument();
		expect(screen.getByText(/12-34-56/)).toBeInTheDocument();
		expect(screen.getByText(/£1,250.32/)).toBeInTheDocument();
		await act(() => promise);
	});
	it("should show the transaction header, Date, Description, Category, Amount", async () => {
		const promise = Promise.resolve(data);
		axios.get.mockImplementation(() => promise);
		render(<App />);

		expect(screen.getByText(/Loading .../i)).toBeInTheDocument();
		await waitForElementToBeRemoved(() => screen.getByText(/Loading .../i));

		expect(screen.getByText(/Date/i)).toBeInTheDocument();
		expect(screen.getByText(/Description/i)).toBeInTheDocument();
		expect(screen.getByText(/Category/i)).toBeInTheDocument();
		expect(screen.getByText(/amount/i)).toBeInTheDocument();
		await act(() => promise);
	});
	it("should display the 10 smallest expense", async () => {
		const promise = Promise.resolve(data);
		axios.get.mockImplementation(() => promise);
		render(<App />);

		expect(screen.getByText(/Loading .../i)).toBeInTheDocument();
		await waitForElementToBeRemoved(() => screen.getByText(/Loading .../i));

		expect(screen.getByText(/£ -51.19/i)).toBeInTheDocument();
		expect(screen.getByText(/£ -48.75/i)).toBeInTheDocument();
		expect(screen.getByText(/£ -45.23/i)).toBeInTheDocument();
		expect(screen.getByText(/£ -35.87/i)).toBeInTheDocument();
		expect(screen.getByText(/£ -34.98/i)).toBeInTheDocument();

		expect(screen.getByText(/£ -29.99/i)).toBeInTheDocument();
		expect(screen.getByText(/£ -19.99/i)).toBeInTheDocument();
		expect(screen.getByText(/£ -10.76/i)).toBeInTheDocument();
		expect(screen.getByText(/£ -3.75/i)).toBeInTheDocument();
		expect(screen.getByText(/£ -2.85/i)).toBeInTheDocument();

		await act(() => promise);
	});
});
describe("it should match the snapshot", () => {
	it("should match the snapshot while fetching data", async () => {
		const promise = Promise.resolve(data);
		axios.get.mockImplementation(() => promise);
		let testedUnit;
		act(() => {
			testedUnit = render(<App />);
		});
		expect(testedUnit).toMatchSnapshot();
		await act(() => promise);
	});
	it("should match the snapshot after fetching data is success", async () => {
		const promise = Promise.resolve(data);
		axios.get.mockImplementation(() => promise);
		let testedUnit;

		act(() => {
			testedUnit = render(<App />);
		});

		await waitForElementToBeRemoved(() => screen.getByText(/Loading .../i));
		expect(testedUnit).toMatchSnapshot();
		await act(() => promise);
	});
});
