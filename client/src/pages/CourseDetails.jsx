import { ethers } from "ethers";
import React from "react";
import { useLocation } from "react-router-dom";

const CourseDetails = () => {
	const { state } = useLocation();
	const decimalNumber = parseInt(state.price, 16);
	const etherValue = decimalNumber / 1e18;
	return (
		<div>
			<div>{state.title}</div>
			<div>{state.owner.toString()}</div>
			<div>{state.description}</div>
			{/* <div>{state.consumers != undefined && state.consumers}</div> */}
			<div>Price {ethers.utils.formatUnits(state.price, 18)}</div>
			<div>{state.image}</div>
			<div>{state.createOn}</div>
			<div>{state.createdBy}</div>
			<div>{state.level}</div>
			<div>{state.language}</div>
			<div>{state.category}</div>
			<div>{state.certificate}</div>
		</div>
	);
};

export default CourseDetails;
