import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import CircularProgress from "./Loader";
import { useStateContext } from "../contex";

import { v4 as uuidv4 } from "uuid";
const CourseTrendingTile = ({ isLoading, courses }) => {
	const navigate = useNavigate();
	const [coursePurchases, setCoursePurchases] = useState([]);
	const handleNavigate = (course) => {
		navigate(`/course-details`, { state: course });
	};
	const { getNumberOfPurchases } = useStateContext();
	const fetchNumberOfCourses = async () => {
		const data = await getNumberOfPurchases();
		console.log(data);
		setCoursePurchases(data);
	};
	useEffect(() => {
		fetchNumberOfCourses();
	}, []);
	const getValueByIndex1 = (value) => {
		const foundObject = coursePurchases.find(
			(obj) => obj.courseNumber.toString() === value.toString()
		);
		return foundObject ? foundObject.purchases.toString() : undefined;
	};
	return (
		<div className="flex mt-12 gap-6 hover:cursor-pointer flex-wrap">
			{coursePurchases.length > 0 &&
				coursePurchases.map((item, index) => (
					<div className="flex text-white bg-green-400">
						<div>{item.courseNumber.toString()}</div>
						<div className="bg-red-500">{item.purchases.toString()}</div>
					</div>
				))}
			{/* {(isLoading || !isLoading) && courses.length === 0 && < />} */}
			{/* {!isLoading && courses.length === 0 && (
				<p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
					No courses to show
				</p>
			)} */}
			{!isLoading && courses.length > 0 ? (
				courses.slice(0, 4).map((course) => (
					<div
						key={uuidv4()}
						className="white-glassmorphism h-110 w-80 text-white "
						onClick={() => handleNavigate(course)}
					>
						<img
							className="p-4 rounded-lg min-h-[240px]"
							src={course.image}
							// height={70}
							alt="Hello"
						/>
						<div className="px-4">
							<div className="text-xl font-bold  max-w-full truncate">
								{course.title}
							</div>
							<div>{getValueByIndex1(course.pId)}</div>
							<div className="text-gray-400">{course.category}</div>
							<div className="flex justify-between mt-2">
								<div className="font-thin text-sm mb-3">
									By {course.creadtedBy}
								</div>
								<div>{ethers.utils.formatUnits(course.price, 18)} ether</div>
							</div>
						</div>
					</div>
				))
			) : (
				<div className="h-52 flex justify-center items-center w-full">
					<ColorRing
						colors={["#78007C", "#78007C", "#78007C", "#78007C", "#78007C"]}
					/>
				</div>
			)}
		</div>
	);
};

export default CourseTrendingTile;
