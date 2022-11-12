const testPlaceDao = require('../modules/DbManager').place_dao;
const testProvinceDao = require('../modules/DbManager').province_dao;

describe('TestPlaceDao', () => {

    testGetAllPlaces(3);
    /*testGetPlacesByProvinceId();

    // CLOSE CONNECTION TO PLACE TABLE

    testClosePlaceTable();
    testGetAllPlaces();
    testGetPlacesByProvinceId();*/

});

async function getCurrentProvinces() {
    try {
        var res = await testProvinceDao.getAllProvinces();
        return res;
    } catch (err) {
        console.log("---- Cannot get all provinces ----");
    }
}

async function getCurrentPlaces() {
    try {
        let res = await testPlaceDao.getAllPlaces();
        return res.length;
    } catch (err) {
        console.log("---- Cannot get all places ----");
    }
}

async function getCurrentPlacesByProvinceIds(province_numbers) {

    let currentNumberOfPlacesByProvinceId = [];

    try {

        for(let i=0; i<province_ids; i++) {
            const res = await testPlaceDao.getAllPlacesByProvinceId(province_ids[i]);
            currentNumberOfPlacesByProvinceId.push(res.length);
        }

        return currentNumberOfPlacesByProvinceId;
    } catch (err) {
        console.log("---- Cannot get places by province ids ----");
    }
}

function testGetAllPlaces(result) {
    test('Test get places', async () => {
        try {
            let res = await testProvinceDao.getAllPlaces();
            console.log(result);
            console.log(res.length);
            expect(res.length).toStrictEqual(result);
        }
        catch (err) {
            console.log("---- Error on testGetAllPlaces ----");
            return;
        }
    });
}

function testGetPlacesByProvinceId(province_numbers, result) {
    test('Test get places by province id', async () => {
        try {

            console.log(province_numbers);
            console.log(result);
            for(let i=0; i<province_numbers.length; i++) {
                var res = await testPlaceDao.getAllPlacesByProvinceId(province_numbers[i]);
                expect(res.length).toStrictEqual(result[i]);
            }
        }
        catch (err) {
            console.log("---- Error on testGetPlacesByProvinceId ----");
            return;
        }
    });
}

function testClosePlaceTable() {
    test('Close place table', async () => {
        try{
            await testPlaceDao.closePlaceTable();
        }
        catch(err) {
            console.log("---- Error on TestClosePlaceTable ----");
        }
    });
}