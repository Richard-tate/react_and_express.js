import React from "react";

const Rating = ({ value, text, color }) => {
	const tempRating = Array.from({ length: 5 }, (_, index) => {
		const number = index + 0.5;

		return (
			<span key={index}>
				<i
					style={{ color }}
					className={
						value >= index + 1
							? "fas fa-star"
							: value >= number
							? "fas fa-star-half-alt"
							: "far fa-star"
					}></i>
			</span>
		);
	});

	return (
		<div className="rating">
			{tempRating}

			<span className="ps-3 ps-md-2" style={{ fontSize: "14px" }}>
				{text && text}
			</span>
		</div>
	);
};

export default Rating;
