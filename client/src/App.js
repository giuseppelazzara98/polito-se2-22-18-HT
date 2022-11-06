import React from 'react';
import './styles/base.scss';
import NavbarHead from './components/Navbar/navbar';
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom';
import HomePage from './pages/HomePage';


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
			<NavbarHead/>
			<main className="main-wrap">
        <Routes>
          <Route path="/" element={<HomePage/>} />
        </Routes>
        <div id='modal-root'/>
			</main>
		</div>
	);
}

export default App;
