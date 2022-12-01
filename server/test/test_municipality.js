const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
let agent = chai.request.agent(app);

describe('Test municipality apis', () => {

	//Get municipality tests
	getMunicipalityProvinceById(1, 200);
    getMunicipalityProvinceById(0, 422);

});

function getMunicipalityProvinceById(idProvince, expectedHTTPStatus) {
    it('Getting municipality by province id', async () => {
        try {
            agent.get('api/municipalities/' + idProvince)
                .then(function (r) {
                    r.should.have.status(expectedHTTPStatus);

                    if (expectedHTTPStatus !== 200) {
                        Object.keys(r.body).length.should.gt(0);
                    }
                });

        } catch (err) {
            if (r.status === 500) {
                console.log("---- Error on getmunicipalityById ----");
            }
        }
    });
}
