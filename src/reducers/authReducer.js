import {
  AUTH_USER,
  SENT_AUTH,
  UNAUTH_USER,
  AUTH_ERROR
} from '../actions/types';

export const INITIAL_STATE = {
  error: '',
  authenticated: false,
  isAuthenticating: false
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SENT_AUTH:
      return { ...state, error: '', isAuthenticating: true };
    case AUTH_USER:
      return { ...state, error: '', authenticated: true, isAuthenticating: false };
    case UNAUTH_USER:
      return { ...state, authenticated: false, isAuthenticating: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload, isAuthenticating: false };
    default:
      return state;
  }
}
