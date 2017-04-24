import React from 'react';
import Header from '../header';
import './app.scss';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Header />
				<div className="app">
					{ this.props.children }
				</div>
			</div>
		);
	}
};

export default App;
