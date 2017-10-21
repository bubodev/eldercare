import { AUTH_USER,	UNAUTH_USER, AUTH_ERROR, PROTECTED_TEST } from '../actions/types';

const INITIAL_STATE = { error: '', message: '', content: '', authenticated: false}

export default function (state = INITIAL_STATE, action) {  
	console.log(action.type)
	switch(action.type) {
		case AUTH_USER:
			return Object.assign({}, state, {
				error: '', message: '', authenticated: true
			})
		case UNAUTH_USER:
			return Object.assign({}, state, {
				authenticated: false
			})
		case AUTH_ERROR:
			return Object.assign({}, state, {
				error: action.payload
			})
		case PROTECTED_TEST:
			return Object.assign({}, state, {
				content: action.payload
			})
	}
	return state;
}