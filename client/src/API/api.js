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

const API = {
	logIn,
	logOut,
	getProvinces,
	getPointsByProvinceId,
	getPlaceById,
	createNewHike
};

export default API;
