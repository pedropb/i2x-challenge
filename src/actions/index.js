import axios from 'axios';
import history from '../history';
import {
  AUTH_USER,
  SENT_AUTH,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_RECORDINGS,
  FETCHING_RECORDINGS,
  TOGGLE_CONFIRM_LOGOUT
} from './types';


const API_BASE_URL = 'https://i2x-challenge.herokuapp.com/core/';


// LOGIN ACTION
export function loginUser({ email, password }) {
  return function(dispatch) {
    dispatch({ type: SENT_AUTH });

    // POST email and password to API endpoint
    axios.post(`${API_BASE_URL}login/`, { email, password })
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
  console.log("fetchin recordings");
  const recording = {
    "final_script": "transcript text",
    "rating": 4,
    "duration": 920,
    "url": "https://s3.eu-central-1.amazonaws.com/linementor-upload-chromex/challenge/3921.mp3", 
    "created": "date_string" 
  };
  
  return {
    type: FETCH_RECORDINGS,
    payload: [
      recording,
      recording,
      recording,
      recording
    ]
  };
}

// CONFIRM LOGOUT
export function confirmLogout() {
  return { type: TOGGLE_CONFIRM_LOGOUT };
}