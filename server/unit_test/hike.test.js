const testHikeDao = require('../modules/DbManager').hike_dao;

describe('TestHikeDao', () => {

    const bodyFilter1 = {
        "province": null,
        "difficulty": [],
        "exp_time": null,
        "length": null,
        "ascent": null,
        "range": null
    };

    const bodyFilter2 = {
        "province": null,
        "difficulty": ["turist", "hiker"],
        "exp_time": null,
        "length": { "min": 0.0, "max": 15.7 },
        "ascent": null,
        "range": null
    };

    const bodyFilter3 = {
        "province": 2,
        "difficulty": ["turist", "professional hiker"],
        "exp_time": null,
        "length": { "min": 0.0, "max": 15.7 },
        "ascent": null,
        "range": null
    };

    const bodyFilter4 = {
        "province": 3,
        "difficulty": [],
        "exp_time": { "min": 5.2, "max": 7.0 },
        "length": null,
        "ascent": { "min": 500, "max": 2000 },
        "range": null
    };

    const bodyFilter5 = {
        "province": null,
        "difficulty": ["professional hiker"],
        "exp_time": null,
        "length": { "min": 0.0, "max": 15.7 },
        "ascent": { "min": 1000, "max": 2000 },
        "range": null
    };

    const bodyFilter6 = {
        "province": 4,
        "difficulty": [],
        "exp_time": { "min": 5.2, "max": 7.0 },
        "length": { "min": 0.0, "max": 11.5 },
        "ascent": { "min": 5000, "max": 6500 },
        "range": null
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

    getLatLongStartPlaceByHikeId(12, true);
    getLatLongStartPlaceByHikeId(13, true);
    getLatLongStartPlaceByHikeId(14, true);
    getLatLongStartPlaceByHikeId(15, true);
    getLatLongStartPlaceByHikeId(304320, false);
    getLatLongStartPlaceByHikeId(3041230, false);

    testInsertHikePlace(1, 1, 1);
    testInsertHikePlace(2, 2, 2);
    testInsertHikePlace(3, 3, 3);
    testInsertHikePlace(14, 2, 1);

    const bodyNewHike1 = {
        title: "Test1",
        province: 4,
        municipality: 7078,
        length: 4,
        expectedTimeString: "56m",
        expectedTime: 0.93,
        ascent: 1406,
        difficulty: 1,
        startPoint: {
            type: "Hut/Parking lot",
            id: 8,
            name: "Alevè",
            lon: 21.244,
            lat: 3.325
        },
        endPoint: {
            type: "Hut/Parking lot",
            id: 12,
            name: "Monte d'Oro",
            lon: 8.474,
            lat: 21.2475
        },
        referencePoints: [
            {
                id: 15,
                name: "Monte Talm",
                description: "...",
                lat: 18.364,
                lon: 13.412,
                type: "hut"
            },
            {
                type: "Address/Name of location",
                id: 298324244,
                name: "Politecnico di Torino, Corso Francesco Ferrucci, Cenisia, Circoscrizione 3, Torino, Piemonte, 10138, Italia",
                lat: 45.063697399999995,
                lon: 7.657527285508495
            }
        ],
        gpxData: "...",
        description: "Test1"
    };

    const bodyNewHike2 = {
        title: "Test2",
        province: 4,
        municipality: 7078,
        length: 4,
        expectedTimeString: "56m",
        expectedTime: 0.93,
        ascent: 1406,
        difficulty: 1,
        startPoint: {
            type: "Hut/Parking lot",
            id: 8,
            name: "Alevè",
            lon: 21.244,
            lat: 3.325
        },
        endPoint: {
            type: "Hut/Parking lot",
            id: 12,
            name: "Monte d'Oro",
            lon: 8.474,
            lat: 21.2475
        },
        referencePoints: [
            {
                id: 15,
                name: "Monte Talm",
                description: "...",
                lat: 18.364,
                lon: 13.412,
                type: "hut"
            },
            {
                type: "Address/Name of location",
                id: 298324244,
                name: "Politecnico di Torino, Corso Francesco Ferrucci, Cenisia, Circoscrizione 3, Torino, Piemonte, 10138, Italia",
                lat: 45.063697399999995,
                lon: 7.657527285508495
            }
        ],
        gpxData: "...",
        description: "Test1"
    };

    testInsertNewHike(bodyNewHike1, 9, 5);
    testInsertNewHike(bodyNewHike2, 9, 5);

    testGetHikeById(12, true);
    testGetHikeById(24, true);
    testGetHikeById(31234253, false);

    testGetStartEndPointsByHikeId(12, true);
    testGetStartEndPointsByHikeId(24, true);
    testGetStartEndPointsByHikeId(31234253, false);

    testGetReferencePointsByHikeId(21, true);
    testGetReferencePointsByHikeId(22, true);
    testGetReferencePointsByHikeId(31234253, false);

    testGetHikesStats(2);
    testGetHikesStats(4);

    // CLOSE CONNECTION TO HIKE TABLE

    testCloseTables();
    testGetFilteredHikes(bodyFilter1, true);
    getLatLongStartPlaceByHikeId(1, true);
    testInsertHikePlace(4, 3, 3);
    testInsertNewHike(bodyNewHike1, 9, 5);
    testGetHikeById(1, true);
    testGetStartEndPointsByHikeId(1, true);
    testGetReferencePointsByHikeId(1, true);
    testGetHikesStats(2);

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

function getLatLongStartPlaceByHikeId(id, expected_result) {
    test('Test get start place by hike id', async () => {
        try {
            const result = await testHikeDao.getLatLongStartPlaceByHikeId(id);

            if (expected_result === true) {
                expect(result).not.toBeNull();
            }
            else {
                expect(result).toBeNull();
            }

        }
        catch (err) {
            console.log("---- Error on getLatLongStartPlaceByHikeId ----");
            return;
        }
    });
}

function testInsertNewHike(hike, id_start, id_end) {
    test('Test insert new hike', async () => {
        try {
            const result = await testHikeDao.insertHike(hike, id_start, id_end);

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

function testGetHikesStats(id_user) {
    test('Test get hikes stats', async () => {
        try {
            const result = await testHikeDao.getHikeStats(id_user);

            expect(result).not.toBeNull();

            expect(result.length).toBeGreaterThan(0);

        }
        catch (err) {
            console.log("---- Error on testGetHikesStats ----");
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