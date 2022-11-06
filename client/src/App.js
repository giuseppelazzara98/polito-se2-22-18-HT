import React from 'react';
import './styles/base.scss';
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom';

function App() {
	return (
		<Router>
			<App2 />
		</Router>
	);
}

function App2() {
	
	return (
		<div className="App">
			<main className="main-wrap">
					<Routes>
            {/* to insert route */}
					</Routes>
			</main>
		</div>
	);
}

export default App;
