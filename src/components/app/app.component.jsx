import React from "react";

import axios from "axios";
import { Header } from "../header";
import { Footer } from "../footer";
import { Message } from "../resuable/message";
import { Transaction } from "../transaction";

import * as AS from "./app.style";
import { getSmallestExpense, removeIncome } from "../../utils";

const initialState = {
	data: {},
	loading: false,
	error: "",
};

const reducer = (state, action) => {
	switch (action.type) {
		case "FETCHING":
			return {
				...state,
				loading: true,
				error: "",
			};
		case "SUCCESS":
			return {
				...state,
				loading: false,
				data: action.data,
			};
		case "ERROR":
			return {
				...state,
				loading: false,
				error: action.error,
			};
		default:
			return state;
	}
};

const App = () => {
	const [state, dispatch] = React.useReducer(reducer, initialState);
	const { data, loading, error } = state;

	const url = "http://www.mocky.io/v2/5c62e7c33000004a00019b05";

	const formatAmount = (amount) => {
		const formatter = new Intl.NumberFormat("en-GB", {
			style: "currency",
			currency: "GBP",
		});
		return formatter.format(amount);
	};

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				dispatch({ type: "FETCHING" });
				const response = await axios.get(url);
				const result = await response;
				const {
					status,
					data,
					data: { transactions },
				} = await result;
				if (status === 200) {
					const incomeRemoved = removeIncome(transactions);
					const smallestExpense = getSmallestExpense(incomeRemoved);
					const newState = {
						...data,
						transactions: smallestExpense,
					};
					dispatch({ type: "SUCCESS", data: newState });
				} else throw `no data available: ${result.status}`;
			} catch (e) {
				dispatch({ type: "ERROR", error: e.toString() });
			}
		};
		fetchData();
	}, []);

	const expenses = () => {
		const {
			provider: { description, account_number: number, sort_code },
			balance: { amount, currency_iso: currency },
			transactions,
		} = data;

		const formattedAmount = formatAmount(amount);
		return (
			<React.Fragment>
				<AS.FlexColumnAIC className="expense__header">
					<AS.Heading>{description}</AS.Heading>
					<AS.AccountDetails>{`${number} ${sort_code} `}</AS.AccountDetails>
					<AS.Balance>{formattedAmount}</AS.Balance>
				</AS.FlexColumnAIC>
				<AS.FlexRowJCC style={{ marginTop: "4rem" }}>
					<AS.TitleWrapper>
						<AS.Title>Date</AS.Title>
						<AS.Title>Description</AS.Title>
						<AS.Title>Category</AS.Title>
						<AS.Title>Amount</AS.Title>
					</AS.TitleWrapper>
				</AS.FlexRowJCC>
				<AS.FlexRowJCC style={{ marginTop: "1rem" }}>
					<AS.TransactionsWrapper>
						{transactions.map((transaction) => (
							<Transaction key={transaction.id} transaction={transaction} />
						))}
					</AS.TransactionsWrapper>
				</AS.FlexRowJCC>
			</React.Fragment>
		);
	};

	return (
		<div>
			<Header className="header" />
			<AS.AppWrapper>
				{error && <Message message={error} />}
				{loading && !error && <Message message="Loading ..." />}
				{!loading && !error && data.transactions && expenses()}
			</AS.AppWrapper>
			<Footer />
		</div>
	);
};

export { App };
