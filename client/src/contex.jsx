import React, { useContext, createContext } from "react";

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
	const { contract } = useContract(
		"0x7f157737c52BfB2C6326e6Ee1EeC66077B6457e4"
	);
	const { mutateAsync: createCourse } = useContractWrite(
		contract,
		"createCourse"
	);

	const address = useAddress();
	const connect = useMetamask();

	const publishCourse = async (form) => {
		try {
			const data = await createCourse({
				args: [
					address, // owner
					form.title, // title
					form.description, // description
					form.price,
					form.image,
				],
			});

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
			}}
		>
			{children}
		</StateContext.Provider>
	);
};

export const useStateContext = () => useContext(StateContext);
