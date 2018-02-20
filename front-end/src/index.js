import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import { loadingBarMiddleware } from 'react-redux-loading-bar'

import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()
// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    reducer,
    composeEnhancers(
		applyMiddleware(
			middleware,
			loadingBarMiddleware(),
			thunk
		)
	)
)

ReactDOM.render(
	<Provider store={store}>
		{ /* ConnectedRouter will use the store from Provider automatically */ }
	    <ConnectedRouter history={history}>
			<App />
		</ConnectedRouter>
	</Provider>, 
	document.getElementById('root')
);
registerServiceWorker();
