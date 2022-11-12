const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
var agent = chai.request.agent(app);

const hike_dao = require('../modules/DbManager').hike_dao;

describe('Test hikes apis', () => {

    const body1 = {
        "province": null,
        "difficulty": [],
        "exp_time": null,
        "length": null,
        "ascent": null
    };

    const body2 = {
        "province": null,
        "difficulty": ["turist"],
        "exp_time": { "min": 5.2, "max": 7.0 },
        "length": { "min": 0.0, "max": 15.7 },
        "ascent": { "min": 500, "max": 2000 }
    };

    const body3 = {
        "province": 1,
        "difficulty": ["turist","professional hiker"],
        "exp_time": null,
        "length": { "min": 0.0, "max": 15.7 },
        "ascent": null
    };

    const body4 = {
        "province": 3,
        "difficulty": [],
        "exp_time": { "min": 5.2, "max": 7.0 },
        "length": null,
        "ascent": { "min": 500, "max": 2000 }
    };

    const body5 = {
        "province": null,
        "difficulty": ["hiker"],
        "exp_time": null,
        "length": { "min": 0.0, "max": 15.7 },
        "ascent": { "min": 1000, "max": 2000 }
    };

    //Testing POST /api/hikes
    getFilteredHikes(200, body1);
    getFilteredHikes(200, body2);
    getFilteredHikes(200, body3);
    getFilteredHikes(200, body4);
    getFilteredHikes(200, body5);

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