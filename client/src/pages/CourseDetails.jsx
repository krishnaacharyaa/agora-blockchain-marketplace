import { ethers } from "ethers";
import React from "react";
import { useLocation } from "react-router-dom";

const CourseDetails = () => {
	const { state } = useLocation();
	const decimalNumber = parseInt(state.price, 16);
	const etherValue = decimalNumber / 1e18;
	const handleSubmit = () => {};
	return (
		<div>
			<div>{state.title}</div>
			<div>{state.owner.toString()}</div>
			<div>{state.description}</div>
			<div>Price {ethers.utils.formatUnits(state.price, 18)}</div>
			<div>{state.image}</div>
			<div>{state.createdOn}</div>
			<div>{state.createdBy}</div>
			<div>{state.level}</div>
			<div>{state.language}</div>
			<div>{state.category}</div>
			<div>{state.certificate}</div>
			{/* {isLoadingMain ? (
				<button className="px-4 py-2 bg-blue-200 text-white rounded-md">
					Loading...
				</button>
			) : (
				<button
					onClick={handleSubmit}
					className="px-4 py-2 bg-blue-500 text-white rounded-md"
				>
					Purchase Course
				</button>
			)} */}
		</div>
	);
};

export default CourseDetails;