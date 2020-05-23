import {
  GET_BOATS,
  DELETE_BOAT,
  GET_BOAT
} from "../actions/types";

const initialState = {
  boats: [],
  boat: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BOATS:
      return {
        ...state,
        boats: action.payload
      };

    case GET_BOAT:
      return {
        ...state,
        boat: action.payload
      };

    case DELETE_BOAT:
      return {
        ...state,
        boats: state.boats.filter(
          boat => boat.id !== action.payload
        )
      };
    default:
      return state;
  }
}
