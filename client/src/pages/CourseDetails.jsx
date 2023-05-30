import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useStateContext } from "../contex";

const CourseDetails = () => {
	const { state } = useLocation();
	const decimalNumber = parseInt(state.price, 16);
	const etherValue = decimalNumber / 1e18;
	const [alreadyPurchasedState, setAlreadyPurchasedState] = useState(false);
	const { buyCourse, isAlreadyPurchased } = useStateContext();
	const handleSubmit = async () => {
		setIsLoading(true);
		await buyCourse(state.pId, ethers.utils.formatUnits(state.price, 18));
		setIsLoading(false);
		Navigate("/");
	};
	const alreadyPurchased = async () => {
		const data = await isAlreadyPurchased(state.pId);
		setAlreadyPurchasedState(data);
	};
	useEffect(() => {
		alreadyPurchased();
	}, []);

	const [isLoading, setIsLoading] = useState(false);
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
			{isLoading ? (
				<button className="px-4 py-2 bg-blue-200 text-white rounded-md">
					Loading...
				</button>
			) : (
				<button
					onClick={handleSubmit}
					className="px-4 py-2 bg-blue-500 text-white rounded-md"
				>
					{!alreadyPurchasedState ? " Purchase Course" : "Already Purchased"}
				</button>
			)}
		</div>
	);
};

export default CourseDetails;
