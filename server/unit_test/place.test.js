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

    const newParkingLot1 = {
        province: 1,
        name: 'Parking lot 134',
        description: 'Parking lot 134 description',
        latitude: 45.123456,
        longitude: 7.123456,
        type: 'parking lot',
        capacity: 100
    };

    const newParkingLot2 = {
        province: 2,
        name: 'Parking lot 123',
        description: 'Parking lot 123 description',
        latitude: 45.123456,
        longitude: 7.123456,
        type: 'parking lot',
        capacity: 1500
    };

    const newParkingLot3 = {
        province: 3,
        name: 'Parking lot 456',
        description: 'Parking lot 456 description',
        latitude: 45.123456,
        longitude: 7.123456,
        type: 'parking lot',
        capacity: 20
    };

    testNewParkingLot(newParkingLot1, false);
    testNewParkingLot(newParkingLot2, false);
    testNewParkingLot(newParkingLot3, false);

    // CLOSE CONNECTION TO PLACE TABLE

    testCloseTables();
    testGetPlacesByProvinceId(1, true);
    testGetPlacesById(2, true);
    testInsertPlace(referencePoint1, 1);
    testNewParkingLot(newParkingLot1, true);

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

function testNewParkingLot(newParkingLot, dbClosed) {
    test('Test new parking lot', async () => {
        try {

            const newPlace = {
                name: newParkingLot.name,
                description: newParkingLot.description,
                lat: newParkingLot.latitude,
                lon: newParkingLot.longitude,
                type: newParkingLot.type
            }

            let idPlace = null;

            if (dbClosed !== true) {
                idPlace = await testPlaceDao.insertPlace(newPlace, newParkingLot.province);
            }

            const result = await testPlaceDao.insertParkingLotData(idPlace, newParkingLot.capacity);

            expect(result).not.toBeNull();
            expect(result).toBe(true);
        }
        catch (err) {
            console.log("---- Error on testNewParkingLot ----");
            return;
        }
    });
}


function testCloseTables() {
    test('Close tables', async () => {
        try {
            await testPlaceDao.closeTables();
        }
        catch (err) {
            console.log("---- Error on TestCloseTables ----");
        }
    });
}