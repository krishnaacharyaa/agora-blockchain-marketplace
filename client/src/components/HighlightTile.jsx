import React from "react";

const HighlightTile = ({ name, number }) => {
	return (
		<div>
			<div className="white-glass h-40 min-w-[200px] flex flex-col text-white  p-10">
				<div className="text text-gray-300 mb-4 text-center">{name}</div>
				<div className="text-4xl text-center items-center justify-center flex">
					<div>{number}</div>
					<div className="ml-1">+</div>
				</div>
			</div>
		</div>
	);
};

export default HighlightTile;
