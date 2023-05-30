import React, { useEffect, useState } from "react";
import CourseTile from "../components/CourseTile";
import { useStateContext } from "../contex";
import { useNavigate } from "react-router-dom";
const Home = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [courses, setCourses] = useState([]);
	const navigate = useNavigate();
	const { address, contract, getCourses } = useStateContext();

	const fetchCourses = async () => {
		setIsLoading(true);
		const data = await getCourses();
		setCourses(data);
		setIsLoading(false);
	};

	useEffect(() => {
		if (contract) fetchCourses();
	}, [address, contract]);
	const handleSaveButton = () => {
		navigate("/add-course");
	};
	return (
		<div>
			<button className="border" onClick={handleSaveButton}>
				{" "}
				Add Course{" "}
			</button>
			<div>
				<CourseTile isLoading={isLoading} courses={courses} />
			</div>
		</div>
	);
};

export default Home;
