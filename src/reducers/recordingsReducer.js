import {
  FETCH_RECORDINGS,
  FETCHING_RECORDINGS,
  FETCH_ERROR,
  TOGGLE_CONFIRM_LOGOUT
} from '../actions/types';

const INITIAL_STATE = {
  data: [],
  isFetching: false,
  showHelp: false,
  confirmLogout: false,
  errorMessage: ''
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_RECORDINGS:
      return { ...state, data: action.payload, isFetching: false, errroMessage: '' };
    case FETCHING_RECORDINGS:
      return { ...state, isFetching: true, errroMessage: '' };
    case FETCH_ERROR:
      return { ...state, isFetching: false, errorMessage: action.payload };
    case TOGGLE_CONFIRM_LOGOUT:
      return { ...state, confirmLogout: !state.confirmLogout };
    default:
      return state;
  }
}
