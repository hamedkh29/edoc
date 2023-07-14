import { combineReducers } from "redux";
import { isLoading } from "./interactions";
import documents from "./documents/reducer";
const reducers = combineReducers({
  documents,
  isLoading,
});

export default reducers;
