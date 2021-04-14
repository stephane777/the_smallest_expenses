import React from "react";
import PropTypes from "prop-types";
import * as SM from "./message.style";

export const Message = ({ message }) => {
	return (
		<SM.Wrapper className="message">
			<span>{message}</span>
		</SM.Wrapper>
	);
};
Message.prototype = {
	message: PropTypes.string.isRequired,
};
