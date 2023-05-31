import { ethers } from "ethers";
import React from "react";
import { useNavigate } from "react-router-dom";

const CourseTile = ({ isLoading, courses }) => {
	const navigate = useNavigate();

	const handleNavigate = (course) => {
		navigate(`/course-details`, { state: course });
	};

	return (
		<div className="flex mt-12 gap-6 hover:cursor-pointer">
			{!isLoading && courses.length === 0 && (
				<p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
					No courses to show
				</p>
			)}
			{!isLoading &&
				courses.length > 0 &&
				courses.map((course) => (
					<div
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
							<div className="text-gray-400">{course.category}</div>
							<div className="flex justify-between mt-2">
								<div className="font-thin text-sm mb-3">
									By {course.creadtedBy}
								</div>
								<div>{ethers.utils.formatUnits(course.price, 18)} ether</div>
							</div>
						</div>
					</div>
				))}
		</div>
	);
};

export default CourseTile;
