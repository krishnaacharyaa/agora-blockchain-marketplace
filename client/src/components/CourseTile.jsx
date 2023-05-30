import { ethers } from "ethers";
import React from "react";
import { useNavigate } from "react-router-dom";

const CourseTile = ({ isLoading, courses }) => {
	const navigate = useNavigate();

	const handleNavigate = (course) => {
		navigate(`/course-details`, { state: course });
	};

	return (
		<div className="flex mt-12 gap-3">
			{!isLoading && courses.length === 0 && (
				<p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
					You have not created any campigns yet
				</p>
			)}
			{!isLoading &&
				courses.length > 0 &&
				courses.map((course) => (
					<div
						className="white-glassmorphism h-80 w-80 text-white "
						onClick={() => handleNavigate(course)}
					>
						<img
							className="p-4 rounded-lg"
							src={course.image}
							height={70}
							alt="Hello"
						/>
						<div className="text-2xl font-bold">{course.title}</div>
						<div className="">{course.category}</div>
						<div className="flex justify-between">
							<div className="text-xl ">By {course.creadtedBy}</div>
							<div>{ethers.utils.formatUnits(course.price, 18)} ether</div>
						</div>
					</div>
				))}
		</div>
	);
};

export default CourseTile;
