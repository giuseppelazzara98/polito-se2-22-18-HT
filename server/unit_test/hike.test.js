const testHikeDao = require('../modules/DbManager').hike_dao;

describe('TestHikeDao', () => {

    const bodyFilter1 = {
        "province": null,
        "difficulty": [],
        "exp_time": null,
        "length": null,
        "ascent": null
    };

    const bodyFilter2 = {
        "province": null,
        "difficulty": ["turist", "hiker"],
        "exp_time": null,
        "length": { "min": 0.0, "max": 15.7 },
        "ascent": null
    };

    const bodyFilter3 = {
        "province": 2,
        "difficulty": ["turist", "professional hiker"],
        "exp_time": null,
        "length": { "min": 0.0, "max": 15.7 },
        "ascent": null
    };

    const bodyFilter4 = {
        "province": 3,
        "difficulty": [],
        "exp_time": { "min": 5.2, "max": 7.0 },
        "length": null,
        "ascent": { "min": 500, "max": 2000 }
    };

    const bodyFilter5 = {
        "province": null,
        "difficulty": ["professional hiker"],
        "exp_time": null,
        "length": { "min": 0.0, "max": 15.7 },
        "ascent": { "min": 1000, "max": 2000 }
    };

    const bodyFilter6 = {
        "province": 4,
        "difficulty": [],
        "exp_time": { "min": 5.2, "max": 7.0 },
        "length": { "min": 0.0, "max": 11.5 },
        "ascent": { "min": 5000, "max": 6500 }
    };

    /*
        true: not null;
        false: null;
    */

    testGetFilteredHikes(bodyFilter1, true);
    testGetFilteredHikes(bodyFilter2, true);
    testGetFilteredHikes(bodyFilter3, true);
    testGetFilteredHikes(bodyFilter4, true);
    testGetFilteredHikes(bodyFilter5, true);
    testGetFilteredHikes(bodyFilter6, false);

    testInsertHikePlace(1, 1, 1);
    testInsertHikePlace(2, 2, 2);
    testInsertHikePlace(3, 3, 3);
    testInsertHikePlace(14, 2, 1);

    const bodyNewHike1 = {
        "title": "Test3",
        "province": 1,
        "length": 345,
        "expectedTimeString": "12h",
        "expectedTime": 12,
        "ascent": 123,
        "difficulty": 2,
        "startPoint": 9,
        "endPoint": 5,
        "referencePoints": [],
        "gpxData": "",
        "description": "Test1"
    };

    const bodyNewHike2 = {
        "title": "Test4",
        "province": 2,
        "length": 345,
        "expectedTimeString": "12h",
        "expectedTime": 12,
        "ascent": 78,
        "difficulty": 1,
        "startPoint": 9,
        "endPoint": 5,
        "referencePoints": [],
        "gpxData": "",
        "description": "Test2"
    };

    testInsertNewHike(bodyNewHike1);
    testInsertNewHike(bodyNewHike2);

    testGetHikeById(12, true);
    testGetHikeById(24, true);
    testGetHikeById(31234253, false);

    testGetStartEndPointsByHikeId(12, true);
    testGetStartEndPointsByHikeId(24, true);
    testGetStartEndPointsByHikeId(31234253, false);

    testGetReferencePointsByHikeId(21, true);
    testGetReferencePointsByHikeId(22, true);
    testGetReferencePointsByHikeId(31234253, false);

    // CLOSE CONNECTION TO HIKE TABLE

    testCloseTables();
    testGetFilteredHikes(bodyFilter1, true);
    testInsertHikePlace(4, 3, 3);
    testInsertNewHike(bodyNewHike1);
    testGetHikeById(1, true);
    testGetStartEndPointsByHikeId(1, true);
    testGetReferencePointsByHikeId(1, true);

});

function testGetFilteredHikes(body, expectedResult) {
    test('Test get filtered hikes', async () => {
        try {
            const currentHikes = await testHikeDao.getAllFilteredHikes(body);

            expect(currentHikes).not.toBeNull();

            if (expectedResult === true) {
                expect(currentHikes.length).toBeGreaterThan(0);
            }
            else {
                expect(currentHikes.length).toBe(0);
            }

        }
        catch (err) {
            console.log("---- Error on testGetPlacesByProvinceId ----");
            return;
        }
    });
}

function testInsertNewHike(body) {
    test('Test insert new hike', async () => {
        try {
            const result = await testHikeDao.insertHike(body);

            expect(result).not.toBeNull();

            expect(result).toBe(true);
        }
        catch (err) {
            console.log("---- Error on testInsertNewHike ----");
            return;
        }
    });
}

function testGetHikeById(id, expected_result) {
    test('Test hike by id', async () => {
        try {
            const result = await testHikeDao.getHikeById(id);

            if (expected_result === true) {
                expect(result).not.toBeNull();
            }
            else {
                expect(result).toBeNull();
            }
        }
        catch (err) {
            console.log("---- Error on testGetHikeById ----");
            return;
        }
    });
}

function testGetStartEndPointsByHikeId(id, expected_result) {
    test('Test get start end points by hike id', async () => {
        try {
            const result = await testHikeDao.getStartEndPoints(id);

            if (expected_result === true) {
                expect(result).not.toBeNull();
            }
            else {
                expect(result).toBeNull();
            }
        }
        catch (err) {
            console.log("---- Error on testGetStartEndPointsByHikeId ----");
            return;
        }
    });
}

function testGetReferencePointsByHikeId(id, expected_result) {
    test('Test get reference points by hike id', async () => {
        try {
            const result = await testHikeDao.getReferencePoints(id);

            if (expected_result === true) {
                expect(result).not.toBeNull();
            }
            else {
                expect(result).toBeNull();
            }
        }
        catch (err) {
            console.log("---- Error on testGetReferencePointsByHikeId ----");
            return;
        }
    });
}

function testInsertHikePlace(id_hike, id_reference_point, sort) {
    test('Test insert new hike place', async () => {
        try {
            const result = await testHikeDao.insertHikePlace(id_hike, id_reference_point, sort);

            expect(result).not.toBeNull();

            expect(result).toBe(true);
        }
        catch (err) {
            console.log("---- Error on testInsertHikePlace ----");
            return;
        }
    });
}

function testCloseTables() {
    test('close tables', async () => {
        try {
            await testHikeDao.closeTables();
        }
        catch (err) {
            console.log("---- Error on TestCloseHikeTable ----");
        }
    });
}