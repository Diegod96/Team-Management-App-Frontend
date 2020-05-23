import axios from "axios";
import {
  GET_ERRORS,
  GET_BOATS,
  DELETE_BOAT,
  GET_BOAT
} from "./types";

export const addBoat = (boat, history) => async dispatch => {
  try {
    await axios.post("http://localhost:8080/api/board", boat);
    history.push("/");
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const getBacklog = () => async dispatch => {
  const res = await axios.get("http://localhost:8080/api/board/all");
  dispatch({
    type: GET_BOATS,
    payload: res.data
  });
};

export const deleteBoat = boat_id => async dispatch => {
  if (
    window.confirm(
      `You are deleting boat ${boat_id}, this action cannot be undone`
    )
  ) {
    await axios.delete(`http://localhost:8080/api/board/${boat_id}`);
    dispatch({
      type: DELETE_BOAT,
      payload: boat_id
    });
  }
};

export const getBoat = (boat_id, history) => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:8080/api/board/${boat_id}`);
    dispatch({
      type: GET_BOAT,
      payload: res.data
    });
  } catch (error) {
    history.push("/");
  }
};
