import React from 'react';
import { useState } from 'react';
import './styles/base.scss';
import NavbarHead from './components/Navbar/navbar';
import NewHike from './pages/NewHike';
import WrongPath from './pages/WrongPath';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
	return (
		<Router>
			<App2 />
		</Router>
	);
}

function App2() {
	const [loggedIn, setLoggedIn] = useState(false);
	return (
		<div className="App">
			<NavbarHead loggedIn={loggedIn} />
			<main className="main-wrap">
				<Routes>
					{/* to insert route */}
					<Route path="/newHike" element={<NewHike />} />
					<Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="*" element={<WrongPath />} />
				</Routes>
			</main>
		</div>
	);
}

export default App;
