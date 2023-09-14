import React from "react";
import styled from "styled-components";

const DivWrapper = styled('div')`
	background-color: #2A2B2D;
	height: 36px;
	display: flex;
	align-items: center;
`;

const YouTubeLink = styled('a')`
	text-decoration: none;
	color: #989ca3;
	font-weight: 100;
	margin-left: 16px;
`;

const Title = () => (
	<DivWrapper>
		<YouTubeLink href="https://www.youtube.com/c/zloyleva" target="_blank">&lt;zloyLeva/&gt;</YouTubeLink>
	</DivWrapper>
);

export { Title };
