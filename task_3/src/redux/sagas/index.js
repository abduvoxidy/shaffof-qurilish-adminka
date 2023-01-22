import { takeEvery, put, call } from "redux-saga/effects";
import { REQUEST_POSTS, FETCH_USERS } from "../constants";
import { fetchUsers } from "../../services/users";

export function* sagaWatcher() {
  yield takeEvery(REQUEST_POSTS, sagaWorker);
}

function* sagaWorker(action) {
  try {
    const payload = yield call(fetchUsers, action.payload);
    yield put({ type: FETCH_USERS, payload: payload.data });
  } catch (e) {
    console.log("e", e);
  }
}
