import React, { useEffect, useState } from "react";
import CourseTile from "../components/CourseTile";
import { useStateContext } from "../contex";
import {
	ThirdwebProvider,
	ConnectWallet,
	metamaskWallet,
} from "@thirdweb-dev/react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import HighlightTile from "../components/HighlightTile";
import { ColorRing } from "react-loader-spinner";
import CourseTrendingTile from "../components/CourseTrendingTile";
const Home = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [courses, setCourses] = useState([]);
	const [highlightLoading, setHighlightLoading] = useState(true);
	const [trendingCourses, setTrendingCourses] = useState([]);
	const [numberOfCourses, setOfNumberOfCourses] = useState("");
	const [numberOfStudents, setNumberOfStudents] = useState("");
	const [numberOfInstructors, setNumberOfInstructors] = useState("");
	const navigate = useNavigate();
	const {
		address,
		contract,
		getCourses,
		getTrendingCourses,
		getNumberOfCourses,
		getNumberOfInstructors,
		getNumberOfStudents,
		currentAccount,
		connectWallet,
	} = useStateContext();

	const fetchCourses = async () => {
		setIsLoading(true);
		const data = await getCourses();
		setCourses(data);
		const otherData = await getTrendingCourses();
		setTrendingCourses(otherData);
		setHighlightLoading(true);
		let number = await getNumberOfCourses();
		setOfNumberOfCourses(number);
		number = await getNumberOfInstructors();
		setNumberOfInstructors(number);
		number = await getNumberOfStudents();
		setNumberOfStudents(number);
		setHighlightLoading(false);
		setIsLoading(false);
	};
	const fetchNumberOfCourses = async () => {
		const data1 = await getNumberOfCourses();
	};

	useEffect(() => {
		if (contract) fetchCourses();
		window.scrollTo(0, 0);
		// fetchNumberOfCourses()
	}, [address, contract]);
	const handleSaveButton = () => {
		navigate("/add-course");
	};
	return (
		<div className="p-8 ">
			{/* <div>{numberOfCourses.toString()}</div>
			<div>{numberOfInstructors.toString()}</div>
			<div>{numberOfStudents.toString()}</div> */}
			<div className="flex justify-between items-center mb-16 px-20">
				<div className="text-white text-4xl">Agora</div>
				<div className="">
					<div className="flex gap-5 items-center justify-center">
						{/* {currentAccount == "" ? (
							<button
								onClick={connectWallet}
								className="text-pink-400 border  border-pink-500 text-xl p-3 rounded-lg "
							>
								Connect Wallet
							</button>
						) : ( */}
						{currentAccount && (
							<button
								className="text-white bg-pink-500 text-xl p-3 rounded-lg "
								onClick={handleSaveButton}
							>
								Add Course
							</button>
						)}
						{/* )} */}
						<ConnectWallet className="p-4" />
					</div>
				</div>
			</div>
			<div className="flex justify-between items-center px-20">
				<div className="text-white text-5xl w-1/2 leading-relaxed ">
					Secure MarketPlace to trade courses using Ethereum and Blockchain
				</div>
				{/* <div className="bg-[url('https://nft-tailwind.preview.uideck.com/src/images/hero/hero-image.svg')]"></div> */}
				<img
					height={40}
					src="https://nft-tailwind.preview.uideck.com/src/images/hero/hero-image.svg"
					alt=""
				/>
			</div>
			<div className="text-white text-3xl text-center mt-4">Highlights</div>
			{!highlightLoading ? (
				<div className=" flex justify-center items-center gap-24 px-64 mt-8">
					<HighlightTile name={"COURSES"} number={numberOfCourses.toString()} />
					<HighlightTile
						name={"STUDENTS"}
						number={numberOfStudents.toString()}
					/>
					<HighlightTile
						name={"TUTORS"}
						number={numberOfInstructors.toString()}
					/>
				</div>
			) : (
				<div className="flex w-full justify-center h-40 items-center">
					<ColorRing
						colors={["#78007C", "#78007C", "#78007C", "#78007C", "#78007C"]}
					/>
				</div>
			)}
			<div className="text-white text-3xl mt-8 ">Trending Courses</div>

			<div>
				<CourseTrendingTile
					key={uuidv4()}
					isLoading={isLoading}
					courses={trendingCourses}
				/>
			</div>
			<div className="text-white text-3xl mt-10">Courses</div>

			<div>
				<CourseTile key={uuidv4()} isLoading={isLoading} courses={courses} />
			</div>
		</div>
	);
};

export default Home;
