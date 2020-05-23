import { combineReducers } from "redux";
import errorsReducer from "./errorsReducer";
import boatReducer from "./boatReducer";

export default combineReducers({
  //
  errors: errorsReducer,
  boat: boatReducer,
});
