'use strict';

const express = require('express');
const { check, body, validationResult } = require('express-validator');
const router = express.Router();
const hikeDao = require('../modules/DbManager').hike_dao;

/*** Hikes APIs ***/

// GET /api/hikes
//TODO: delete this api when the post /api/hikes is ready
router.get('/hikes', async (req, res) => {

    try {
        const result = await hikeDao.getAllFilteredHikes(0);
        return res.status(200).json(result);
    }
    catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }

});

// Examples of body:
/*
    {
        "geo_area": [],
        "difficulty": ["tourist"],
        "exp_time": { "min": 5.2, "max": 7.0 },
        "length": { "min": 0.0, "max": 15.7 },
        "ascent": { "min": 500, "max": 2000 }
    }
    {
        "geo_area": ["nord est","nord ovest"],
        "difficulty": ["professional hiker"],
        "exp_time": { "min": 5.6, "max": 9.0 },
        "length": { "min": 0.0, "max": 15.7 },
        "ascent": { "min": 500, "max": 2900 }
    }
*/

//POST /api/hikes
router.post('/hikes',
    /*body('issueDate').isString(),
        body('supplierId').isInt({ min: 1 }),
        body('products').isArray(),	
        body('products.*.SKUId').isInt({ min: 1 }),
        body('products.*.description').isString(),
        body('products.*.price').isFloat(),
        body('products.*.qty').isInt({ min: 1 }),*/
    async (req, res) => {

        //const errors = validationResult(req);

        /*if (!(dayjs(req.body.issueDate, ['YYYY/MM/DD', 'YYYY/MM/DD HH:mm'], true).isValid())) {
            console.log("Invalid date");
            return res.status(422).json({ error: "Unprocessable Entity" });
        }*/

        /*if (!errors.isEmpty()) {
            console.log("Validation of request body failed!");
            return res.status(422).json({ errors: errors.array() });
        }*/

        if (Object.keys(req.body).length === 0) {
            console.log("Empty body!");
            return res.status(422).json({ error: "Empty body request" });
        }

        if (Object.keys(req.body).length !== 5) {
            console.log("Data not formatted properly!");
            return res.status(422).json({ error: "Data not formatted properly" });
        }

        try {
            const result = await hikeDao.getAllFilteredHikes(req.body);
            return res.status(200).json(result);
        }
        catch (err) {
            return res.status(503).json({ error: "Service Unavailable" });
        }
    });

module.exports = router;