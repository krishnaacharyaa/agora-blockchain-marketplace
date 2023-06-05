import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import CircularProgress from "./Loader";
import { useStateContext } from "../contex";
import payment from "../../assets/payment.svg";

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
			(obj) => obj.uniqueId.toString() === value.toString()
		);
		return foundObject ? foundObject.purchases.toString() : undefined;
	};
	return (
		<div className="flex mt-12 gap-6 hover:cursor-pointer flex-wrap">
			{/* {coursePurchases.length > 0 &&
				coursePurchases.map((item, index) => (
					<div className="flex text-white bg-green-400">
						<div>{item.courseTitle.toString()}</div>
						<div className="bg-red-500">{item.purchases.toString()}</div>
					</div>
				))} */}
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
							<div className="flex justify-between  items-center">
								<div className="text-xl font-bold  max-w-full truncate">
									{course.title}
								</div>
								<div className="flex gap-2   items-center">
									<svg
										className="text-pink-600 "
										width="20"
										height="20"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M18.1111 8.14286V5.57143C18.1111 4.88944 17.8536 4.23539 17.3951 3.75315C16.9367 3.27092 16.315 3 15.6667 3H3.44444C2.79614 3 2.17438 3.27092 1.71596 3.75315C1.25754 4.23539 1 4.88944 1 5.57143V13.2857C1 13.9677 1.25754 14.6218 1.71596 15.104C2.17438 15.5862 2.79614 15.8571 3.44444 15.8571H5.88889M8.33333 21H20.5556C21.2039 21 21.8256 20.7291 22.284 20.2468C22.7425 19.7646 23 19.1106 23 18.4286V10.7143C23 10.0323 22.7425 9.37825 22.284 8.89601C21.8256 8.41377 21.2039 8.14286 20.5556 8.14286H8.33333C7.68503 8.14286 7.06327 8.41377 6.60485 8.89601C6.14643 9.37825 5.88889 10.0323 5.88889 10.7143V18.4286C5.88889 19.1106 6.14643 19.7646 6.60485 20.2468C7.06327 20.7291 7.68503 21 8.33333 21ZM16.8889 14.5714C16.8889 15.2534 16.6313 15.9075 16.1729 16.3897C15.7145 16.8719 15.0928 17.1429 14.4444 17.1429C13.7961 17.1429 13.1744 16.8719 12.716 16.3897C12.2575 15.9075 12 15.2534 12 14.5714C12 13.8894 12.2575 13.2354 12.716 12.7532C13.1744 12.2709 13.7961 12 14.4444 12C15.0928 12 15.7145 12.2709 16.1729 12.7532C16.6313 13.2354 16.8889 13.8894 16.8889 14.5714Z"
											stroke="#1DC071"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>

									{getValueByIndex1(course.uniqueId)}
								</div>
							</div>
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
