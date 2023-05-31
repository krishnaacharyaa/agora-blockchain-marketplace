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
	const { mutateAsync: alreadyPurchased, isLoading } = useContractWrite(
		contract,
		"alreadyPurchased"
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
			createdOn: course.createdOn,
			creadtedBy: course.createdBy,
			level: course.level,
			language: course.language,
			category: course.category,
			certificate: course.certificate,
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
			image: course.image,
			createdOn: course.createdOn,
			creadtedBy: course.createdBy,
			level: course.level,
			language: course.language,
			category: course.category,
			certificate: course.certificate,
			pId: i,
		}));
		return parsedCampaings;
	};
	const isAlreadyPurchased = async (pId) => {
		let data;
		try {
			console.log("pid is" + pId);
			data = await alreadyPurchased({ args: [pId] });
		} catch (error) {
			console.log("Error" + error);
		}
		return data;
	};
	const buyCourse = async (pId, amount) => {
		const data = await contract.call("purchaseCourse", [pId], {
			value: ethers.utils.parseEther(amount),
		});
		return data;
	};
	const getNumberOfCourses = async () => {
		const courses = await contract.call("numberOfCourses");
		return courses;
	};
	const getNumberOfInstructors = async () => {
		const instructors = await contract.call("numberOfInstructors");
		return instructors;
	};
	const getNumberOfStudents = async () => {
		const students = await contract.call("numberOfStudents");
		return students;
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
				isAlreadyPurchased,
				getNumberOfCourses,
				getNumberOfInstructors,
				getNumberOfStudents,
			}}
		>
			{children}
		</StateContext.Provider>
	);
};

export const useStateContext = () => useContext(StateContext);
