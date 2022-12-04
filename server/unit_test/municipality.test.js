const testMunicipalityDao = require('../modules/DbManager').municipality_dao;

describe('TestMunicipalityDao', () => {

    testGetMunicipalityByIdProvince(1, true);

    // CLOSE CONNECTION TO MUNICIPALITY TABLE

    testCloseTables();
    testGetMunicipalityByIdProvince(1, true);

});



function testGetMunicipalityByIdProvince(id, expected_result) {
    test('Test municipality by id province', async () => {
        try {
            const result = await testMunicipalityDao.getMunicipalitiesByIdProvince(id);

            if (expected_result === true) {
                expect(result).not.toBeNull();
            }
            else {
                expect(result).toBeNull();
            }
        }
        catch (err) {
            console.log("---- Error on testGetMunicipalityByIdProvince ----");
            return;
        }
    });
}

function testCloseTables() {
    test('close tables', async () => {
        try {
            await testMunicipalityDao.closeTables();
        }
        catch (err) {
            console.log("---- Error on TestCloseMunicipalityTable ----");
        }
    });
}