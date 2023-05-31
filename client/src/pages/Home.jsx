import React, { useEffect, useState } from "react";
import CourseTile from "../components/CourseTile";
import { useStateContext } from "../contex";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import HighlightTile from "../components/HighlightTile";
const Home = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [courses, setCourses] = useState([]);
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
	} = useStateContext();

	const fetchCourses = async () => {
		setIsLoading(true);
		const data = await getCourses();
		setCourses(data);
		const otherData = await getTrendingCourses();
		setTrendingCourses(otherData);
		let number = await getNumberOfCourses();
		setOfNumberOfCourses(number);
		number = await getNumberOfInstructors();
		setNumberOfInstructors(number);
		number = await getNumberOfStudents();
		setNumberOfStudents(number);

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
			{/* <div>{numberOfCourses.toString()}</div>
			<div>{numberOfInstructors.toString()}</div>
			<div>{numberOfStudents.toString()}</div> */}
			<div className="flex justify-between items-center mb-16">
				<div className="text-white text-4xl">Agora</div>
				<button
					className="text-white bg-pink-500 text-xl p-4 rounded-lg "
					onClick={handleSaveButton}
				>
					Add Course
				</button>
			</div>
			<div className="flex justify-between items-center">
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
			<div className="text-white text-3xl text-center">Highlights</div>
			<div className=" flex justify-center items-center gap-24 px-64 mt-8">
				{/* <HighlightTile name={"COURSES"} number={numberOfCourses.toString()} />
				<HighlightTile name={"STUDENTS"} number={numberOfStudents.toString()} />
				<HighlightTile
					name={"TUTORS"}
					number={numberOfInstructors.toString()} */}

				<HighlightTile name={"COURSES"} number={40} />
				<HighlightTile name={"STUDENTS"} number={24} />
				<HighlightTile name={"TUTORS"} number={18} />
			</div>
			<div className="text-white text-3xl mt-8">Trending Courses</div>

			<div>
				<CourseTile
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
