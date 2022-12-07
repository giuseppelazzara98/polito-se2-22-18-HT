import React, { useEffect, useState } from 'react';
import './styles/base.scss';
import NavbarHead from './components/Navbar/navbar';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import NewHike from './pages/NewHike';
import NewHut from './pages/NewHut';
import WrongPath from './pages/WrongPath';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EmailVerified from './pages/EmailVerified';
import API from './API/api';
import InfoModalComponent from './components/InfoModalComponent/InfoModalComponent';
import MapModalComponent from './components/MapModalComponent/MapModalComponent';
import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';

function App() {
	return (
		<Router>
			<App2 />
		</Router>
	);
}

function App2() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [hikes, setHikes] = useState([]);
	const [filters, setFilters] = useState([]);
	const [facets, setFacets] = useState({});
	const [provincesFacets, setProvincesFacets] = useState([]);
	const [fetchMunicipalities, setFetchMunicipalities] = useState(0);
	const [municipalitiesFacets, setMunicipalitiesFacets] = useState([]);
	const [user, setUser] = useState({});
	const [updateHikes, setUpdateHikes] = useState(0);
	const [showWelcomeModal, setShowWelcomeModal] = useState(false);
	const [showLogoutModal, setShowLogoutModal] = useState(false);
	const [showAddNewHikeSuccess, setShowAddNewHikeSuccess] = useState(false);
	const [showAddNewHikeError, setShowAddNewHikeError] = useState(false);
	const [showAddNewHutSuccess, setShowAddNewHutSuccess] = useState(false);
	const [showAddNewHutError, setShowAddNewHutError] = useState(false);
	const [showRegistrationSuccess, setShowRegistrationSuccess] = useState(false);
	const [showEmailVerificationSuccess, setShowEmailVerificationSuccess] = useState(false);
	const [showEmailVerificationError, setShowEmailVerificationError] = useState(false);
	const [showMapModal,setShowMapModal]=useState(false);
	const [hikePointsInfo, setHikePointsInfo] = useState({});

	const getHikes = async (dataOnRequest) => {
		try {
			const { hikes, ...others } = await API.getAllHikes(dataOnRequest);
			setHikes([...hikes].sort((a, b) => a.province.localeCompare(b.province)));//ORDER BY PROVINCE ASC BY DEFAULT
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
		const provinceFilter =
			filters
				.filter((filterEle) => filterEle.key === 'provinces')
				?.map((ele) => ele.id)?.[0] || null;
		const municipalitiesFilter =
			filters
				.filter((filterEle) => filterEle.key === 'municipalities')
				?.map((ele) => ele.id)?.[0] || null;
		const difficultyFilter =
			filters
				.filter((filterEle) => filterEle.key === 'difficulty')
				?.map((ele) => ele.id) || [];
		const expTimeFilter =
			filters.filter((filterEle) => filterEle.key === 'expected-time')?.[0]
				?.values || [];
		const lengthFilter =
			filters.filter((filterEle) => filterEle.key === 'length')?.[0]?.values ||
			[];
		const ascentFilter =
			filters.filter((filterEle) => filterEle.key === 'ascent')?.[0]?.values ||
			[];

		const newObj = {
			province: provinceFilter,
			municipality: municipalitiesFilter,
			difficulty: difficultyFilter,
			exp_time:
				expTimeFilter?.length === 2
					? { min: expTimeFilter[0], max: expTimeFilter[1] }
					: null,
			length:
				lengthFilter?.length === 2
					? { min: lengthFilter[0], max: lengthFilter[1] }
					: null,
			ascent:
				ascentFilter?.length === 2
					? { min: ascentFilter[0], max: ascentFilter[1] }
					: null,
			range: null
		};

		return newObj;
	};

	useEffect(() => {
		const checkAuth = async () => {
			const user = await API.getUserInfo();
			if (user) {
				setLoggedIn(true);
				setUser(user);
			}
		};
		checkAuth();
	}, []);

	useEffect(() => {
		getHikes(getDataOnRequest());
	}, [filters, updateHikes]);

	useEffect(() => {
		API.getProvincesFacets().then((response) => setProvincesFacets(response));
	}, []);

	useEffect(() => {
		if (!showMapModal) {
			setHikePointsInfo({});
		}
	}, [showMapModal]);

	useEffect(() => {
		if (fetchMunicipalities !== 0) {
			API.getMunicipalitiesFacets(fetchMunicipalities).then((response) => { setMunicipalitiesFacets(response); });
		}
	}, [fetchMunicipalities]);

	return (
		<div className="App">
			<NavbarHead
				loggedIn={loggedIn}
				setLoggedIn={setLoggedIn}
				user={user}
				setUser={setUser}
				setShowLogoutModal={setShowLogoutModal}
			/>
			<main className="main-wrap">
				<Routes>
					{/* to insert route */}
					<Route
						path="/"
						element={
							<HomePage
								hikes={hikes}
								setHikes={setHikes}
								filters={filters}
								setFilters={setFilters}
								facets={facets}
								provincesFacets={provincesFacets}
								setShowMapModal={setShowMapModal}
								setHikePointsInfo={setHikePointsInfo}
								isHiker={user.role==="Hiker"}
								municipalitiesFacets={municipalitiesFacets}
								setFetchMunicipalities={setFetchMunicipalities}
							/>
						}
					/>
					<Route
						path="/newHike"
						element={
							loggedIn && user.role === 'Local guide' ? (
								<NewHike setUpdateHikes={setUpdateHikes} setShowAddNewHikeSuccess={setShowAddNewHikeSuccess} setShowAddNewHikeError={setShowAddNewHikeError} />
							) : (
								<Navigate to="/login" replace />
							)
						}
					/>
					<Route
						path="/newHut"
						element={
							loggedIn && user.role === 'Local guide' ? (
								<NewHut  setShowAddNewHutSuccess={setShowAddNewHutSuccess} setShowAddNewHutError={setShowAddNewHutError} provincesFacets={provincesFacets}/>
							) : (
								<Navigate to="/login" replace />
							)
						}
					/>
					<Route
						path="/login"
						element={
							loggedIn ? (
								<Navigate to="/" replace />
							) : (
								<Login setLoggedIn={setLoggedIn} setUser={setUser} setShowWelcomeModal={setShowWelcomeModal} />
							)
						}
					/>
					<Route path="/signup" element={
						loggedIn ? (
							<Navigate to="/" replace />
						) : (
							<Signup setLoggedIn={setLoggedIn} setUser={setUser} setShowRegistrationSuccess={setShowRegistrationSuccess} />
						)
					} />
					<Route path="*" element={<WrongPath />} />
					<Route path = "verify/:token" element={
						loggedIn ? (
							<Navigate to="/" replace />
						) : (
							<EmailVerified setShowEmailVerificationSuccess={setShowEmailVerificationSuccess} setShowEmailVerificationError={setShowEmailVerificationError} />
						)
					} />
				</Routes>
				<InfoModalComponent
					show={showWelcomeModal}
					title="Logged in successfully"
					subtitle={`Welcome ${user.name}, you are logged in successfully`}
					icon={faCheckCircle}
				/>
				<InfoModalComponent
					show={showLogoutModal}
					subtitle={`Logged out successfully`}
					icon={faCheckCircle}
				/>
				<InfoModalComponent
					show={showAddNewHikeSuccess}
					title="Success!"
					subtitle={`New hike added successfully`}
					icon={faCheckCircle}
				/>
				<InfoModalComponent
					show={showAddNewHikeError}
					title="Error"
					subtitle={`Oh no... there was a problem, try later`}
					icon={faXmarkCircle}
					success={false}
				/>
				<InfoModalComponent
					show={showRegistrationSuccess}
					title="Success!"
					subtitle={`Registration completed successfully. We sent you an email to confirm your account`}
					icon={faCheckCircle}
				/>
				<InfoModalComponent
					show={showEmailVerificationSuccess}
					title="Success!"
					subtitle={`Email verified successfully`}
					icon={faCheckCircle}
				/>
				<InfoModalComponent
					show={showEmailVerificationError}
					title="Error"
					subtitle={`Something went wrong with the confirmation of the email, try later`}
					icon={faXmarkCircle}
					success={false}
				/>
				<InfoModalComponent
					show={showAddNewHutSuccess}
					title="Success!"
					subtitle={`New hut added successfully`}
					icon={faCheckCircle}
				/>
				<InfoModalComponent
					show={showAddNewHutError}
					title="Error"
					subtitle={`Oh no... there was a problem, try later`}
					icon={faXmarkCircle}
					success={false}
				/>

				<MapModalComponent
					show={showMapModal}
					setShowMapModal={setShowMapModal}
					hikePointsInfo={hikePointsInfo}
				/>

				<div id="modal-root" />
			</main>
		</div>
	);
}


export default App;
