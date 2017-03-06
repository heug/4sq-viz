import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route } from 'react-router';
import Hello from './components/hello/';
import Landing from './components/landing/';

const Routes = (props) => (
	<Router {...props}>
		<Route path='/' component={Landing} />
		<Route path='hello' component={Hello} />
	</Router>
);

export default Routes;
