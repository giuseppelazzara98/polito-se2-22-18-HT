const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
let agent = chai.request.agent(app);

const hike_dao = require('../modules/DbManager').hike_dao;

describe('Test hikes apis', () => {
	const bodyHike1 = {
		province: null,
		municipality: null,
		difficulty: [],
		exp_time: null,
		length: null,
		ascent: null,
		range: null
	};

	const bodyHike2 = {
		province: null,
		municipality: null,
		difficulty: ['turist'],
		exp_time: { min: 5.2, max: 7.0 },
		length: { min: 0.0, max: 15.7 },
		ascent: { min: 500, max: 2000 },
		range: null
	};

	const bodyHike3 = {
		province: 1,
		municipality: 7474,
		difficulty: ['turist', 'professional hiker'],
		exp_time: null,
		length: { min: 0.0, max: 15.7 },
		ascent: null,
		range: null
	};

	const bodyHike4 = {
		province: 3,
		municipality: 7474,
		difficulty: [],
		exp_time: { min: 5.2, max: 7.0 },
		length: null,
		ascent: { min: 500, max: 2000 },
		range: null
	};

	const bodyHike5 = {
		province: null,
		municipality: null,
		difficulty: ['hiker'],
		exp_time: null,
		length: { min: 0.0, max: 15.7 },
		ascent: { min: 1000, max: 2000 },
		range: null
	};

	//Testing POST /api/hikes
	getFilteredHikes(200, bodyHike1);
	getFilteredHikes(200, bodyHike2);
	getFilteredHikes(200, bodyHike3);
	getFilteredHikes(200, bodyHike4);
	getFilteredHikes(200, bodyHike5);

	const bodyNewHike1 = {
		title: "Test1",
		province: 4,
		municipality: 7474,
		length: 4,
		expectedTimeString: "56m",
		expectedTime: 0.93,
		ascent: 1406,
		difficulty: 1,
		startPoint: {
			type: "Address/Name of location",
			id: 298324244,
			name: "Politecnico di Torino, Corso Francesco Ferrucci, Cenisia, Circoscrizione 3, Torino, Piemonte, 10138, Italia",
			lat: 45.063697399999995,
			lon: 7.657527285508495
		  },
		endPoint: {
		  type: "Hut/Parking lot",
		  id: 12,
		  name: "Monte d'Oro",
		  lon: 8.474,
		  lat: 21.2475
		},
		referencePoints: [],
		gpxData: "",
		description: "Test1"
	  };

	const bodyNewHike2 = {
		title: 'Hike 2',
		province: 1,
		municipality: 7474
	};

	const bodyNewHike3 = {};

	const bodyNewHike4 = {
		title: 'Hike 5',
		province: 0,
		municipality: 7474,
		length: 345,
		expectedTimeString: '12h',
		expectedTime: 12,
		ascent: 123,
		difficulty: 2,
		startPoint: 9,
		endPoint: 5,
		referencePoints: [5000],
		gpxData: '',
		description: 'Hike 5 description'
	};

	const bodyNewHike5 = {
		title: 'Hike 6',
		province: 1,
		municipality: 7474,
		length: 345,
		expectedTimeString: 's12hsdflshdfkjshdkajffhsakljdfdsf',
		expectedTime: 12,
		ascent: 123,
		difficulty: 2,
		startPoint: 9,
		endPoint: 5,
		referencePoints: [1, 2, 3],
		gpxData: '',
		description: 'Hike 6 description'
	};

	const bodyNewHike6 = {
		title: 'Hike 7',
		province: 1,
		length: 345,
		expectedTimeString: '12h',
		expectedTime: 12,
		ascent: 123,
		difficulty: 7,
		startPoint: 9,
		endPoint: 5,
		referencePoints: [1, 2, 3],
		gpxData: '',
		description: 'Hike 7 description'
	};

	//Authenticating the local guide
	logIn('guide1@gmail.com', 'password', 200);

	//Testing POST /api/newHike
	newHike(201, bodyNewHike1);
	newHike(422, bodyNewHike2);
	newHike(422, bodyNewHike3);
	newHike(422, bodyNewHike4);
	newHike(422, bodyNewHike5);
	newHike(422, bodyNewHike6);

	//Testing GET /api/hike/:id
	getHikePointsByHikeId(200, 15);
	getHikePointsByHikeId(200, 20);
	getHikePointsByHikeId(200, 12);
	getHikePointsByHikeId(404, 12234567);
	getHikePointsByHikeId(422, 0);

	//Authenticating the hiker
	logIn('hiker1@gmail.com', 'password', 200);

	//Testing POST /api/hikeRegistration
	hikeRegistration(15, 201);
	hikeRegistration(16, 201);
	hikeRegistration(0, 422);

	//Testing PUT /api/startHike
	startHike(15, "2022/12/21 12:45", 200);
	startHike(11, "2022/12/21 08:45", 200);
	startHike(0, "2022/12/21 12:45", 422);
	startHike(13, 543, 422);				

});

function logIn(username, password, ExpectedHTTPStatus) {
	it('User login', (done) => {
		const credentials = { username, password };
		let reqBody = JSON.stringify(credentials);
		agent
			.post('/api/sessions')
			.set('Content-Type', 'application/json')
			.send(reqBody)
			.then((res) => {
				res.should.have.status(ExpectedHTTPStatus);
				done();
			});
	});
}

function getFilteredHikes(expectedHTTPStatus, body) {
    it('Getting filtered hikes', async () => {

        try {
            const currentHikes = await hike_dao.getAllFilteredHikes(body);

            agent.post('/api/hikes')
                .set('Content-Type', 'application/json')
                .send(body)
                .then(function (r) {
                    r.should.have.status(expectedHTTPStatus);
                    Object.keys(r.body.hikes).length.should.equal(currentHikes.length);
                });

        } catch (err) {
            if (r.status === 500) {
                console.log("---- Error on getFilteredHikes ----");
            }
        }

    });
}

function newHike(expectedHTTPStatus, bodyNew) {
	it('Inserting a new Hike', async () => {
		try {
			agent
				.post('/api/newHike')
				.set('Content-Type', 'application/json')
				.send(bodyNew)
				.then(function (r) {
					r.should.have.status(expectedHTTPStatus);
				});
		} catch (err) {
			if (r.status === 503) {
				console.log('---- Error on newHike ----');
			}
		}
	});
}

function getHikePointsByHikeId(expectedHTTPStatus, id_hike) {
	it('Getting hike points by id', async () => {
		try {
			agent.get('/api/hikePoints/' + id_hike).then(function (r) {
				r.should.have.status(expectedHTTPStatus);

				if (expectedHTTPStatus !== 200) {
					Object.keys(r.body).length.should.gt(0);
				}
			});
		} catch (err) {
			if (r.status === 500) {
				console.log('---- Error on getHikePointsByHikeId ----');
			}
		}
	});
}

function hikeRegistration(id_hike, expectedHTTPStatus) {
	it('Hike registration', async () => {

		const body = {
			id_hike: id_hike
		};

		try {
			agent
				.post('/api/hikeRegistration')
				.set('Content-Type', 'application/json')
				.send(body)
				.then(function (r) {
					r.should.have.status(expectedHTTPStatus);
				});
		} catch (err) {
			if (r.status === 503) {
				console.log('---- Error on hikeRegistration ----');
			}
		}
	});
}

function startHike(id_hike, start_time, expectedHTTPStatus) {
	it('Starting a hike', async () => {

		const body = {
			id_hike: id_hike,
			start_time: start_time
		};

		try {
			agent.put('/api/startHike')
			.set('Content-Type', 'application/json')
			.send(body)
			.then(function (r) {
				r.should.have.status(expectedHTTPStatus);
			});
		} catch (err) {
			if (r.status === 503) {
				console.log('---- Error on startHike ----');
			}
		}
	});
}