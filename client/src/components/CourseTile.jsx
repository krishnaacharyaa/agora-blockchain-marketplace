import React from "react";
import { useNavigate } from "react-router-dom";

const CourseTile = ({ isLoading, courses }) => {
	const navigate = useNavigate();

	const handleNavigate = (course) => {
		navigate(`/course-details`, { state: course });
	};
	return (
		<div>
			{!isLoading && courses.length === 0 && (
				<p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
					You have not created any campigns yet
				</p>
			)}
			{!isLoading &&
				courses.length > 0 &&
				courses.map((course) => (
					<div
						className="p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] "
						onClick={() => handleNavigate(course)}
					>
						{course.title}
						{course.price.toString()}
					</div>
				))}
		</div>
	);
};

export default CourseTile;
