import React, { useEffect, useState } from 'react';
import './styles/base.scss';
import NavbarHead from './components/Navbar/navbar';
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import API from './API/api';

function App() {
	return (
		<Router>
			<App2 />
		</Router>
	);
}

function App2() {
	const [hikes, setHikes] = useState([]);

	const getHikes = async () => {
		try {
		  const hikes = await API.getAllHikes();
		  setHikes(hikes);
		} catch (err) {
		  console.log(err);
		}
	  };
	  useEffect(() => {
		getHikes();
	  }, []);

	return (
		<div className="App">
			<NavbarHead/>
			<main className="main-wrap">
        <Routes>
          <Route path="/" element={<HomePage hikes={hikes}/>} />
        </Routes>
        <div id='modal-root'/>
			</main>
		</div>
	);
}

export default App;
