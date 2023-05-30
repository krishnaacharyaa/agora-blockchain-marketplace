import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useStateContext } from "../contex";
import CountBox from "../components/CountBox";

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
	// const alreadyPurchased = async () => {
	// 	const data = await isAlreadyPurchased(state.pId);
	// 	setAlreadyPurchasedState(data);
	// };
	useEffect(() => {
		window.scrollTo(0, 0);
		// alreadyPurchased();
	}, []);

	const [isLoading, setIsLoading] = useState(false);
	return (
		<div className="p-16 px-32 text-white">
			<div className="flex gap-10">
				<img src={state.image} className="flex-1 h-[500px] rounded-3xl"></img>
				<div className="flex flex-col justify-around">
					<CountBox title="level" value={state.level} />
					<CountBox title="language" value={state.language} />
					<CountBox title="category" value={state.category} />
				</div>
			</div>
			{/* <div className="text-3xl font-bold mt-8">TITLE</div> */}
			{/* <div className="flex items-end">
				<div className="text-5xl mt-4">{state.title}</div>
				<div className="text-2xl mt-4 mx-8">by {state.creadtedBy}</div>
			</div> */}

			<div className="text-xl font-bold mt-8">TITLE</div>
			<div className="text-2xl mt-4 text-gray-500">{state.title}</div>

			<div className="text-xl font-bold mt-8">DESCRIPTION</div>
			<div className="text-2xl mt-4 text-gray-500">{state.description}</div>

			<div className="text-xl font-bold mt-8">PRICE</div>
			<div className="text-2xl mt-4 text-gray-500">
				{ethers.utils.formatUnits(state.price, 18)} Ether
			</div>
			{/* 
			<div></div>
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
			<div>{state.certificate}</div> */}
			<div className="mt-8">
				{isLoading ? (
					<button className="p-4 bg-gray-400 text-white rounded-md">
						Loading..
					</button>
				) : (
					<button
						onClick={handleSubmit}
						className="p-4 bg-pink-500 text-xl rounded-md"
					>
						{!alreadyPurchasedState ? " Purchase Course" : "Already Purchased"}
					</button>
				)}
			</div>
		</div>
	);
};

export default CourseDetails;
