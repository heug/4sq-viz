import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import allReducers from './reducers';
import Routes from './config/routes';
import './index.scss';

import { composeWithDevTools } from 'redux-devtools-extension';

const loggerMiddleware = createLogger();

const store = createStore(allReducers, composeWithDevTools(
	applyMiddleware(thunkMiddleware, loggerMiddleware)
));

ReactDOM.render(
	<Provider store={store}>
		<Routes history={ browserHistory } />
	</Provider>, 
	document.getElementById('root')
);
