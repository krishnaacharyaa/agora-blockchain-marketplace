import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

// import { Sidebar, Navbar } from "./components";
// import { CampaignDetails, CreateCampaign, Home, Profile } from "./pages";
// import Trending from "./components/Trending";

const App = () => {
	return (
		<div>
			<div className="text-yellow-500 text-5xl">Hello</div>
			<Routes>
				<Route path="/" element={<Home />} />
				{/* <Route path='/trending' element={<Trending/>}/>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} /> */}
			</Routes>
		</div>
	);
};

export default App;
