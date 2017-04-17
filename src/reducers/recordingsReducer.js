import {
  FETCH_RECORDINGS,
  FETCHING_RECORDINGS,
  TOGGLE_CONFIRM_LOGOUT
} from '../actions/types';

const INITIAL_STATE = {
  data: [],
  isFetching: false,
  showHelp: false,
  confirmLogout: false
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_RECORDINGS:
      return { ...state, data: action.payload, isFetching: false };
    case FETCHING_RECORDINGS:
      return { ...state, isFetching: true };
    case TOGGLE_CONFIRM_LOGOUT:
      return { ...state, confirmLogout: !state.confirmLogout };
    default:
      return state;
  }
}
