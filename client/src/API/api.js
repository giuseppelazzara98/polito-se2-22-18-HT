const APIURL = new URL('http://localhost:3001/api/');

const logIn = async (credentials) => {
	const response = await fetch(new URL('sessions', APIURL), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'include',
		body: JSON.stringify(credentials)
	});
	if (response.ok) {
		const user = await response.json();
		return user;
	} else {
		const errDetails = await response.text();
		throw errDetails;
	}
};

const logOut = async () => {
	const response = await fetch(new URL('sessions/current', APIURL), {
		method: 'DELETE',
		credentials: 'include'
	});
	if (response.ok) return null;
};

const getUserInfo = async () => {
	const response = await fetch(new URL('sessions/current', APIURL), {
		credentials: 'include'
	});
	if (response.ok) {
		const user = await response.json();
		return user;
	} else {
		return null;
	}
};

const getProvinces = async () => {
	const response = await fetch(new URL('provinces', APIURL), {
		method: 'GET',
		credentials: 'include'
	});
	if (response.ok) {
		const provinces = await response.json();
		return provinces;
	} else {
		const errDetails = await response.text();
		throw errDetails;
	}
};

const getPointsByProvinceId = async (provinceId) => {
	const response = await fetch(new URL(`places/${provinceId}`, APIURL), {
		method: 'GET',
		credentials: 'include'
	});
	if (response.ok) {
		const points = await response.json();
		return points;
	} else {
		const errDetails = await response.text();
		throw errDetails;
	}
};

const getPlaceById = async (placeId) => {
	const response = await fetch(new URL(`places/place/${placeId}`, APIURL), {
		method: 'GET',
		credentials: 'include'
	});
	if (response.ok) {
		const place = await response.json();
		return place;
	} else {
		const errDetails = await response.text();
		throw errDetails;
	}
};
const register = async (credentials) => {
	const response = await fetch(new URL('newUser', APIURL), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(credentials)
	});
	if (response.ok) {
		const user = await response.json();
		return user;
	} else {
		const errDetails = await response.text();
		throw errDetails;
	}
};

const verifyEmail = async (token) => {
	const response = await fetch(new URL(`verify/${token}`, APIURL), {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	if (response.ok) {
		const id_user = await response.json();
		return id_user;
	} else {
		const errDetails = await response.text();
		throw errDetails;
	}
};

const getRoles = async () => {
	let err = new Error();
	const response = await fetch(new URL('roles', APIURL));
	if (response.ok) {
		const rolesJson = await response.json();
		const roles = rolesJson?.map((role) => ({
			id: role.id,
			description: role.description
		}));
		return roles;
	} else {
		if (response.status === 500) {
			err.message = '500 INTERNAL SERVER ERROR';
			throw err;
		}
	}
};

const createNewHike = async (hike) => {
	const response = await fetch(new URL('newHike', APIURL), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'include',
		body: JSON.stringify(hike)
	});
	if (!response.ok) {
		const errDetails = await response.text();
		throw errDetails;
	}
};

async function getAllHikes(data) {
	// call: POST /api/hikes
	let err = new Error();
	const response = await fetch(new URL('hikes', APIURL), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	if (response.ok) {
		const hikesJson = await response.json();
		const hikes = hikesJson?.hikes?.map((r) => ({
			startPlace: r.start_place,
			endPlace: r.end_place,
			pathLength: r.length,
			expTime: r.expected_time,
			ascent: r.ascent,
			difficulty: r.difficulty,
			key: r.key,
			name: r.name,
			description: r.description,
			province: r.province,
			municipality: r.municipality,
			position: { latitude: r.position.lat, longitude: r.position.long },
			image: r.image
		}));
		return {
			hikes: hikes,
			distinctTimes: hikesJson?.distinct_times || [],
			distinctLengths: hikesJson?.distinct_lengths || [],
			distinctAscents: hikesJson?.distinct_ascents || []
		};
	} else {
		if (response.status === 500) {
			err.message = '500 INTERNAL SERVER ERROR';
			throw err;
		}
	}
}

const getOwnedHikes = async () => {
	const response = await fetch(new URL('hikesStats', APIURL), {
		method: 'GET',
		credentials: 'include'
	});
	if (response.ok) {
		const hikesOwnedJson = await response.json();
		const hikesOwned = hikesOwnedJson?.map((hike) => ({
			id_hike: hike.id_hike,
			hike_name: hike.hike_name,
			start_time: hike.start_time,
			end_time: hike.end_time,
			state: hike.state,
			registered: hike.registered
		}));
		return hikesOwned;
	} else {
		const errDetails = await response.text();
		throw errDetails;
	}
};

const getProvincesFacets = async () => {
	let err = new Error();
	const response = await fetch(new URL('provinces', APIURL));
	if (response.ok) {
		const provincesJson = await response.json();
		const provinces = provincesJson?.map((province) => ({
			id: province.id_province,
			value: province.name,
			label: province.name,
			abbreviation: province.abbreviation
		}));
		return provinces;
	} else {
		if (response.status === 500) {
			err.message = '500 INTERNAL SERVER ERROR';
			throw err;
		}
	}
};

const getHikePointsInfo = async (id) => {
	const response = await fetch(new URL(`hikePoints/${id}`, APIURL), {
		credentials: 'include'
	});
	if (response.ok) {
		const points = await response.json();
		return points;
	} else {
		const errorPoints = await response.text();
		throw errorPoints;
	}
};
const getMunicipalitiesFacets = async (provinceId) => {
	let err = new Error();
	const response = await fetch(new URL(`municipalities/${provinceId}`, APIURL));
	if (response.ok) {
		const municipalitiesJson = await response.json();
		const municipalities = municipalitiesJson?.map((municipality) => ({
			id: municipality.id_municipality,
			value: municipality.name,
			label: municipality.name
		}));
		return municipalities;
	} else {
		if (response.status === 500) {
			err.message = '500 INTERNAL SERVER ERROR';
			throw err;
		}
	}
};

const insertHut = async (data) => {
	let err = new Error();
	const response = await fetch(new URL(`newHut/`, APIURL), {
		credentials: 'include',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	if (response.ok) {
		const okAdd = await response.json();
		return okAdd;
	} else {
		if (response.status === 500) {
			err.message = '500 INTERNAL SERVER ERROR';
			throw err;
		} else {
			throw err;
		}
	}
};

const insertParkingLot = async (data) => {
	let err = new Error();
	const response = await fetch(new URL(`newParkingLot/`, APIURL), {
		credentials: 'include',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	if (response.ok) {
		const okAdd = await response.json();
		return okAdd;
	} else {
		if (response.status === 500) {
			err.message = '500 INTERNAL SERVER ERROR';
			throw err;
		} else {
			throw err;
		}
	}
};

const registerHike = async (data) => {
	let err = new Error();
	const response = await fetch(new URL(`hikeRegistration/`, APIURL), {
		credentials: 'include',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	if (response.ok) {
		const okAdd = await response.json();
		return okAdd;
	} else {
		if (response.status === 500) {
			err.message = '500 INTERNAL SERVER ERROR';
			throw err;
		} else {
			throw err;
		}
	}
};

const startHike = async (data) => {
	let err = new Error();
	const response = await fetch(new URL(`startHike/`, APIURL), {
		credentials: 'include',
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	if (response.ok) {
		const okAdd = await response.json();
		return okAdd;
	} else {
		if (response.status === 500) {
			err.message = '500 INTERNAL SERVER ERROR';
			throw err;
		} else {
			throw err;
		}
	}
};

const endHike = async (data) => {
	let err = new Error();
	const response = await fetch(new URL(`endHike/`, APIURL), {
		credentials: 'include',
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	if (response.ok) {
		const okEnd = await response.json();
		return okEnd;
	} else {
		if (response.status === 500) {
			err.message = '500 INTERNAL SERVER ERROR';
			throw err;
		} else {
			throw err;
		}
	}
};

const API = {
	logIn,
	logOut,
	getProvinces,
	getPointsByProvinceId,
	getPlaceById,
	createNewHike,
	getAllHikes,
	getProvincesFacets,
	getMunicipalitiesFacets,
	getUserInfo,
	register,
	getRoles,
	getHikePointsInfo,
	verifyEmail,
	insertHut,
	insertParkingLot,
	getOwnedHikes,
	registerHike,
	startHike,
	endHike
};

export default API;
