import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
	const { image, name, price, rating, numReviews, _id } = product;
	return (
		<Card className="my-3 p-3 rounded">
			<Link to={`/product/${_id}`}>
				<Card.Img src={image} alt={name} />
			</Link>
			<Card.Body>
				<Link to={`/product/${_id}`} className="link">
					<Card.Title as="div">
						<strong>{name}</strong>
					</Card.Title>
				</Link>
				<Card.Text as="div">
					<div className="my-3">
						<Rating
							value={rating}
							text={`${numReviews} Reviews`}
							color={"#f8e825"}
						/>
					</div>
				</Card.Text>
				<Card.Text as="h3"> £{price}</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default Product;
