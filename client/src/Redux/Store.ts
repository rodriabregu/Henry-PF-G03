import { createStore, applyMiddleware } from "redux"; 
import getProductReducer from "./Reducers/Reducers";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "thunks";

const store = createStore(
    getProductReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
