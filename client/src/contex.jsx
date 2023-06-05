import React, { useContext, createContext, useState, useEffect } from "react";

import {
	useAddress,
	useContract,
	useMetamask,
	useContractWrite,
} from "@thirdweb-dev/react";

import { ethers } from "ethers";
import { EditionMetadataWithOwnerOutputSchema } from "@thirdweb-dev/sdk";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
	const [isLoadingMain, setIsLoadingMain] = useState(false);

	const [currentAccount, setCurrentAccount] = useState("");
	const { contract } = useContract(
		"0x55797162a41Ee1369B89594218c65331394CE7b8"
		// "0x6D9885d0B30551b56E54381516aa2F490f038C9a"
		// "0x8D3595D14ffCBD604780a149c966aEd4b64CF9a1"
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
	const checkIfWalletIsConnect = async () => {
		try {
			if (!ethereum) return alert("Please install MetaMask.");

			const accounts = await ethereum.request({ method: "eth_accounts" });

			if (accounts.length) {
				setCurrentAccount(accounts[0]);
			} else {
				console.log("No accounts found");
			}
		} catch (error) {
			console.log(error);
		}
	};
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
			uniqueId: course.uniqueId,
		}));

		return parsedCampaings;
	};
	const getTrendingCourses = async () => {
		const courses = await contract.call("getTrendingCourses");
		// const {campaigns}= useContractRead(contract,"getCampaigns",[{{args}}]);

		const parsedCampaings = courses.map((course, i) => ({
			uniqueId: course.uniqueId,
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
		}));
		return parsedCampaings;
	};
	const isAlreadyPurchased = async (uniqueId) => {
		let data;
		try {
			console.log("uniqueId is" + uniqueId);
			data = await alreadyPurchased({ args: [uniqueId] });
		} catch (error) {
			console.log("Error" + error);
		}
		return data;
	};
	const buyCourse = async (uniqueId, amount) => {
		const data = await contract.call("purchaseCourse", [uniqueId], {
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
	const connectWallet = async () => {
		try {
			if (!ethereum) return alert("Please install MetaMask.");

			const accounts = await ethereum.request({
				method: "eth_requestAccounts",
			});

			setCurrentAccount(accounts[0]);
			window.location.reload();
		} catch (error) {
			console.log(error);

			throw new Error("No ethereum object");
		}
	};
	const getNumberOfPurchases = async () => {
		const numberOfPurchases = await contract.call("getNumberOfCourses", []);
		// const { data, isLoading } = useContractRead(
		// 	contract,
		// 	"getNumberOfCourses",
		// 	[]
		// );
		const parsedPurchases = [];
		for (let i = 0; i < numberOfPurchases[0].length; i++) {
			parsedPurchases.push({
				courseTitle: numberOfPurchases[0][i],
				purchases: numberOfPurchases[1][i],
			});
		}
		return parsedPurchases;
	};
	useEffect(() => {
		checkIfWalletIsConnect();
	}, []);
	return (
		<StateContext.Provider
			value={{
				address,
				contract,
				connect,
				publishCourse,
				getCourses,
				buyCourse,
				connectWallet,
				getTrendingCourses,
				isLoadingMain,
				isAlreadyPurchased,
				getNumberOfCourses,
				getNumberOfInstructors,
				getNumberOfStudents,
				currentAccount,
				getNumberOfPurchases,
			}}
		>
			{children}
		</StateContext.Provider>
	);
};

export const useStateContext = () => useContext(StateContext);
