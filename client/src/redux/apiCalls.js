import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest } from "../requestMethods";
import axios from "axios";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", user);
    dispatch(loginSuccess(res.data));

    return true;
  } catch (err) {
    dispatch(loginFailure());
  }
};

// export const fetching = async (dispatch, user) => {
//   dispatch(loginStart());
//   try {
//     const res = await axios.get("http://localhost:5000/api/auth/userdata", user);
//     dispatch(fetchUser(res.data));
//   } catch (err) {
//     dispatch(fetchUser(null));
//   }
// };
