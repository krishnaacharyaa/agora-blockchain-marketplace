import React, { useState } from "react";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contex";

const AddCourse = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const { publishCourse, isLoadingMain } = useStateContext();
	const levels = ["easy", "medium", "hard"];
	const categories = [
		"Web Development",
		"Mobile Development",
		"Blockchain Development",
	];
	const languages = ["English", "Hindi", "Dutch"];
	const [level, setLevel] = useState("");
	const [category, setCategory] = useState("");
	const [language, setLanguage] = useState("");
	const [certificate, setCertificate] = useState(true);
	const [name, setName] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState();
	const [image, setImage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Validate form fields
		if (
			level === "" ||
			category === "" ||
			language === "" ||
			name === "" ||
			title === "" ||
			description === "" ||
			price === null ||
			image === ""
		) {
			console.log("I am here");
			toast.error("Please fill in all fields");
			return;
		}
		setIsLoading(true);
		await publishCourse({
			name,
			title,
			description,
			price,
			image,
			language,
			category,
			level,
			certificate,
		});
		setIsLoading(false);
		navigate("/");
	};
	// return <div className="text-3xl">Hello</div>;
	return (
		<div className="container mx-auto p-4">
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label htmlFor="level" className="block font-medium mb-1">
						Level
					</label>
					<select
						id="level"
						className="block w-full p-2 border border-gray-300 rounded-md"
						value={level}
						onChange={(e) => setLevel(e.target.value)}
					>
						<option value="">Select level</option>
						{levels.map((levelOption) => (
							<option key={levelOption} value={levelOption}>
								{levelOption}
							</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor="category" className="block font-medium mb-1">
						Category
					</label>
					<select
						id="category"
						className="block w-full p-2 border border-gray-300 rounded-md"
						value={category}
						onChange={(e) => setCategory(e.target.value)}
					>
						<option value="">Select category</option>
						{categories.map((categoryOption) => (
							<option key={categoryOption} value={categoryOption}>
								{categoryOption}
							</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor="language" className="block font-medium mb-1">
						Language
					</label>
					<select
						id="language"
						className="block w-full p-2 border border-gray-300 rounded-md"
						value={language}
						onChange={(e) => setLanguage(e.target.value)}
					>
						<option value="">Select language</option>
						{languages.map((languageOption) => (
							<option key={languageOption} value={languageOption}>
								{languageOption}
							</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor="certificate" className="block font-medium mb-1">
						Certificate
					</label>
					<input
						id="certificate"
						type="checkbox"
						className="form-checkbox"
						checked={certificate}
						onChange={(e) => setCertificate(e.target.checked)}
					/>
				</div>
				<div>
					<label htmlFor="name" className="block font-medium mb-1">
						Name
					</label>
					<input
						id="name"
						type="text"
						className="block w-full p-2 border border-gray-300 rounded-md"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="title" className="block font-medium mb-1">
						Title
					</label>
					<input
						id="title"
						type="text"
						className="block w-full p-2 border border-gray-300 rounded-md"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="description" className="block font-medium mb-1">
						Description
					</label>
					<textarea
						id="description"
						className="block w-full p-2 border border-gray-300 rounded-md"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="price" className="block font-medium mb-1">
						Price
					</label>
					<input
						id="price"
						type="number"
						className="block w-full p-2 border border-gray-300 rounded-md"
						value={price || ""}
						onChange={(e) => setPrice(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="image" className="block font-medium mb-1">
						Image
					</label>
					<input
						id="image"
						type="text"
						className="block w-full p-2 border border-gray-300 rounded-md"
						value={image}
						onChange={(e) => setImage(e.target.value)}
					/>
				</div>
				{isLoadingMain ? (
					<button className="px-4 py-2 bg-blue-200 text-white rounded-md">
						Loading...
					</button>
				) : (
					<button
						type="submit"
						className="px-4 py-2 bg-blue-500 text-white rounded-md"
					>
						Submit
					</button>
				)}
			</form>
			<ToastContainer />
		</div>
	);
};

export default AddCourse;
