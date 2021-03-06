import axios from "axios";
import { CREATE_MEETING_CALLED, CREATE_MEETING_RETURNED } from "./types";

export const callCreate = (e, header, body, history, dashboard) => {
  e.preventDefault();

  const local = "http://localhost:8080";
  const server = process.env.REACT_APP_TOML_PRODUCTION_URL || local;

  const promise = axios.post(`${server}/api/meeting/create`, body, {
    headers: header
  });

  return function(dispatch) {
    dispatch({
      type: CREATE_MEETING_CALLED
    });
    promise
      .then(res => {
        dispatch({
          type: CREATE_MEETING_RETURNED,
          payload: res.data
        });
        if (dashboard === true) {
          history.push("/dashboard");
        } else {
          history.push(`/meeting/${res.data["_id"]}`);
        }
      })
  };
};
