import { parseAsync } from "@babel/core";
import React from "react";
import PropTypes from "prop-types";
import * as ST from "./transaction.style";

const Transaction = ({ transaction }) => {
	const {
		description,
		category_title: category,
		amount: { value, currency_iso },
		date,
	} = transaction;
	return (
		<ST.TransactionWrapper className="transaction">
			<ST.Item>{date}</ST.Item>
			<ST.Item>{description}</ST.Item>
			<ST.Item>{category}</ST.Item>
			<ST.ItemAmount>{`£ ${value}`}</ST.ItemAmount>
		</ST.TransactionWrapper>
	);
};

Transaction.prototype = {
	amount: PropTypes.shape({
		value: PropTypes.number.isRequired,
		currency_iso: PropTypes.string.isRequired,
	}),
	id: PropTypes.string.isRequired,
	category_title: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
};

export { Transaction };
