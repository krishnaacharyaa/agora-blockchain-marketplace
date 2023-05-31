import React from "react";

const CircularProgress = () => {
	return (
		<div className="w-24 h-24 bg-white">
			<div className="relative">
				<div className="w-full h-full bg-gradient-to-r from-pink to-blue rounded-full"></div>
				<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-pink to-blue rounded-full clip-auto"></div>
				<div className="absolute top-0 left-0 w-full h-full bg-white rounded-full clip-auto"></div>
			</div>
		</div>
	);
};

export default CircularProgress;
