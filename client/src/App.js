import React from 'react';
import './styles/base.scss';
import NavbarHead from './components/Navbar/navbar';
import NewHike from './pages/NewHike';
import WrongPath from './pages/WrongPath';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
			<NavbarHead />
			<main className="main-wrap">
				<Routes>
					{/* to insert route */}
					<Route path="/newHike" element={<NewHike />} />
					<Route path="*" element={<WrongPath />} />
				</Routes>
			</main>
		</div>
	);
}

export default App;
