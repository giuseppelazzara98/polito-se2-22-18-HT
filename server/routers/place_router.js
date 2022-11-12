'use strict';

const express = require('express');
const { check, body, validationResult } = require('express-validator');
const router = express.Router();
const placeDao = require('../modules/DbManager').place_dao;

/*** Places APIs ***/

//GET /api/places/:provinceId
router.get('/places/:provinceId',
    [check('provinceId').notEmpty().isNumeric().isInt({ min: 1 })],
    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log("Validation of provinceId failed!");
            return res.status(422).json({ errors: errors.array() });
        }

        if (!req.params) {
            console.log("Error in request parameters!");
            return res.status(422).json({ error: "Error in request parameters" });
        }

        try {
            const places = await placeDao.getAllPlacesByProvinceId(req.params.provinceId);
            res.status(200).json(places);
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
);

module.exports = router;