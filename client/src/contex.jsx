import React, { useContext, createContext, useState } from "react";

import {
	useAddress,
	useContract,
	useMetamask,
	useContractRead,
	useContractWrite,
} from "@thirdweb-dev/react";

import { ethers } from "ethers";
import { EditionMetadataWithOwnerOutputSchema } from "@thirdweb-dev/sdk";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
	const [isLoadingMain, setIsLoadingMain] = useState(false);
	const { contract } = useContract(
		"0x5637A85dA11b660Fdc2081A072fcF41FE443cc5A"
	);
	const { mutateAsync: createCourse } = useContractWrite(
		contract,
		"createCourse"
	);

	const address = useAddress();
	const connect = useMetamask();

	const publishCourse = async ({
		name,
		title,
		description,
		price,
		image,
		language,
		category,
		level,
		certificate,
	}) => {
		var today = new Date();

		// Get the day, month, and year
		var day = today.getDate();
		var month = today.toLocaleString("default", { month: "long" });
		var year = today.getFullYear();

		// Format the date string
		var formattedDate = day + " " + month + " " + year;
		try {
			setIsLoadingMain(true);
			const data = await createCourse({
				args: [
					address, // owner
					title,
					description,
					ethers.utils.parseUnits(price, 18),
					image,
					formattedDate,
					name,
					level,
					category,
					language,
					certificate,
				],
			});

			setIsLoadingMain(false);

			console.log("contract call success", data);
		} catch (error) {
			console.log("contract call failure", error);
		}
	};

	const getCourses = async () => {
		const courses = await contract.call("getCourses");
		// const {campaigns}= useContractRead(contract,"getCampaigns",[{{args}}]);

		const parsedCampaings = courses.map((course, i) => ({
			owner: course.owner,
			title: course.title,
			description: course.description,
			price: course.price,
			image: course.image,
			pId: i,
		}));

		return parsedCampaings;
	};
	const getTrendingCourses = async () => {
		const courses = await contract.call("getTrendingCourses");
		// const {campaigns}= useContractRead(contract,"getCampaigns",[{{args}}]);

		const parsedCampaings = courses.map((course, i) => ({
			owner: course.owner,
			title: course.title,
			description: course.description,
			price: course.price,
			image: campaign.image,
			pId: i,
		}));

		return parsedCampaings;
	};

	const buyCourse = async (pId, amount) => {
		const data = await contract.call("purchaseCourse", [pId], {
			value: ethers.utils.parseEther(amount),
		});
		return data;
	};

	return (
		<StateContext.Provider
			value={{
				address,
				contract,
				connect,
				publishCourse,
				getCourses,
				buyCourse,
				getTrendingCourses,
				isLoadingMain,
			}}
		>
			{children}
		</StateContext.Provider>
	);
};

export const useStateContext = () => useContext(StateContext);
