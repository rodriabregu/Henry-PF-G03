import { createStore, applyMiddleware } from "redux"; 
import rootReducer from "./Reducers";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "thunks";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
