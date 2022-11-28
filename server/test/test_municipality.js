const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
let agent = chai.request.agent(app);

describe('Test municipality apis', () => {

	//Get municipality tests
	getmunicipalityById(1, 200);

});

function getmunicipalityById(idMunicipality, expectedHTTPStatus) {
    it('Getting municipality by id', async () => {
        try {
            agent.get('/municipalities/' + idMunicipality)
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
