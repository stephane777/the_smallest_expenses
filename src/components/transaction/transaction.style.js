import styled from "styled-components";

export const TransactionWrapper = styled.li`
	display: flex;
	justify-content: center;
	font-size: 1.2rem;
	padding: 4px 0 4px 12px;
`;

export const Item = styled.span`
	display: flex;
	justify-content: start;
	flex: 1;
`;
export const ItemAmount = styled(Item)`
	color: var(--color-expense);
`;
