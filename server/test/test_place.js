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

    //Authenticating the user
    logIn("guide1@gmail.com","password",200);

    const newParkingLot1 = {
        "province": 1,
		"name": "Parking lot 24",
		"description": "Parking lot 24 description",
		"latitude": 45.123456,
		"longitude": 7.123456,
		"type": "parking lot",
		"capacity": 345
    };

    const newParkingLot2 = {
		"province": 1,
		"name": "Parking lot 134",
		"description": "Parking lot 134 description",
		"latitude": 45.123456,
		"longitude": 7.123456,
		"type": "parking lot",
		"capacity": 100
	};

    const newParkingLot3 = {
		"province": 0,
		"name": "Parking lot 12",
		"description": "Parking lot 12 description",
		"latitude": 45.123456,
		"longitude": 7.123456,
		"type": "parking lot",
		"capacity": 100
	};

    const newParkingLot4 = {
        "province": 1,
        "name": "Parking lot 678",
        "description": "Parking lot 678 description",
        "latitude": 45.123456,
        "longitude": 7.123456,
        "type": "parkingot",
        "capacity": 2
    };

    const newParkingLot5 = {
        "province": 1,
        "name": "Parking lot 24",
        "description": "Parking lot 24 description",
        "latitude": 45.123456,
        "longitude": 7.123456,
        "type": "parking lot"
    };

    //Testing POST /api/newParkingLot
    newParkingLot(201, newParkingLot1);
    newParkingLot(201, newParkingLot2);
    newParkingLot(422, newParkingLot3);
    newParkingLot(422, newParkingLot4);
    newParkingLot(422, newParkingLot5);

});

function logIn(username, password, ExpectedHTTPStatus) {
	it('User login', (done) => {
		const credentials = { username, password };
		reqBody = JSON.stringify(credentials);
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

            for (let i = 0; i < currentProvinces.length; i++) {

                const id_province = currentProvinces[i].id_province;

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

function newParkingLot(expectedHTTPStatus, newParkingLot){
    it('New parking lot', (done) => {

        reqBody = JSON.stringify(newParkingLot);

        agent.post('/api/newParkingLot')
            .set('Content-Type', 'application/json')
            .send(newParkingLot)
            .then((res) => {
                res.should.have.status(expectedHTTPStatus);
                done();
            });
    });
}