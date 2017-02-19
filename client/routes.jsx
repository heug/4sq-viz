import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route } from 'react-router';
import Hello from './components/hello/';

const Routes = (props) => (
	<Router {...props}>
		<Route path='/' component={Hello} />
	</Router>
);

export default Routes;
