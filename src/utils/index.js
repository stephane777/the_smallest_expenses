export const getSmallestExpense = (expenseList) => {
	const sortedExpense = expenseList.sort(
		(a, b) => a.amount.value - b.amount.value
	);
	return sortedExpense.slice(sortedExpense.length - 10);
};
export const removeIncome = (list) => {
	return list.filter((transaction) => transaction.category_title != "Income");
};
