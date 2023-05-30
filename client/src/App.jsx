import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddCourse from "./pages/AddCourse";
import CourseDetails from "./pages/CourseDetails";

const App = () => {
	return (
		<div className="min-h-screen gradient-bg-welcome">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/add-course" element={<AddCourse />} />
				<Route path="/course-details" element={<CourseDetails />} />

				{/* <Route path='/trending' element={<Trending/>}/>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} /> */}
			</Routes>
		</div>
	);
};

export default App;
