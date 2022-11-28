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
            const municipalities = await municipalityDao.getMunicipalitiesByIdProvince(req.params.provinceId);
           
            const muni = municipalities.map((el) => {
                return{
                    id_municipality: el.id_municipality,
                    name: el.name
                }
            });
            res.status(200).json(muni);
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
);

module.exports = router;