import React, { useEffect, useState } from "react";
import CourseTile from "../components/CourseTile";
import { useStateContext } from "../contex";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
const Home = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [courses, setCourses] = useState([]);
	const navigate = useNavigate();
	const { address, contract, getCourses, getNumberOfCourses } =
		useStateContext();

	const fetchCourses = async () => {
		setIsLoading(true);
		const data = await getCourses();

		setCourses(data);
		setIsLoading(false);
	};
	const fetchNumberOfCourses = async () => {
		const data1 = await getNumberOfCourses();
	};

	useEffect(() => {
		if (contract) fetchCourses();
		// fetchNumberOfCourses()
	}, [address, contract]);
	const handleSaveButton = () => {
		navigate("/add-course");
	};
	return (
		<div className="p-8 px-20">
			<div className="flex justify-between items-center mb-20">
				<div className="text-white text-4xl">Agora</div>
				<button
					className="text-white bg-blue-500 text-xl p-4 rounded-lg "
					onClick={handleSaveButton}
				>
					Add Course
				</button>
			</div>
			<div className="flex justify-between items-center">
				<div className="text-white text-5xl w-1/2">
					Secure MarketPlace to trade courses using Ethereum and Blockchain
				</div>
				{/* <div className="bg-[url('https://nft-tailwind.preview.uideck.com/src/images/hero/hero-image.svg')]"></div> */}
				<img
					height={40}
					src="https://nft-tailwind.preview.uideck.com/src/images/hero/hero-image.svg"
					alt=""
				/>
			</div>

			<div className="text-white text-3xl">Courses</div>

			<div>
				<CourseTile key={uuidv4()} isLoading={isLoading} courses={courses} />
			</div>
		</div>
	);
};

export default Home;
