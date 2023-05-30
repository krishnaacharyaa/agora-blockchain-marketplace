import React from "react";
import { useNavigate } from "react-router-dom";

const CourseTile = ({ isLoading, courses }) => {
	const navigate = useNavigate();

	const handleNavigate = (campaign) => {
		// navigate(`/campaign-details/${campaign.title}`, { state: campaign });
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
					<div>
						{course.title}
						{course.price.toString()}
					</div>
				))}
		</div>
	);
};

export default CourseTile;
