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
import { Transaction } from "./transaction.component";
const expense_1 = {
	id: "b11de7abd717eae696d2eedca9c24e5df7652b59a7ad200d43aa88321d908694342d",
	date: "2018-07-03",
	description: "Amazon",
	category_title: "Shopping",
	amount: {
		value: -99.95,
		currency_iso: "GBP",
	},
};
const expense_2 = {
	id: "da972f75ba1b4da81c93dcffeedf388f5c85e76642b2d41089d715b428b580dc469a",
	date: "2018-07-02",
	description: "Vodafone",
	category_title: "Entertainment",
	amount: {
		value: -29.99,
		currency_iso: "GBP",
	},
};
describe("it should render the component", () => {
	it("should render the component", () => {
		const { container } = render(<Transaction transaction={expense_1} />);
		expect(container.firstChild.className).toMatch(/transaction/i);
	});
	it("should display the date, description, category and title", () => {
		const { rerender } = render(<Transaction transaction={expense_1} />);
		expect(screen.getByText(/Amazon/i)).toBeInTheDocument();
		expect(screen.getByText(/Shopping/i)).toBeInTheDocument();
		expect(screen.getByText(/£ -99.95/)).toBeInTheDocument();
		expect(screen.getByText(/2018-07-03/)).toBeInTheDocument();

		rerender(<Transaction transaction={expense_2} />);
		expect(screen.getByText(/Vodafone/i)).toBeInTheDocument();
		expect(screen.getByText(/Entertainment/i)).toBeInTheDocument();
		expect(screen.getByText(/£ -29.99/)).toBeInTheDocument();
		expect(screen.getByText(/2018-07-02/)).toBeInTheDocument();
	});
});
describe("it should match the snapshot", () => {
	it("should match the snapshot for expense_1", () => {
		const testUnit = render(<Transaction transaction={expense_1} />);
		expect(testUnit).toMatchSnapshot();
	});
});
