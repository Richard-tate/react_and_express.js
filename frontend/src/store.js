import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { productDeatailsReducer, productListReducer } from "./reducers/productReducers";

const reducer = combineReducers({
    productList : productListReducer,
    productDetails : productDeatailsReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));


export default store;