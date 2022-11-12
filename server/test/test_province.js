const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
var agent = chai.request.agent(app);

const province_dao = require('../modules/DbManager').province_dao;

describe('Test province apis', () => {

    //Testing GET /api/provinces
    getAllProvinces(200);

});


function getAllProvinces(expectedHTTPStatus) {
    it('Getting all provinces from the province table', async () => {

        try {
            const currentProvinces = await province_dao.getAllProvinces();

            agent.get('/api/provinces')
                .then(function (r) {
                    r.should.have.status(expectedHTTPStatus);
                    Object.keys(r.body).length.should.equal(currentProvinces.length);
                });

        } catch (err) {
            if (r.status === 500) {
                console.log("---- Error on getAllProvinces ----");
            }
        }

    });
}