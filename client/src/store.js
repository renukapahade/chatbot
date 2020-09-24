//Import dependencies
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import combineReducers from './reducers';

//Connect the app to redux devtools
import { composeWithDevTools } from "redux-devtools-extension";

//Setup initial state
const initialState = {};

//Import the middleware
const middleware = [thunk]

//Setup store
const store = createStore(
    combineReducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

//Export store
export default store;