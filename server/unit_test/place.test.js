const testPlaceDao = require('../modules/DbManager').place_dao;

describe('TestPlaceDao', () => {

    testGetPlacesByProvinceId(0, false);
    testGetPlacesByProvinceId(1, true);
    testGetPlacesByProvinceId(2, true);
    testGetPlacesByProvinceId(3, true);
    testGetPlacesByProvinceId(6, true);
    testGetPlacesByProvinceId(7, true);
    testGetPlacesByProvinceId(237, false);

    testGetPlacesById(1, true);
    testGetPlacesById(2, true);
    testGetPlacesById(3, true);
    testGetPlacesById(6, true);
    testGetPlacesById(10, true);
    testGetPlacesById(5000, false);
    testGetPlacesById(3299, false);

    const referencePoint1 = {
        name: 'Piazza del Duomo',
        type: 'Address/Name of location',
        lat: 45.464211,
        lon: 9.189982
    };

    const referencePoint2 = {
        name: 'Alpe di Siusi',
        type: 'Hut/Parking lot',
        lat: 78.12,
        lon: 23.32
    };

    const referencePoint3 = {
        name: 'eremo di San Romedio',
        type: 'hut',
        lat: 65.23,
        lon: 45.12
    };

    testInsertPlace(referencePoint1, 1);
    testInsertPlace(referencePoint2, 2);
    testInsertPlace(referencePoint3, 3);

    // CLOSE CONNECTION TO PLACE TABLE

    testClosePlaceTable();
    testGetPlacesByProvinceId(1, true);
    testGetPlacesById(2, true);
    testInsertPlace(referencePoint1, 1);

});

function testGetPlacesByProvinceId(id_province, expextedResult) {
    test('Test get places by province id', async () => {
        try {

            const places = await testPlaceDao.getAllPlacesByProvinceId(id_province);



            if (expextedResult === true) {
                expect(places).not.toBeNull();
                expect(places.length).toBeGreaterThan(0);
            }
            else {
                expect(places).toBeNull();
                expect(places.length).toBe(0);
            }
        }
        catch (err) {
            console.log("---- Error on testGetPlacesByProvinceId ----");
            return;
        }
    });
}

function testGetPlacesById(id_place, expextedResult) {
    test('Test get places by place id', async () => {
        try {

            const places = await testPlaceDao.getPlaceById(id_place);

            expect(places).not.toBeNull();

            if (expextedResult === true) {
                expect(places.length).toBeGreaterThan(0);
            }
            else {
                expect(places.length).toBe(0);
            }
        }
        catch (err) {
            console.log("---- Error on testGetPlacesById ----");
            return;
        }
    });
}

function testInsertPlace(referencePoint, idProvince) {
    test('Test insert new place', async () => {
        try {
            const result = await testPlaceDao.insertPlace(referencePoint, idProvince);

            expect(result).not.toBeNull();

            expect(result).toBe(Number);
        }
        catch (err) {
            console.log("---- Error on testInsertPlace ----");
            return;
        }
    });
}

function testClosePlaceTable() {
    test('Close place table', async () => {
        try {
            await testPlaceDao.closePlaceTable();
        }
        catch (err) {
            console.log("---- Error on TestClosePlaceTable ----");
        }
    });
}