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
	const [filters, setFilters] = useState([]);
	const [facets, setFacets] = useState({});
	const [provincesFacets, setProvincesFacets] = useState([])

	const getHikes = async (dataOnRequest) => {
		try {
		  const {hikes, ...others} = await API.getAllHikes(dataOnRequest);
		  setHikes(hikes);
			if (Object.keys(facets).length === 0) {
				setFacets({
					...others
				});
			}
		} catch (err) {
		  console.log(err);
		}
	};

	const getDataOnRequest = () => {
		const provinceFilter = filters.filter(filterEle => filterEle.key === "provinces")?.map(ele => ele.id)?.[0] || null;
		const difficultyFilter = filters.filter(filterEle => filterEle.key === "difficulty")?.map(ele => ele.id) || [];
		const expTimeFilter = filters.filter(filterEle => filterEle.key === "expected-time")?.[0]?.values || [];
		const lengthFilter = filters.filter(filterEle => filterEle.key === "length")?.[0]?.values || [];
		const ascentFilter = filters.filter(filterEle => filterEle.key === "ascent")?.[0]?.values || [];

		const newObj = {
			province: provinceFilter,
			difficulty: difficultyFilter,
			exp_time: expTimeFilter?.length === 2 ? {min: expTimeFilter[0], max: expTimeFilter[1]} : null,
			length: lengthFilter?.length === 2 ? {min: lengthFilter[0], max: lengthFilter[1]} : null,
			ascent: ascentFilter?.length === 2 ? {min: ascentFilter[0], max: ascentFilter[1]} : null,
		}

		return newObj;
	}

	useEffect(() => {
		getHikes(getDataOnRequest());
	}, [filters]);

	useEffect(() => {
		API.getProvinces().then(response => setProvincesFacets(response));
	}, []);

	return (
		<div className="App">
			<NavbarHead/>
			<main className="main-wrap">
        <Routes>
          <Route path="/" element={<HomePage hikes={hikes} filters={filters} setFilters={setFilters} facets={facets} provincesFacets={provincesFacets}/>} />
        </Routes>
        <div id='modal-root'/>
			</main>
		</div>
	);
}

export default App;
