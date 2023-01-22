import { REQUEST_POSTS } from "../constants";

export function fetchUsersAction(params) {
  return {
    type: REQUEST_POSTS,
    payload: params,
  };
}
