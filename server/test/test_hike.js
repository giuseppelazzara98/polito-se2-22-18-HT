const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
var agent = chai.request.agent(app);

const hike_dao = require('../modules/DbManager').hike_dao;

describe('Test hikes apis', () => {

    const bodyHike1 = {
        "province": null,
        "difficulty": [],
        "exp_time": null,
        "length": null,
        "ascent": null
    };

    const bodyHike2 = {
        "province": null,
        "difficulty": ["turist"],
        "exp_time": { "min": 5.2, "max": 7.0 },
        "length": { "min": 0.0, "max": 15.7 },
        "ascent": { "min": 500, "max": 2000 }
    };

    const bodyHike3 = {
        "province": 1,
        "difficulty": ["turist","professional hiker"],
        "exp_time": null,
        "length": { "min": 0.0, "max": 15.7 },
        "ascent": null
    };

    const bodyHike4 = {
        "province": 3,
        "difficulty": [],
        "exp_time": { "min": 5.2, "max": 7.0 },
        "length": null,
        "ascent": { "min": 500, "max": 2000 }
    };

    const bodyHike5 = {
        "province": null,
        "difficulty": ["hiker"],
        "exp_time": null,
        "length": { "min": 0.0, "max": 15.7 },
        "ascent": { "min": 1000, "max": 2000 }
    };

    //Testing POST /api/hikes
    getFilteredHikes(200, bodyHike1);
    getFilteredHikes(200, bodyHike2);
    getFilteredHikes(200, bodyHike3);
    getFilteredHikes(200, bodyHike4);
    getFilteredHikes(200, bodyHike5);

    const bodyNewHike1 = {
        "title":"Hike 1",
        "province":1,
        "length":345,
        "expectedTimeString":"12h",
        "expectedTime":12,
        "ascent":123,
        "difficulty":2,
        "startPoint":9,
        "endPoint":5,
        "referencePoints":[],
        "gpxFile":"",
        "description":"Hike 1 description",
    };

    const bodyNewHike2 = {
        "title":"Hike 2",
        "province":1
    };

    const bodyNewHike3 = {};

    //Testing POST /api/newHike
    newHike(200, bodyNewHike1);
    newHike(422, bodyNewHike2);
    newHike(422, bodyNewHike3);

});


function getFilteredHikes(expectedHTTPStatus, body) {
    it('Getting filtered hikes', async () => {

        try {
            const currentHikes = await hike_dao.getAllFilteredHikes(body);

            agent.post('/api/hikes')
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
            
            agent.post('/api/newHike')
                .send(bodyNew)
                .then(function (r) {
                    r.should.have.status(expectedHTTPStatus);
                });

        } catch (err) {
            if (r.status === 503) {
                console.log("---- Error on newHike ----");
            }
        }

    });
}