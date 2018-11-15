import axios from "axios";
import { REG_CALLED, REG_RETURNED } from "./types";
// import history from "../history";

export const callReg = (e, credentials, history) => {
  e.preventDefault();

  const promise = axios.post(
    "https://teamcomm2.herokuapp.com/api/users/register",
    credentials,
  );

  return function(dispatch) {
    dispatch({
      type: REG_CALLED
    });
    promise
      .then(res => {
        dispatch({
          type: REG_RETURNED,
          payload: res.data
        });
        localStorage.setItem("jwt", res.data.token);
        console.log("hist", history);
        history.push("/dashboard");
      })
      .catch(err =>
        console.log({
          "Axios-Error": err
        })
      );
  };
};
