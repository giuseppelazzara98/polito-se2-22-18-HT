'use strict';

const express = require('express');
const router = express.Router();
const hikeDao = require('../modules/DbManager').hike_dao;

/*** Hikes APIs ***/

// GET /api/hikes
router.get('/hikes', async (req, res) => {

    try {
        const result = await hikeDao.getAllHikes();
        return res.status(200).json(result);
    }
    catch(err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }

});

module.exports = router;