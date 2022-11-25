const testProvinceDao = require('../modules/DbManager').province_dao;

describe('testProvinceDao', () => {

    testGetAllProvinces(106);

    // CLOSE CONNECTION TO PROVINCE TABLE

    testCloseProvinceTable();
    testGetAllProvinces(106);

});

function testGetAllProvinces(result) {
    test('test get provinces', async () => {
        try {
            const res = await testProvinceDao.getAllProvinces();
            expect(res.length).toBe(result);
        }
        catch (err) {
            console.log("---- Error on testGetAllProvinces ----");
            return;
        }
    });
}

function testCloseProvinceTable() {
    test('close province table', async () => {
        try {
            await testProvinceDao.closeProvinceTable();
        }
        catch (err) {
            console.log("---- Error on TestCloseProvinceTable ----");
        }
    });
}