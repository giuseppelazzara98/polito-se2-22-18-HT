const testHikeDao = require('../modules/DbManager').hike_dao;

describe('TestHikeDao', () => {

    const body1 = {
        "province": null,
        "difficulty": [],
        "exp_time": null,
        "length": null,
        "ascent": null
    };

    const body2 = {
        "province": null,
        "difficulty": ["turist","hiker"],
        "exp_time": null,
        "length": { "min": 0.0, "max": 15.7 },
        "ascent": null
    };

    const body3 = {
        "province": 2,
        "difficulty": ["turist","professional hiker"],
        "exp_time": null,
        "length": { "min": 0.0, "max": 15.7 },
        "ascent": null
    };

    const body4 = {
        "province": 3,
        "difficulty": [],
        "exp_time": { "min": 5.2, "max": 7.0 },
        "length": null,
        "ascent": { "min": 500, "max": 2000 }
    };

    const body5 = {
        "province": null,
        "difficulty": ["professional hiker"],
        "exp_time": null,
        "length": { "min": 0.0, "max": 15.7 },
        "ascent": { "min": 1000, "max": 2000 }
    };

    const body6 = {
        "province": 4,
        "difficulty": [],
        "exp_time": {"min": 5.2, "max": 7.0},
        "length": { "min": 0.0, "max": 11.5 },
        "ascent": { "min": 5000, "max": 6500 }
    };

    /*
        true: not null;
        false: null;
    */

    testGetFilteredHikes(body1, true);
    testGetFilteredHikes(body2, true);
    testGetFilteredHikes(body3, true);
    testGetFilteredHikes(body4, true);
    testGetFilteredHikes(body5, true);
    testGetFilteredHikes(body6, false);

    // CLOSE CONNECTION TO HIKE TABLE

    testCloseHikeTable();
    testGetFilteredHikes(body1, true);

});

function testGetFilteredHikes(body, expectedResult) {
    test('Test get filtered hikes', async () => {
        try {
            const currentHikes = await testHikeDao.getAllFilteredHikes(body);

            expect(currentHikes).not.toBeNull();

            if(expectedResult === true) {
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

function testCloseHikeTable() {
    test('close hike table', async () => {
        try{
            await testHikeDao.closeHikeTable();
        }
        catch(err) {
            console.log("---- Error on TestCloseHikeTable ----");
        }
    });
}