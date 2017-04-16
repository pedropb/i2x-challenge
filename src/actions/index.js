import axios from 'axios';
import history from '../history';
import {
  AUTH_USER,
  SENT_AUTH,
  UNAUTH_USER,
  AUTH_ERROR
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

export function logoutUser() {
  localStorage.removeItem('token');

  return { type: UNAUTH_USER };
}