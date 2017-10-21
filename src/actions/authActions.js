import axios from 'axios'
import { push } from 'react-router-redux'
import history from '../history'
import cookie from 'react-cookie'
import { AUTH_USER,  
         AUTH_ERROR,
         UNAUTH_USER,
         PROTECTED_TEST } from './types'

const APP_URL = 'http://localhost:3000'
const API_URL = 'http://localhost:3001/api'

export function errorHandler(dispatch, error, type) {  
  let errorMessage = '';

  if(error.data.error) {
    errorMessage = error.data.error;
  } else if(error.data){
    errorMessage = error.data;
  } else {
    errorMessage = error;
  }

  if(error.status === 401) {
    dispatch({
      type: type,
      payload: 'You are not authorized to do this. Please login and try again.'
    });
    logoutUser();
  } else if(error.status === 400 && error.data ==="Bad Request"){
    dispatch({
      type: type,
      payload: 'Please enter correct email and password'
    });
  } else {
    dispatch({
      type: type,
      payload: errorMessage
    });
  }
}

export function loginUser({ email, password }) {  
  return function(dispatch) {
    axios.post(`${API_URL}/auth/login`, { email, password })
    .then(response => {
			console.log(response)
			localStorage.setItem('token', response.data.token);
      //cookie.save('token', response.data.token, { path: '/' });
			dispatch({ type: AUTH_USER })
			history.push('/')
    })
    .catch((error) => {
			console.log(error.response)
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
    }
  }

export function registerUser({ email, firstName, lastName, password }) {  
  return function(dispatch) {
    axios.post(`${API_URL}/auth/register`, { email, firstName, lastName, password })
    .then(response => {
			localStorage.setItem('token', response.data.token);
      //cookie.save('token', response.data.token, { path: '/' });
      dispatch({ type: AUTH_USER });
      window.location.href = APP_URL;
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
  }
}

export function logoutUser() {  
  return function (dispatch) {
    dispatch({ type: UNAUTH_USER });
    //cookie.remove('token', { path: '/' });
		localStorage.removeItem('token');
    window.location.href = APP_URL+'/login';
  }
}

export function getUsers(_id){
	return function (dispatch) {
		axios.get(`${API_URL}/user/${_id}`, {
			headers: {'Authorization': localStorage.getItem('token')}
		})
		.then(response => {
			console.log(response)
		})
		.catch(error => {
			console.log(error.response)
		})
	}
}

export function protectedTest() {  
  return function(dispatch) {
		
    axios.get(`${API_URL}/protected`, {
      headers: { 'Authorization': localStorage.getItem('token') }
    })
    .then(response => {
			console.log(response)
			console.log(localStorage.getItem('token'))
      dispatch({
        type: PROTECTED_TEST,
        payload: response.data.content
      });
    })
    .catch((error) => {
			console.log(error.response)
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
  }
}