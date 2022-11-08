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

/*let fakehikes = [{startPlace : "Verona",
			  endPlace : "Catania",
			  pathLength: 25,
			  expTime : 32,
			  ascent : 32,
			  difficulty: "hard",
			  description: "Nice" 
},{
	startPlace : "Verona",
	endPlace : "Napoli",
	pathLength: 25,
	expTime: 32,
	ascent: 21,
	difficulty: 34,
	description: "Nice"
}]*/

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
