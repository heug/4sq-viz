import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route } from 'react-router';
import Hello from './components/hello/';
import Landing from './components/landing/';
import Map from './components/map/';

const Routes = (props) => (
	<Router {...props}>
		<Route path='/' component={Landing} />
		<Route path='hello' component={Hello} />
		<Route path='map' component={Map} />
	</Router>
);

export default Routes;
