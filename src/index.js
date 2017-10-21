import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import registerServiceWorker from './registerServiceWorker'
import { ConnectedRouter } from 'react-router-redux'
import { configureStore } from './store'
import history from './history'
import App from './App'
import Home from './routes/Home'
import Login from './routes/Login'
import NoMatch from './routes/NoMatch'
import RequireAuth from './routes/RequireAuth'

import './styles/main.css'

const state = window.__initialState__ || undefined
const store = configureStore(history, state)

ReactDOM.render((
  <Provider store={ store }>
    <ConnectedRouter history={history}>
      <App>
        <Switch>
					<Route path="/login" component={Login} />
					<Route exact path="/" component={RequireAuth(Home)} />
					<Route component={NoMatch}/>
        </Switch>
      </App>
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'))

registerServiceWorker();