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

});


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