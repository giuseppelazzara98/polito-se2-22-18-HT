'use strict';

const express = require('express');
const { check, body, validationResult } = require('express-validator');
const router = express.Router();
const municipalityDao = require('../modules/DbManager').municipality_dao;

/*** Municipalities APIs ***/

//GET /api/municipalities/:provinceId
router.get('/municipalities/:provinceId',
    [check('provinceId').notEmpty().isNumeric().isInt({ min: 1 })],
    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log('Validation of placeId failed!');
            return res.status(422).json({ errors: errors.array() });
        }

        if (!req.params) {
            console.log('Error in request parameters!');
            return res.status(422).json({ error: 'Error in request parameters' });
        }

        try {
            //const municipalities = await municipalityDao....;
            const municipalities = [
                {id_municipality: 1, name: "TORINO"},
                {id_municipality: 2, name: "MONCALIERI"},
                {id_municipality: 3, name: "IVREA"},
                {id_municipality: 4, name: "ALMESE"},
                {id_municipality: 5, name: "CUNEO"},
                {id_municipality: 6, name: "CHIVASSO"}
            ];
            res.status(200).json(municipalities);
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
);

module.exports = router;