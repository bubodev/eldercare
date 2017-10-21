import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { routerReducer as routing, routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import authReducer from './reducers/authReducer'

export function configureStore(history, initialState) {

	const reducer = combineReducers({
		authReducer,
		routing: routing
	})

	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
	
	const store = createStore(
		reducer,
		initialState,
		composeEnhancers(
			applyMiddleware(
					thunkMiddleware,
					routerMiddleware(history)
			)
		)
	)

	return store
}
