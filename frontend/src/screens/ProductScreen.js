import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
	Row,
	Col,
	ListGroup,
	Button,
	Image,
	Card,
	Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = ({ match, history }) => {
	const [qty, setQty] = useState(0);
	const dispatch = useDispatch();
	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;
	const {
		image,
		name,
		brand,
		description,
		rating,
		price,
		countInStock,
		numReviews,
	} = product;

	useEffect(() => {
		dispatch(listProductDetails(match.params.id));
	}, [dispatch, match]);

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${qty}`);
	};

	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Row className="pt-5">
					<Col md={6}>
						<Image src={image} alt={name} fluid />
					</Col>
					<Col md={3}>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h3>{name}</h3>
							</ListGroup.Item>

							<ListGroup.Item>Brand: {brand}</ListGroup.Item>
							<ListGroup.Item>
								Description: <br /> {description}
							</ListGroup.Item>

							<ListGroup.Item>
								<Rating
									value={rating}
									text={`${numReviews} Reviews`}
									color={"#f8e825"}
								/>
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={3}>
						<Card>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<Row>
										<Col>Price:</Col>
										<Col>
											<strong>£{price}</strong>
										</Col>
									</Row>
								</ListGroup.Item>

								<ListGroup.Item>
									<Row>
										<Col>Status:</Col>
										<Col>{countInStock > 0 ? `In Stock` : "Out Of Stock"}</Col>
									</Row>
								</ListGroup.Item>
								{countInStock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>Qty:</Col>
											<Col>
												<Form.Control
													as="select"
													className="form-select"
													value={qty}
													onChange={(e) => setQty(e.target.value)}>
													{[...Array(countInStock).keys()].map((x) => {
														return (
															<option key={x + 1} value={x + 1}>
																{x + 1}
															</option>
														);
													})}
												</Form.Control>
											</Col>
										</Row>
									</ListGroup.Item>
								)}
								<ListGroup.Item>
									<Row className="px-2">
										<Button
											onClick={addToCartHandler}
											className="btn btn-dark"
											type="button"
											disabled={countInStock === 0}>
											Add to Cart
										</Button>
									</Row>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
			<Row className="pt-5">
				<Col>
					<Link to="/" className="btn btn-outline-primary">
						Back
					</Link>
				</Col>
			</Row>
		</Fragment>
	);
};

export default ProductScreen;
