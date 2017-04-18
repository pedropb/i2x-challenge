import axios from 'axios';
import history from '../history';

import {
  AUTH_USER,
  SENT_AUTH,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_RECORDINGS,
  FETCHING_RECORDINGS,
  FETCH_ERROR,
  TOGGLE_CONFIRM_LOGOUT
} from './types';


const LOGIN_URL = 'https://i2x-challenge.herokuapp.com/core/login/'
const RECORDINGS_URL = 'https://i2x-challenge.herokuapp.com/ai/recording/list/';


// LOGIN ACTION
export function loginUser({ email, password }) {
  return function(dispatch) {
    dispatch({ type: SENT_AUTH });

    // POST email and password to API endpoint
    axios.post(LOGIN_URL, { email, password })
      .then(response => {
        // If request is successful: 
        
        // update state to authenticate user
        dispatch({ type: AUTH_USER });

        // store JWT token
        localStorage.setItem('token', response.data.token);
        
        // redirect to the route '/recordings'
        history.push('/recordings');
      })
      .catch(() => {
        // If request fails
        
        // update state to show error to user
        dispatch({
          type: AUTH_ERROR,
          payload: 'Invalid credentials.'
        });
      });
  }
}

// LOGOUT ACTION
export function logoutUser() {
  localStorage.removeItem('token');

  return { type: UNAUTH_USER };
}

// FETCH RECORDINGS
export function fetchRecordings() {
  return function(dispatch) {
    dispatch({ type: FETCHING_RECORDINGS });

    const token = localStorage.getItem('token');

    // POST email and password to API endpoint
    axios.get(RECORDINGS_URL, { 
      headers: { 'Authorization' : `JWT ${token}` }
    })
      .then(response => {
        // If request is successful: 
        
        // dispatch fetch_recordings
        dispatch({ 
          type: FETCH_RECORDINGS,
          payload: response.data.results
        });
      })
      .catch((error) => {
        // If request fails
        
        // update state to show error to user
        dispatch({
          type: FETCH_ERROR,
          payload: error.message
        });
      });
  }
}

// CONFIRM LOGOUT
export function confirmLogout() {
  return { type: TOGGLE_CONFIRM_LOGOUT };
}