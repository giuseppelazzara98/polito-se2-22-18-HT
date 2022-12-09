const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server')
let agent = chai.request.agent(app);

const province_dao = require('../modules/DbManager').province_dao;
const place_dao = require('../modules/DbManager').place_dao;

describe('Test places apis', () => {

    //Testing GET /api/places/:provinceId
    getAllPlacesByProvinceId(200);
    getPlaceByWrongProvinceId(422, 0);

    //Testing POST /api/newHut
    const newHut1 = {
        "province": 1,
        "name": "Hut 1",
        "description": "Hut 1 description",
        "latitude": 45.123456,
        "longitude": 7.123456,
        "type": "hut",
        "altitude": 1000,
        "nBeds": 10,
        "phone": "+39 3331234567",
        "email": "guide1@gmail.com",
        "website": "www.hut1.com"
    }

    const newHut2 = {
        "province": 1,
        "name": "Hut 1",
        "description": "Hut 1 description",
        "latitude": 45.123456,
        "longitude": 7.123456,
        "type": "hut",
        "altitude": 1000,
        "nBeds": 10,
        "phone": "+39 3331234567",
        "email": "guide1@gmail.com",
        "website": ""
    }

    const newHut3 = {
        "province": 0,
        "name": "Hut 1",
        "description": "Hut 1 description",
        "latitude": 45.123456,
        "longitude": 7.123456,
        "type": "hut",
        "altitude": 1000,
        "nBeds": 10,
        "phone": "+39 3331234567",
        "email": "guide1@gmail.com",
        "website": ""
    }

    const newHut4 = {
        "province": 1,
        "name": "Hut 1",
        "description": "Hut 1 description",
        "latitude": 45.123456,
        "longitude": 7.123456,
        "type": "hut",
        "altitude": 1000,
        "nBeds": 10,
        "phone": "+39 3331234567",
        "email": "guide1gmail.com",
        "website": ""
    }

    const newHut5 = {
        "province": 1,
        "name": "Hut 1",
        "description": "Hut 1 description",
        "latitude": 45.123456,
        "longitude": 7.123456,
        "type": "hut",
        "altitude": 1000,
        "nBeds": 10,
        "phone": "+39 3331234567",
        "email": "guide1@gmail.com"
    }

    //Authenticating the user
    logIn('guide1@gmail.com', 'password', 200);

    insertNewHut(201, newHut1);
    insertNewHut(201, newHut2);
    insertNewHut(422, newHut3);
    insertNewHut(422, newHut4);
    insertNewHut(422, newHut5);

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

function getAllPlacesByProvinceId(expectedHTTPStatus) {
    it('Getting all places by province_ids', async () => {

        try {
            const currentProvinces = await province_dao.getAllProvinces();

            for(let province of currentProvinces){
                const id_province = province.id_province;

                const currentNumberOfPlacesPerProvince = await place_dao.getAllPlacesByProvinceId(id_province);

                agent.get('/api/places/' + id_province)
                    .then(function (r) {
                        r.should.have.status(expectedHTTPStatus);
                        Object.keys(r.body).length.should.equal(currentNumberOfPlacesPerProvince.length);
                    });
            }

        } catch (err) {
            if (r.status === 500) {
                console.log("---- Error on getAllPlacesByProvinceId ----");
            }
        }

    });
}

function getPlaceByWrongProvinceId(expectedHTTPStatus, id_province) {
    it('Getting place by wrong province_id', async () => {

        try {
            agent.get('/api/places/' + id_province)
                .then(function (r) {
                    r.should.have.status(expectedHTTPStatus);
                });

        } catch (err) {
            if (r.status === 500) {
                console.log("---- Error on getPlaceByWrongProvinceId ----");
            }
        }

    });
}

function insertNewHut(expectedHTTPStatus, newHut) {
    it('Inserting new hut', async () => {

        try {
            agent.post('/api/newHut')
                .set('Content-Type', 'application/json')
                .send(newHut)
                .then(function (r) {
                    r.should.have.status(expectedHTTPStatus);
                });

        } catch (err) {
            if (r.status === 503) {
                console.log("---- Error on insertNewHut ----");
            }
        }

    });
}