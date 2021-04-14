import styled from "styled-components";

export const FlexRowJCC = styled.div`
	display: flex;
	justify-content: center;
`;
export const FlexRowJCS = styled.div`
	display: flex;
	justify-content: start;
`;
export const FlexColumnAIC = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
export const AppWrapper = styled.main`
	min-height: 80vh;
	max-width: 120rem;
	margin: 0 auto;
`;

export const Heading = styled.h1`
	margin: 3rem 0 0.4rem 0;
	font-size: 2.6rem;
	font-weight: 400;
`;

export const AccountDetails = styled.span`
	margin-bottom: 3rem;
	font-size: 1rem;
`;

export const Balance = styled.span`
	font-size: 3rem;
	font-weight: bold;
	color: var(--color-balance);
`;

export const HeadingWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const TitleWrapper = styled(FlexRowJCC)`
	width: 55rem;
	border: 1px solid #ccc;
	border-radius: 6px;
	background-color: #eee;
	box-shadow: 2px 2px 8px #ccc;
	padding: 6px 0 6px 12px;
	@media only screen and (max-width: 768px) {
		width: 45rem;
	}
`;

export const Title = styled(FlexRowJCS)`
	flex: 1;
	font-size: 1.6rem;
`;
export const TransactionsWrapper = styled.ul`
	width: 55rem;
	@media only screen and (max-width: 768px) {
		width: 45rem;
	}
`;
